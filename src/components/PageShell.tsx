import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

// PageShell.tsx
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-orange-200 opacity-70 blur-[60px]" />
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white opacity-80 blur-[60px]" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-green-200 opacity-70 blur-[60px]" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white opacity-80 blur-[60px]" />

      {/* ✅ items-start instead of items-center keeps content pinned to top */}
      <div className="relative z-10 flex min-h-screen justify-center">
        <div
          className="
            w-full px-6 py-4
            md:w-[420px] md:rounded-3xl md:bg-white/60 md:px-10 md:py-10
            md:shadow-xl md:shadow-black/5 md:backdrop-blur-md md:border md:border-white/80
            md:my-10 md:h-fit
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
