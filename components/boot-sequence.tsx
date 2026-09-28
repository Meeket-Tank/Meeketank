"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "BOOT  mkt-terminal v2.6",
  "LOAD  resume.pdf ............ ok",
  "SYNC  NSE · LSE · NYSE clocks  ok",
  "LINK  AMFI NAV feed ......... ok",
  "INIT  career index stream ... ok",
  "READY",
];

/** Short, skippable boot screen shown once per browser session. */
export default function BootSequence() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("mkt-booted") === "1";
      sessionStorage.setItem("mkt-booted", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShow(true);
    const timers = LINES.map((_, i) => setTimeout(() => setCount(i + 1), 160 * (i + 1)));
    const done = setTimeout(() => setShow(false), 160 * LINES.length + 450);
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-ink-950"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-[min(90vw,26rem)] font-mono text-xs leading-6">
            {LINES.slice(0, count).map((l, i) => (
              <p key={l} className={i === LINES.length - 1 ? "text-up" : "text-white/60"}>
                <span className="text-white/25">[{(i * 0.16).toFixed(2)}]</span> {l}
              </p>
            ))}
            <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-up"
                initial={{ width: 0 }}
                animate={{ width: `${(count / LINES.length) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-[0.65rem] text-white/30">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
