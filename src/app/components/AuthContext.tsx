import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, apiFetch } from "../../../utils/supabase/client";

type Profile = {
  id: string;
  email: string;
  username?: string;
  tier: "free" | "premium" | "ultimate";
};

type AuthValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  /** identifier may be a username or an email. */
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const Ctx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const { profile } = await apiFetch("/me");
      setProfile(profile);
    } catch {
      // Don't log error details — they can contain server-issued tokens or emails.
      console.log("Profile load failed");
      setProfile(null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) loadProfile().finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) loadProfile();
      else setProfile(null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn: AuthValue["signIn"] = async (identifier, password) => {
    // Resolve username → email server-side; emails pass through unchanged.
    const { email } = await apiFetch("/resolve-login", {
      method: "POST",
      body: JSON.stringify({ identifier }),
    });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // Use a generic message so we never disclose whether the user or the password was wrong.
    if (error) throw new Error("Invalid username or password");
  };

  const signUp: AuthValue["signUp"] = async (username, email, password) => {
    await apiFetch("/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
    await signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Ctx.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
