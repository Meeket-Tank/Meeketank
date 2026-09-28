"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { achievements, certifications, experiences, profile, projects, skillBook } from "@/lib/data";
import { exchanges, marketStatus } from "@/lib/market";

const OPEN_EVENT = "mkt:open-terminal";

export function openTerminal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Line = { kind: "in" | "out" | "err" | "ok"; text: string };

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "who is Meeket?",
  experience: "work history",
  projects: "list projects",
  skills: "top skills",
  certs: "certifications",
  awards: "achievements",
  markets: "live exchange status",
  visitor: "your session telemetry",
  resume: "open resume",
  download: "download resume PDF",
  contact: "email & socials",
  goto: "goto <section> — scroll to a section",
  mfd: "open live Mutual Fund app",
  github: "open GitHub",
  linkedin: "open LinkedIn",
  clear: "clear screen",
  exit: "close terminal",
};

const SECTIONS = ["home", "about", "experience", "projects", "skills", "resume", "contact"];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(Date.now());

  const greet = useCallback(
    () => [
      { kind: "ok", text: `MKT terminal v2.6 — connected ${new Date().toLocaleString()}` },
      { kind: "out", text: `Type "help" to list commands. Tab autocompletes, ↑/↓ recalls history.` },
    ] as Line[],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setLines((l) => (l.length ? l : greet()));
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, greet]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function scrollTo(id: string) {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
  }

  function run(raw: string): Line[] {
    const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);
    const out = (text: string): Line => ({ kind: "out", text });

    switch (cmd) {
      case "":
        return [];
      case "help":
        return Object.entries(COMMANDS).map(([k, v]) => out(`  ${k.padEnd(12)} ${v}`));
      case "whoami":
      case "about":
        return [
          { kind: "ok", text: `${profile.fullName} — ${profile.headline}` },
          out("MBA Tech @ NMIMS (Class of 2027). Builds finance automation, analytics and AI tools."),
          out("Ex-JSW Steel (F&A) · Ex-Logixal (VTEX/Next.js) · Neuro Web Award 2026."),
        ];
      case "experience":
      case "exp":
        return experiences.map((e) => out(`  ${e.period.padEnd(20)} ${e.role} @ ${e.company}`));
      case "projects":
        return projects.map((p) => out(`  [${p.year}] ${p.title}${p.link ? `  → ${p.link.href}` : ""}`));
      case "skills":
        return [
          out("  FINANCE  " + skillBook.finance.slice(0, 5).map((s) => s.name).join(" · ")),
          out("  TECH     " + skillBook.tech.slice(0, 5).map((s) => s.name).join(" · ")),
        ];
      case "certs":
        return certifications.map((c) => out(`  ✓ ${c.name} — ${c.issuer}`));
      case "awards":
        return achievements.map((a) => out(`  ★ ${a.title}: ${a.detail}`));
      case "markets": {
        const now = new Date();
        return exchanges.map((ex) => {
          const s = marketStatus(ex, now);
          return { kind: s.isOpen ? "ok" : "out", text: `  ${ex.code.padEnd(5)} ${s.time}  ${s.isOpen ? "OPEN  " : "CLOSED"}  ${s.countdown}` } as Line;
        });
      }
      case "visitor": {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
        const secs = Math.round((Date.now() - openedAt.current) / 1000);
        return [
          out(`  timezone   ${tz}`),
          out(`  local time ${new Date().toLocaleTimeString()}`),
          out(`  viewport   ${window.innerWidth}×${window.innerHeight} @${window.devicePixelRatio}x`),
          out(`  network    ${conn?.effectiveType ?? "unknown"}`),
          out(`  language   ${navigator.language}`),
          out(`  session    ${secs}s since terminal boot`),
          { kind: "ok", text: "  (computed in your browser — nothing is sent anywhere)" },
        ];
      }
      case "resume":
        scrollTo("resume");
        return [{ kind: "ok", text: "Opening resume…" }];
      case "download": {
        const a = document.createElement("a");
        a.href = profile.resume;
        a.download = "Meeket_Tank_Resume.pdf";
        a.click();
        return [{ kind: "ok", text: "Downloading Meeket_Tank_Resume.pdf" }];
      }
      case "contact":
      case "email":
        return [
          out(`  email     ${profile.email}`),
          out(`  college   ${profile.collegeEmail}`),
          out(`  linkedin  ${profile.linkedin}`),
          out(`  github    ${profile.github}`),
        ];
      case "goto":
      case "cd": {
        const target = (args[0] ?? "").replace(/^#/, "");
        if (SECTIONS.includes(target)) {
          scrollTo(target);
          return [{ kind: "ok", text: `→ ${target}` }];
        }
        return [{ kind: "err", text: `unknown section. try: ${SECTIONS.join(", ")}` }];
      }
      case "mfd":
        window.open("https://mfd.meeket.in/", "_blank", "noopener");
        return [{ kind: "ok", text: "Launching mfd.meeket.in" }];
      case "github":
        window.open(profile.github, "_blank", "noopener");
        return [{ kind: "ok", text: "Opening GitHub" }];
      case "linkedin":
        window.open(profile.linkedin, "_blank", "noopener");
        return [{ kind: "ok", text: "Opening LinkedIn" }];
      case "sudo":
        if (args.join(" ").startsWith("hire")) {
          return [
            { kind: "ok", text: "[sudo] permission granted ✓" },
            out(`Excellent decision. Reach Meeket at ${profile.email}`),
          ];
        }
        return [{ kind: "err", text: "sudo: nice try 😉  (hint: sudo hire meeket)" }];
      case "exit":
        setOpen(false);
        return [];
      default:
        if (SECTIONS.includes(cmd)) {
          scrollTo(cmd);
          return [{ kind: "ok", text: `→ ${cmd}` }];
        }
        return [{ kind: "err", text: `command not found: ${cmd}. Type "help".` }];
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = input;
    setInput("");
    setHistIdx(-1);
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 50));
    if (value.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { kind: "in", text: value }, ...run(value)]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = histIdx - 1;
      setHistIdx(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = [...Object.keys(COMMANDS), ...SECTIONS].find((c) => c.startsWith(input.toLowerCase()));
      if (match && input) setInput(match);
    }
  }

  const quick = ["whoami", "experience", "projects", "markets", "visitor", "download", "sudo hire meeket"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-950/70 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command terminal"
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-up/30 bg-ink-900 shadow-[0_0_60px_rgba(0,227,150,0.15)]"
            initial={{ y: 20, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-down/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-up/80" />
              <span className="ml-3 font-mono text-xs text-white/50">guest@meeket.in: ~</span>
              <button onClick={() => setOpen(false)} className="ml-auto font-mono text-xs text-white/40 hover:text-white">
                esc
              </button>
            </div>

            <div
              ref={bodyRef}
              className="h-[46vh] overflow-y-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) => (
                <pre
                  key={i}
                  className={
                    "whitespace-pre-wrap break-words " +
                    (l.kind === "in"
                      ? "text-white"
                      : l.kind === "err"
                      ? "text-down"
                      : l.kind === "ok"
                      ? "text-up"
                      : "text-white/65")
                  }
                >
                  {l.kind === "in" ? <><span className="text-up">❯ </span>{l.text}</> : l.text}
                </pre>
              ))}
              <form onSubmit={submit} className="flex items-center">
                <span className="text-up">❯&nbsp;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent text-white caret-up outline-none"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                />
              </form>
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-2.5">
              {quick.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setLines((l) => [...l, { kind: "in", text: q }, ...run(q)]);
                    inputRef.current?.focus();
                  }}
                  className="chip hover:border-up/50 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
