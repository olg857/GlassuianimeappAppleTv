import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./info";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(`https://${projectId}.supabase.co`, publicAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return _client;
}

export const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bacc4e0f`;

// Authenticated fetch — uses the current session token if available, otherwise the anon key.
export async function apiFetch(path: string, init: RequestInit = {}) {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? publicAnonKey;

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${SERVER_URL}${path}`, { ...init, headers });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // leave json null
  }

  if (!res.ok) {
    // Surface a clean error to the UI; log only path + status (never tokens/body) to console.
    const message =
      typeof json?.error === "string"
        ? json.error
        : `Request to ${path} failed with status ${res.status}`;
    console.log(`apiFetch failed: ${path} (${res.status})`);
    throw new Error(message);
  }
  return json;
}
