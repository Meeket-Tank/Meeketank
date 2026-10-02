"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FiCopy, FiMail, FiSend } from "react-icons/fi";
import SectionHeading from "./section-heading";
import { profile } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: FiMail, copy: true },
  { label: "College", value: profile.collegeEmail, href: `mailto:${profile.collegeEmail}`, icon: FiMail, copy: true },
  { label: "LinkedIn", value: "in/meeketank", href: profile.linkedin, icon: BsLinkedin },
  { label: "GitHub", value: "@meeketank", href: profile.github, icon: FaGithub },
];

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.3);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);

    try {
      const response = await fetch("https://formspree.io/f/mqabqzqe", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("Message transmitted. I’ll reply soon!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please email me directly.");
    } finally {
      setPending(false);
    }
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn’t copy");
    }
  }

  const input =
    "w-full rounded-lg border border-white/10 bg-ink-950/70 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 outline-none transition focus:border-up/60 focus:shadow-[0_0_0_3px_rgba(0,227,150,0.12)]";

  return (
    <section ref={ref} id="contact" className="scroll-mt-24 py-20">
      <SectionHeading index="07" kicker="Contact · open a position">
        Let’s build something that compounds.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <ul className="space-y-3">
          {channels.map((c) => (
            <li key={c.label} className="panel-glow flex items-center gap-4 px-4 py-3.5">
              <c.icon className="shrink-0 text-lg text-up" />
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="min-w-0 flex-1">
                <span className="label block">{c.label}</span>
                <span className="block truncate font-mono text-sm text-white">{c.value}</span>
              </a>
              {c.copy && (
                <button
                  onClick={() => copy(c.value)}
                  aria-label={`Copy ${c.label.toLowerCase()} address`}
                  className="rounded-md p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
                >
                  <FiCopy />
                </button>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="panel space-y-3 p-5">
          <p className="font-mono text-xs text-white/40">
            <span className="text-up">POST</span> /meeket/inbox <span className="text-white/25">— routed via Formspree</span>
          </p>
          <input className={input} name="name" placeholder="name" maxLength={120} autoComplete="name" />
          <input
            className={input}
            name="email"
            type="email"
            required
            maxLength={500}
            placeholder="email *"
            autoComplete="email"
          />
          <textarea
            className={`${input} h-40 resize-none`}
            name="message"
            placeholder="message * — role, project, or just hello"
            required
            maxLength={5000}
          />
          <button type="submit" disabled={pending} className="btn-primary w-full justify-center disabled:opacity-60">
            {pending ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink-950 border-t-transparent" />
                transmitting…
              </>
            ) : (
              <>
                Send message <FiSend />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
