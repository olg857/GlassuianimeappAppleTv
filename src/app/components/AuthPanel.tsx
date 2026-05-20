import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "./AuthContext";
import { validateEmail, validatePassword } from "../../../utils/validation";

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 30_000;
const USERNAME_RE = /^[a-zA-Z0-9_]{3,24}$/;

export function AuthPanel() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [identifier, setIdentifier] = useState(""); // username or email (sign-in only)
  const [email, setEmail] = useState(""); // sign-up
  const [username, setUsername] = useState(""); // sign-up
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const attemptsRef = useRef<number[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < COOLDOWN_MS);
    if (attemptsRef.current.length >= MAX_ATTEMPTS) {
      setErr("Too many attempts. Wait a moment before trying again.");
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.ok) {
      setErr(passCheck.error);
      return;
    }

    if (mode === "signin") {
      const id = identifier.trim();
      if (!id) {
        setErr("Enter your username or email");
        return;
      }
      if (id.includes("@")) {
        const emailCheck = validateEmail(id);
        if (!emailCheck.ok) {
          setErr(emailCheck.error);
          return;
        }
      } else if (!USERNAME_RE.test(id)) {
        setErr("Username must be 3-24 characters, letters/numbers/underscore only");
        return;
      }

      setBusy(true);
      attemptsRef.current.push(now);
      try {
        await signIn(id, passCheck.value);
        setPassword("");
      } catch (e) {
        setErr((e as Error).message || "Sign in failed");
      } finally {
        setBusy(false);
      }
      return;
    }

    // Sign-up branch.
    if (!USERNAME_RE.test(username)) {
      setErr("Username must be 3-24 characters, letters/numbers/underscore only");
      return;
    }
    const emailCheck = validateEmail(email);
    if (!emailCheck.ok) {
      setErr(emailCheck.error);
      return;
    }

    setBusy(true);
    attemptsRef.current.push(now);
    try {
      await signUp(username, emailCheck.value, passCheck.value);
      setPassword("");
    } catch (e) {
      const raw = (e as Error).message ?? "";
      setErr(raw.length < 200 ? raw : "Sign up failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto backdrop-blur-2xl bg-white/5 border border-white/15 rounded-[32px] p-8 shadow-2xl">
      <h2 className="text-white text-2xl font-bold mb-2">
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h2>
      <p className="text-white/60 text-sm mb-6">
        {mode === "signin"
          ? "Use your username or email to sign in."
          : "Pick a username — you can sign in with either your username or email."}
      </p>

      <form onSubmit={submit} className="space-y-4" autoComplete="on" noValidate>
        {mode === "signin" ? (
          <input
            type="text"
            required
            placeholder="Username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
            maxLength={254}
            spellCheck={false}
            className="w-full rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-white/40"
          />
        ) : (
          <>
            <input
              type="text"
              required
              placeholder="Username (3-24 chars)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              maxLength={24}
              spellCheck={false}
              className="w-full rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-white/40"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={254}
              spellCheck={false}
              className="w-full rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-white/40"
            />
          </>
        )}

        <input
          type="password"
          required
          minLength={8}
          placeholder="Password (min 8 chars, letters + numbers)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          maxLength={256}
          className="w-full rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-white/40"
        />

        {err && (
          <div
            role="alert"
            className="text-red-300 text-sm bg-red-500/10 border border-red-400/30 rounded-xl px-3 py-2"
          >
            {err}
          </div>
        )}

        <Button
          type="submit"
          disabled={busy}
          className="w-full rounded-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          {busy ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setErr(null);
          setPassword("");
        }}
        className="mt-4 w-full text-white/60 hover:text-white text-sm"
      >
        {mode === "signin" ? "No account? Create one" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
