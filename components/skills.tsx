"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import SectionHeading from "./section-heading";
import { achievements, certifications, skillBook } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

type Row = { name: string; depth: number };

/** Nudges a random row's depth every tick so the book feels live. */
function useLiveBook(rows: readonly Row[], interval: number) {
  const [book, setBook] = useState(() => rows.map((r) => ({ ...r, flash: 0 })));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setBook((b) => {
        const i = Math.floor(Math.random() * b.length);
        const base = rows[i].depth;
        const delta = Math.random() > 0.5 ? 1 : -1;
        return b.map((r, k) =>
          k === i
            ? { ...r, depth: Math.max(base - 3, Math.min(base + 3, r.depth + delta)), flash: delta }
            : { ...r, flash: 0 }
        );
      });
    }, interval);
    return () => clearInterval(id);
  }, [rows, interval]);

  return book;
}

function Side({ title, rows, side }: { title: string; rows: readonly Row[]; side: "bid" | "ask" }) {
  const book = useLiveBook(rows, side === "bid" ? 1300 : 1700);
  const color = side === "bid" ? "bg-up" : "bg-cyan";
  const text = side === "bid" ? "text-up" : "text-cyan";

  return (
    <div>
      <div
        className={clsx(
          "grid grid-cols-[1fr_auto] border-b border-white/[0.06] px-4 py-2.5 font-mono text-[0.65rem] tracking-widest text-white/35",
          side === "ask" && "md:grid-cols-[auto_1fr] md:text-right"
        )}
      >
        <span className={clsx(side === "ask" && "md:order-2")}>{title}</span>
        <span className={clsx(side === "ask" && "md:order-1 md:text-left")}>DEPTH</span>
      </div>
      {book.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="relative grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 font-mono text-[0.8rem]"
        >
          <motion.span
            className={clsx(
              "absolute inset-y-0.5 opacity-[0.14]",
              color,
              side === "bid" ? "right-0" : "left-0"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${r.depth}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <span
            className={clsx(
              "relative truncate text-white/80",
              side === "ask" && "md:order-2 md:text-right"
            )}
          >
            {r.name}
          </span>
          <span
            className={clsx(
              "relative tabular-nums transition-colors duration-300",
              r.flash > 0 ? "text-up" : r.flash < 0 ? "text-down" : text,
              side === "ask" && "md:order-1"
            )}
          >
            {r.depth.toFixed(0).padStart(3, " ")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0.2);

  return (
    <section ref={ref} id="skills" className="scroll-mt-24 py-20">
      <SectionHeading index="05" kicker="Skills · order book">
        Two sides of the book, zero spread.
      </SectionHeading>

      <div className="panel overflow-hidden">
        <div className="grid md:grid-cols-2 md:divide-x md:divide-white/[0.06]">
          <Side title="BID · FINANCE" rows={skillBook.finance} side="bid" />
          <Side title="ASK · TECH" rows={skillBook.tech} side="ask" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5 font-mono text-[0.7rem] text-white/45">
          <span>
            SPREAD <span className="text-white">0.00</span> — finance and tech quoted by the same desk
          </span>
          <span>depth = self-assessed proficiency / 100</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="panel p-6">
          <p className="label mb-4">Certifications</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.name} className="flex gap-3">
                <FiCheckCircle className="mt-0.5 shrink-0 text-up" />
                <span>
                  <span className="block text-sm text-white">{c.name}</span>
                  <span className="block font-mono text-[0.7rem] text-white/45">{c.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel p-6">
          <p className="label mb-4">Achievements & responsibility</p>
          <ul className="space-y-4">
            {achievements.map((a) => (
              <li key={a.title} className="flex gap-3">
                <FiAward className="mt-0.5 shrink-0 text-amber" />
                <span>
                  <span className="block text-sm text-white">{a.title}</span>
                  <span className="block text-[0.82rem] leading-relaxed text-white/55">{a.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
