import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { AuthPanel } from "./AuthPanel";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white/60">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <div className="w-full">
          <h1 className="text-3xl font-black text-white text-center mb-3">
            Sign in required
          </h1>
          <p className="text-white/60 text-center mb-8">
            This page is protected. Sign in to continue.
          </p>
          <AuthPanel />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
