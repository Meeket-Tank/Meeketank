"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
  I am an <strong>MBA(Tech)(Computer Engineering) student at NMIMS</strong>,
  where I'm deeply focused on enhancing my technical and creative skills for a
  dynamic career in tech. My background includes practical experience in
  <strong>website management</strong> and proficiency in
  <strong>Microsoft tools</strong>, allowing me to contribute valuable insights
  to digital projects. My experience in <strong>technical support</strong> has
  also given me a solid understanding of project dynamics and financial
  management. <span className="italic">My favorite part of programming</span>
  is the problem-solving aspect, as I thrive on finding solutions to complex
  challenges and using technology to drive growth.
</p>

<p>
  <span className="italic">When I'm not immersed in code or studies</span>, I
  am passionate about continuous learning and embracing new challenges. I enjoy
  exploring how technology can be used to make a meaningful impact. I'm also a
  <strong>collaborative communicator</strong>, dedicated to achieving shared
  goals as a results-oriented team member.
</p>
    </motion.section>
  );
}
