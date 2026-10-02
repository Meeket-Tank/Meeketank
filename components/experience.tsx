"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { experiences } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.25);
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section ref={ref} id="experience" className="scroll-mt-24 py-20">
      <SectionHeading index="03" kicker="Experience · position blotter">
        Where I’ve deployed capital — my time.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <div className="panel overflow-hidden" role="tablist" aria-label="Positions">
          <div className="grid grid-cols-[1fr_auto] border-b border-white/[0.06] px-4 py-2.5 font-mono text-[0.65rem] tracking-widest text-white/35">
            <span>POSITION</span>
            <span>PERIOD</span>
          </div>
          {experiences.map((e, i) => (
            <button
              key={e.company}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={clsx(
                "relative grid w-full grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[0.04] px-4 py-3.5 text-left transition last:border-0",
                i === active ? "bg-up/[0.07]" : "hover:bg-white/[0.03]"
              )}
            >
              {i === active && (
                <motion.span layoutId="blotterBar" className="absolute inset-y-0 left-0 w-0.5 bg-up" />
              )}
              <span className="min-w-0">
                <span className={clsx("block truncate text-sm", i === active ? "text-white" : "text-white/75")}>
                  {e.company}
                </span>
                <span className="block truncate font-mono text-[0.7rem] text-white/40">{e.role}</span>
              </span>
              <span className="text-right font-mono text-[0.68rem]">
                <span className="block text-white/55">{e.period}</span>
                <span
                  className={clsx(
                    "mt-0.5 inline-block rounded px-1.5 text-[0.6rem]",
                    e.kind === "Internship"
                      ? "bg-up/15 text-up"
                      : e.kind === "Leadership"
                      ? "bg-cyan/15 text-cyan"
                      : "bg-white/10 text-white/50"
                  )}
                >
                  {e.kind.toUpperCase()}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="panel min-h-[26rem] p-6" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <p className="label">{exp.location} · {exp.period}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{exp.company}</h3>
              <p className="mt-1 text-white/60">{exp.role}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {exp.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-white/[0.07] bg-ink-950/60 px-3 py-2.5">
                    <p className="font-mono text-lg text-up">{m.value}</p>
                    <p className="mt-0.5 text-[0.72rem] text-white/45">{m.label}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-2.5">
                {exp.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-white/70"
                  >
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-up" />
                    {p}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {exp.stack.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
