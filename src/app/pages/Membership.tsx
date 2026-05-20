import { Sidebar } from "../components/Sidebar";
import { PremiumMembership } from "../components/PremiumMembership";

export function Membership() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-neutral-50 overflow-hidden flex">
      <Sidebar />

      <main className="flex-1 ml-20 h-screen overflow-y-auto scrollbar-hide relative z-10">
        <PremiumMembership />
      </main>
    </div>
  );
}
