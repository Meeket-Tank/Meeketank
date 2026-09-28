"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { heroStats, profile } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import CareerChart from "./career-chart";
import CountUp from "./count-up";
import Typewriter from "./typewriter";
import { openTerminal } from "./command-palette";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: "easeOut" },
});

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.3);

  return (
    <section ref={ref} id="home" className="scroll-mt-40 pb-24 pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <span className="absolute -inset-1 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#00e396,transparent_40%,#35d0ff,transparent_80%,#00e396)] opacity-80" />
              <Image
                src="/self.png"
                alt="Portrait of Meeket Tank"
                width={128}
                height={128}
                priority
                className="relative h-16 w-16 rounded-full border-2 border-ink-950 object-cover"
              />
            </div>
            <div className="font-mono text-xs leading-relaxed text-white/55">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-up animate-pulseDot" />
                <span className="text-up">OPEN TO OPPORTUNITIES</span>
              </p>
              <p>{profile.location} · MBA Tech ’27 · NMIMS</p>
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Meeket Tank
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-4 font-mono text-lg sm:text-xl">
            <span className="text-white/40">&gt; </span>
            <Typewriter words={profile.roles} />
          </motion.p>

          <motion.p {...fadeUp(0.24)} className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/65">
            I build where <span className="text-white">finance meets code</span> — automating treasury and
            channel-finance workflows at <span className="text-white">JSW Steel</span>, shipping Next.js commerce at{" "}
            <span className="text-white">Logixal</span>, and training models that forecast markets and score credit
            risk.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#resume" className="btn-primary group">
              View resume
              <BsArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a href={profile.resume} download="Meeket_Tank_Resume.pdf" className="btn-ghost group">
              Download CV
              <HiDownload className="transition group-hover:translate-y-0.5" />
            </a>
            <button onClick={openTerminal} className="btn-ghost">
              <span className="text-up">&gt;_</span> Ask the terminal
            </button>
            <div className="ml-1 flex items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white/70 transition hover:border-up/60 hover:text-white"
              >
                <BsLinkedin />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-lg text-white/70 transition hover:border-up/60 hover:text-white"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          <CareerChart />
        </motion.div>
      </div>

      <motion.dl
        {...fadeUp(0.45)}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4"
      >
        {heroStats.map((s) => (
          <div key={s.label} className="bg-ink-900/90 px-5 py-5">
            <dd className="font-mono text-3xl font-semibold text-white">
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="label mt-1 normal-case tracking-wide">{s.label}</dt>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
