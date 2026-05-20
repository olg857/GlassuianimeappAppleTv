import { cn } from "../../lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/[0.03] backdrop-blur-[80px] border border-white/10",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.2),0_8px_32px_rgba(0,0,0,0.4)]",
          "rounded-[32px] overflow-hidden relative text-white",
          className
        )}
        {...props}
      >
        {/* Subtle top glare effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
        {children}
      </div>
    );
  }
);
GlassPanel.displayName = "GlassPanel";