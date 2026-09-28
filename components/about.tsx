"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { education, profile } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const spec: [string, string][] = [
  ["focus", "Finance automation · Analytics · AI"],
  ["major", "Finance (MBA Tech)"],
  ["minor", "Business Intelligence & Analytics"],
  ["engineering", "Computer"],
  ["based_in", profile.location],
  ["status", "Open to finance / fintech roles"],
];

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <section ref={ref} id="about" className="scroll-mt-24 py-20">
      <SectionHeading index="02" kicker="About">
        A finance mind with an engineer’s toolkit.
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-[1.05rem] leading-relaxed text-white/65"
        >
          <p>
            I’m an <span className="text-white">MBA Tech student at NMIMS</span> majoring in Finance with a minor in
            Business Intelligence & Analytics, on top of a Computer Engineering foundation. That mix is the point: I
            understand the balance sheet <span className="italic">and</span> can build the software that reads it.
          </p>
          <p>
            At <span className="text-white">JSW Steel</span> I sat inside Finance & Accounts — channel finance,
            project, debt and trade finance — and turned manual Excel routines into automated pipelines, dashboards and
            a real-time mutual fund & FD treasury tracker. At <span className="text-white">Logixal</span> I migrated
            high-traffic commerce apps to Next.js and added Three.js product viewers.
          </p>
          <p>
            Outside work I lead: President of IEEE Computer Society and M.D. of FinDrome, the finance cell. My
            portfolio site won the <span className="text-white">Neuro Web Award 2026</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="panel p-5 font-mono text-[0.8rem]"
        >
          <p className="mb-3 text-white/40">
            <span className="text-up">const</span> meeket = {"{"}
          </p>
          <dl className="space-y-1.5 pl-4">
            {spec.map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="shrink-0 text-cyan">{k}:</dt>
                <dd className="text-amber">&quot;{v}&quot;,</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-white/40">{"}"};</p>
        </motion.div>
      </div>

      <div className="panel mt-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] font-mono text-[0.8rem]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-white/40">
              <th className="px-5 py-3 font-normal">QUALIFICATION</th>
              <th className="px-5 py-3 font-normal">INSTITUTE</th>
              <th className="px-5 py-3 text-right font-normal">SCORE</th>
              <th className="px-5 py-3 text-right font-normal">YEAR</th>
            </tr>
          </thead>
          <tbody>
            {education.map((e) => (
              <tr key={e.degree} className="border-b border-white/[0.04] transition last:border-0 hover:bg-up/[0.04]">
                <td className="px-5 py-3 text-white">{e.degree}</td>
                <td className="px-5 py-3 text-white/60">{e.school}</td>
                <td className="px-5 py-3 text-right tabular-nums text-up">{e.score}</td>
                <td className="px-5 py-3 text-right tabular-nums text-white/60">{e.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
