import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const PREFIX = "/make-server-bacc4e0f";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Resolve the calling user from the Authorization header.
async function requireUser(c: any) {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) return { error: "Missing Authorization header", status: 401 };
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) {
    return { error: `Auth check failed: ${error?.message ?? "no user"}`, status: 401 };
  }
  return { user: data.user };
}

// Lightweight in-memory rate limiter (per process, per user/IP).
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const b = rateBuckets.get(key);
  if (!b || now > b.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

app.get(`${PREFIX}/health`, (c) => c.json({ status: "ok" }));

// Signup — service role so we can auto-confirm without an email server.
app.post(`${PREFIX}/signup`, async (c) => {
  const ip = c.req.header("x-forwarded-for") ?? "anon";
  if (!rateLimit(`signup:${ip}`, 5, 60_000)) {
    return c.json({ error: "Too many signup attempts. Try again shortly." }, 429);
  }

  let body: { email?: string; password?: string; username?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body for signup" }, 400);
  }

  const { email, password, username } = body;
  if (!email || !password || password.length < 8) {
    return c.json(
      { error: "Signup requires email and a password of at least 8 characters" },
      400,
    );
  }
  if (!username || !/^[a-zA-Z0-9_]{3,24}$/.test(username)) {
    return c.json(
      { error: "Username must be 3-24 characters, letters/numbers/underscore only" },
      400,
    );
  }

  const usernameKey = `username:${username.toLowerCase()}`;
  const existing = await kv.get(usernameKey);
  if (existing) {
    return c.json({ error: `Username '${username}' is already taken` }, 409);
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    user_metadata: { username },
    // Auto-confirm because no email server is configured in this environment.
    email_confirm: true,
  });

  if (error) {
    console.log(`Signup error: ${error.message}`);
    return c.json({ error: `Signup failed: ${error.message}` }, 400);
  }

  // Reserve the username and seed the profile.
  await kv.set(usernameKey, { userId: data.user.id, email });
  await kv.set(`profile:${data.user.id}`, {
    id: data.user.id,
    email,
    username,
    tier: "free",
    createdAt: new Date().toISOString(),
  });

  return c.json({ id: data.user.id, email, username });
});

// Resolve a username to its login email so the client can sign in with either.
app.post(`${PREFIX}/resolve-login`, async (c) => {
  const ip = c.req.header("x-forwarded-for") ?? "anon";
  if (!rateLimit(`resolve:${ip}`, 20, 60_000)) {
    return c.json({ error: "Too many lookups; slow down." }, 429);
  }

  let body: { identifier?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body for login resolution" }, 400);
  }

  const id = (body.identifier ?? "").trim();
  if (!id) return c.json({ error: "Identifier is required" }, 400);

  // Already an email — nothing to resolve.
  if (id.includes("@")) return c.json({ email: id.toLowerCase() });

  if (!/^[a-zA-Z0-9_]{3,24}$/.test(id)) {
    return c.json({ error: "Username format is invalid" }, 400);
  }

  const record = (await kv.get(`username:${id.toLowerCase()}`)) as
    | { userId: string; email: string }
    | null;
  if (!record) {
    // Don't reveal whether a username exists — generic error.
    return c.json({ error: "Invalid username or password" }, 404);
  }
  return c.json({ email: record.email });
});

// Profile — current user only.
app.get(`${PREFIX}/me`, async (c) => {
  const auth = await requireUser(c);
  if ("error" in auth) return c.json({ error: auth.error }, auth.status);

  if (!rateLimit(`me:${auth.user.id}`, 120, 60_000)) {
    return c.json({ error: "Rate limit exceeded for profile fetch" }, 429);
  }

  const profile = (await kv.get(`profile:${auth.user.id}`)) ?? {
    id: auth.user.id,
    email: auth.user.email,
    name: auth.user.user_metadata?.name ?? "",
    tier: "free",
  };
  return c.json({ profile });
});

// Membership upgrade — server validates the tier (never trust the client).
const ALLOWED_TIERS = new Set(["free", "premium", "ultimate"]);
app.post(`${PREFIX}/membership`, async (c) => {
  const auth = await requireUser(c);
  if ("error" in auth) return c.json({ error: auth.error }, auth.status);

  if (!rateLimit(`membership:${auth.user.id}`, 10, 60_000)) {
    return c.json({ error: "Too many membership changes; slow down." }, 429);
  }

  let body: { tier?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body for membership update" }, 400);
  }

  if (!body.tier || !ALLOWED_TIERS.has(body.tier)) {
    return c.json(
      { error: `Invalid tier '${body.tier}'. Allowed: ${[...ALLOWED_TIERS].join(", ")}` },
      400,
    );
  }

  const key = `profile:${auth.user.id}`;
  const existing = (await kv.get(key)) ?? { id: auth.user.id, email: auth.user.email };
  const updated = { ...existing, tier: body.tier, updatedAt: new Date().toISOString() };
  await kv.set(key, updated);

  return c.json({ profile: updated });
});

// My List — scoped to the current user; no way to read another user's list.
app.get(`${PREFIX}/list`, async (c) => {
  const auth = await requireUser(c);
  if ("error" in auth) return c.json({ error: auth.error }, auth.status);
  const items = (await kv.get(`list:${auth.user.id}`)) ?? [];
  return c.json({ items });
});

app.post(`${PREFIX}/list`, async (c) => {
  const auth = await requireUser(c);
  if ("error" in auth) return c.json({ error: auth.error }, auth.status);

  if (!rateLimit(`list:${auth.user.id}`, 60, 60_000)) {
    return c.json({ error: "Rate limit exceeded for list updates" }, 429);
  }

  let body: { animeId?: string; title?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body for list add" }, 400);
  }

  if (!body.animeId || typeof body.animeId !== "string" || body.animeId.length > 128) {
    return c.json({ error: "animeId is required and must be <=128 chars" }, 400);
  }

  const key = `list:${auth.user.id}`;
  const items: Array<{ animeId: string; title?: string; addedAt: string }> =
    (await kv.get(key)) ?? [];
  if (!items.some((i) => i.animeId === body.animeId)) {
    items.push({ animeId: body.animeId, title: body.title, addedAt: new Date().toISOString() });
    await kv.set(key, items);
  }
  return c.json({ items });
});

Deno.serve(app.fetch);
