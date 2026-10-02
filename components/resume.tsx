"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { HiDownload } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import SectionHeading from "./section-heading";
import { certifications, education, experiences, profile, projects, skillBook } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

type Tab = "pdf" | "json";

/** Minimal JSON syntax highlighter: returns spans for keys, strings and numbers. */
function highlight(json: string) {
  return json.split("\n").map((line, i) => {
    const parts: React.ReactNode[] = [];
    const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(\b\d+(?:\.\d+)?\b)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      parts.push(line.slice(last, m.index));
      if (m[1] && m[2]) parts.push(<span key={m.index} className="text-cyan">{m[1]}</span>, m[2]);
      else if (m[1]) parts.push(<span key={m.index} className="text-amber">{m[1]}</span>);
      else parts.push(<span key={m.index} className="text-up">{m[3]}</span>);
      last = m.index + m[0].length;
    }
    parts.push(line.slice(last));
    return (
      <div key={i} className="table-row">
        <span className="table-cell select-none pr-4 text-right text-white/20">{i + 1}</span>
        <span className="table-cell whitespace-pre-wrap text-white/60">{parts}</span>
      </div>
    );
  });
}

export default function Resume() {
  const { ref } = useSectionInView("Resume", 0.25);
  const [tab, setTab] = useState<Tab>("pdf");

  const json = useMemo(
    () =>
      JSON.stringify(
        {
          name: profile.fullName,
          headline: profile.headline,
          contact: { email: profile.email, linkedin: profile.linkedin, github: profile.github },
          education: education.map((e) => ({ degree: e.degree, school: e.school, score: e.score, year: e.year })),
          experience: experiences
            .filter((e) => e.kind !== "Earlier")
            .map((e) => ({ company: e.company, role: e.role, period: e.period, impact: e.metrics.map((m) => `${m.label}: ${m.value}`) })),
          projects: projects.slice(0, 4).map((p) => ({ title: p.title, year: Number(p.year), stack: p.tags })),
          skills: {
            finance: skillBook.finance.map((s) => s.name),
            tech: skillBook.tech.map((s) => s.name),
          },
          certifications: certifications.map((c) => `${c.name} — ${c.issuer}`),
        },
        null,
        2
      ),
    []
  );

  return (
    <section ref={ref} id="resume" className="scroll-mt-24 py-20">
      <SectionHeading index="06" kicker="Resume">
        The full prospectus.
      </SectionHeading>

      <div className="panel overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-3 py-2.5">
          {(["pdf", "json"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                "rounded-md px-3 py-1.5 font-mono text-xs transition",
                tab === t ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              )}
            >
              {t === "pdf" ? "Meeket_Tank_Resume.pdf" : "resume.json"}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost !px-3 !py-1.5 !text-xs">
              <FiExternalLink /> Open
            </a>
            <a href={profile.resume} download="Meeket_Tank_Resume.pdf" className="btn-primary !px-3 !py-1.5 !text-xs">
              <HiDownload /> Download
            </a>
          </div>
        </div>

        {tab === "pdf" ? (
          <div className="relative bg-ink-950">
            <object
              data={`${profile.resume}#view=FitH&toolbar=0`}
              type="application/pdf"
              className="h-[80vh] max-h-[1100px] min-h-[520px] w-full"
              aria-label="Meeket Tank resume"
            >
              <div className="grid h-[420px] place-items-center p-6 text-center">
                <div>
                  <p className="text-white/70">Your browser can’t preview PDFs inline.</p>
                  <p className="mt-1 text-sm text-white/45">Open it in a new tab, or switch to resume.json.</p>
                  <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary mt-5">
                    <FiExternalLink /> Open resume
                  </a>
                </div>
              </div>
            </object>
          </div>
        ) : (
          <div className="max-h-[80vh] overflow-auto p-5 font-mono text-[0.78rem] leading-relaxed">
            <div className="table">{highlight(json)}</div>
          </div>
        )}
      </div>
    </section>
  );
}
