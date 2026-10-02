"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { links, profile } from "@/lib/data";
import { exchanges, marketStatus } from "@/lib/market";
import { useNow } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import TickerTape from "./ticker-tape";
import { openTerminal } from "./command-palette";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const now = useNow(1000);
  const navRef = useRef<HTMLUListElement>(null);

  // keep the active tab visible when the nav overflows on small screens
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    const nav = el?.closest("nav");
    if (el && nav) nav.scrollTo({ left: el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [activeSection]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Status row: brand · live exchange clocks · terminal launcher */}
      <div className="flex h-11 items-center gap-4 px-4 font-mono text-[0.72rem] sm:px-6">
        <Link href="#home" className="flex shrink-0 items-center gap-2 text-white">
          <span className="grid h-6 w-6 place-items-center rounded bg-up text-[0.65rem] font-bold text-ink-950">
            {profile.ticker}
          </span>
          <span className="hidden tracking-widest md:inline">
            MEEKET<span className="text-up">://</span>TERMINAL
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center gap-5 overflow-hidden">
          {exchanges.map((ex, i) => {
            const s = now ? marketStatus(ex, now) : null;
            return (
              <div
                key={ex.code}
                className={clsx("items-center gap-2 whitespace-nowrap", i === 0 ? "flex" : "hidden sm:flex")}
                title={s ? `${ex.city} · ${s.countdown} (regular session, holidays not included)` : ex.city}
              >
                <span
                  className={clsx(
                    "h-1.5 w-1.5 rounded-full",
                    s?.isOpen ? "bg-up animate-pulseDot" : "bg-down/70"
                  )}
                />
                <span className="text-white/50">{ex.code}</span>
                <span className="tabular-nums text-white/90">{s?.time ?? "--:--:--"}</span>
                <span className={clsx("hidden lg:inline", s?.isOpen ? "text-up" : "text-white/35")}>
                  {s ? (s.isOpen ? "OPEN" : "CLOSED") : ""}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={openTerminal}
          className="flex shrink-0 items-center gap-2 rounded-md border border-white/15 px-2.5 py-1 text-white/70 transition hover:border-up/60 hover:text-white"
          aria-label="Open command terminal"
        >
          <span className="text-up">&gt;_</span>
          <span className="hidden sm:inline">terminal</span>
          <kbd className="hidden rounded bg-white/10 px-1 text-[0.62rem] text-white/50 sm:inline">⌘K</kbd>
        </button>
      </div>

      <TickerTape />

      {/* Section nav */}
      <nav className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul ref={navRef} className="mx-auto flex w-max items-center gap-1 px-4 py-1.5 font-mono text-[0.76rem]">
          {links.map((link, i) => (
            <li key={link.hash} data-section={link.name} className="relative">
              <Link
                className={clsx(
                  "relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1.5 transition",
                  activeSection === link.name ? "text-ink-950" : "text-white/55 hover:text-white"
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                <span className={activeSection === link.name ? "text-ink-950/60" : "text-white/25"}>
                  0{i + 1}
                </span>
                {link.name}
              </Link>
              {link.name === activeSection && (
                <motion.span
                  className="absolute inset-0 rounded-md bg-up"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
