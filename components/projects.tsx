"use client";

import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./section-heading";
import { projects, type Project } from "@/lib/data";
import { trackSpotlight, useSectionInView } from "@/lib/hooks";

const FILTERS = ["All", "Fintech", "AI / ML", "Web"] as const;

/** Deterministic sparkline for projects without a screenshot. */
function Sparkline({ seed }: { seed: string }) {
  const gradientId = useId().replace(/:/g, "");
  const points = useMemo(() => {
    let x = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    let v = 40;
    return Array.from({ length: 32 }, (_, i) => {
      v = Math.max(8, Math.min(72, v - 2.2 + rand() * 5));
      return `${(i / 31) * 300},${v}`;
    }).join(" ");
  }, [seed]);

  return (
    <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00e396" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00e396" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,80 ${points} 300,80`} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" stroke="#00e396" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onMouseMove={trackSpotlight}
      className="panel-glow spotlight group flex flex-col overflow-hidden"
    >
      <div className="relative h-36 overflow-hidden border-b border-white/[0.06] bg-ink-950/60">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            quality={80}
            className="object-cover object-top opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 pt-6">
            <Sparkline seed={p.title} />
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded bg-ink-950/80 px-2 py-0.5 font-mono text-[0.65rem] text-white/70">{p.year}</span>
          <span className="rounded bg-ink-950/80 px-2 py-0.5 font-mono text-[0.65rem] text-cyan">{p.category}</span>
          {p.live && (
            <span className="flex items-center gap-1 rounded bg-up/15 px-2 py-0.5 font-mono text-[0.65rem] text-up">
              <span className="h-1.5 w-1.5 rounded-full bg-up animate-pulseDot" /> LIVE
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-white">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] text-up/90">
          {p.highlights.map((h) => (
            <li key={h}>+ {h}</li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {p.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
          {p.link && (
            <a
              href={p.link.href}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-up hover:underline"
            >
              {p.link.label} <FiArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section ref={ref} id="projects" className="scroll-mt-24 py-20">
      <SectionHeading index="04" kicker="Projects · portfolio holdings">
        Things I’ve built that actually run.
      </SectionHeading>

      <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "rounded-md border px-3 py-1.5 transition",
              f === filter ? "border-up bg-up/10 text-up" : "border-white/10 text-white/55 hover:text-white"
            )}
          >
            {f}
            <span className="ml-2 text-white/30">
              {f === "All" ? projects.length : projects.filter((p) => p.category === f).length}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
