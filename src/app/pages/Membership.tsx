import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { PremiumMembership } from "../components/PremiumMembership";
import { AuthPanel } from "../components/AuthPanel";
import { useAuth } from "../components/AuthContext";
import { apiFetch } from "../../../utils/supabase/client";
import { Button } from "../components/ui/button";

export function Membership() {
  const { session, profile, loading, signOut, refreshProfile } = useAuth();
  const [busyTier, setBusyTier] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const setTier = async (tier: "free" | "premium" | "ultimate") => {
    setBusyTier(tier);
    setErr(null);
    try {
      await apiFetch("/membership", {
        method: "POST",
        body: JSON.stringify({ tier }),
      });
      await refreshProfile();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusyTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-neutral-50 overflow-hidden flex">
      <Sidebar />

      <main className="flex-1 ml-20 h-screen overflow-y-auto scrollbar-hide relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-full text-white/60">Loading...</div>
        ) : !session ? (
          <div className="px-8 py-20">
            <h1 className="text-4xl font-black text-white text-center mb-3">
              Secure Membership
            </h1>
            <p className="text-white/60 text-center mb-10">
              Sign in to view and manage your plan. Membership is verified on the server.
            </p>
            <AuthPanel />
          </div>
        ) : (
          <>
            <div className="px-8 pt-8 max-w-7xl mx-auto flex items-center justify-between">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <div className="text-white/60 text-xs uppercase tracking-wider">Signed in as</div>
                <div className="text-white font-medium">
                  {profile?.username ? `@${profile.username}` : profile?.email}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  Current tier:{" "}
                  <span className="text-white font-semibold capitalize">
                    {profile?.tier ?? "free"}
                  </span>
                </div>
              </div>
              <Button
                onClick={signOut}
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                Sign Out
              </Button>
            </div>

            {err && (
              <div className="max-w-7xl mx-auto px-8 mt-4">
                <div className="text-red-300 text-sm bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                  {err}
                </div>
              </div>
            )}

            <PremiumMembership
              currentTier={profile?.tier ?? "free"}
              busyTier={busyTier}
              onSelectTier={setTier}
            />
          </>
        )}
      </main>
    </div>
  );
}
