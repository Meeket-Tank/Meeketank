"use client";

import React from "react";
import { useNow } from "@/lib/hooks";
import { profile } from "@/lib/data";

export default function Footer() {
  const now = useNow(1000);

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950/80 px-4 py-6 font-mono text-[0.7rem] text-white/40 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <span>
          © {now?.getFullYear() ?? ""} {profile.name} · Next.js · TypeScript · Tailwind · Canvas
        </span>
        <span className="flex items-center gap-3">
          <span>
            press <kbd className="rounded bg-white/10 px-1 text-white/60">⌘K</kbd> or{" "}
            <kbd className="rounded bg-white/10 px-1 text-white/60">`</kbd> for terminal
          </span>
          <span className="hidden sm:inline tabular-nums">
            {now ? `LOCAL ${now.toLocaleTimeString([], { hour12: false })}` : ""}
          </span>
        </span>
      </div>
    </footer>
  );
}
