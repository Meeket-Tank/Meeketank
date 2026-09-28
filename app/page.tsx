import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-36">
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Resume />
      <Contact />
    </main>
  );
}
