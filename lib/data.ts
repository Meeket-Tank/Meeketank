import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import next from "@/public/next.png";
import findrome from "@/public/findrome.png";
import app from "@/public/app.png";
import mecube from "@/public/mecube.png";
import iskcon from "@/public/iskcon.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Web Developer Internship",
    location: "Logixal Inc · Sakinaka, Mumbai · On-site",
    description:
      "Gaining practical experience in web development, applying skills in React.js, AngularJS, Angular, Node.js, HTML, and CSS.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaCode)
    date: "May 2025 - Present", // Current year is 2025
  },
  {
    title: "President",
    location: "IEEE Computer Society MPSTME · Mumbai, Maharashtra, India · On-site",
    description:
      "Led the technical department, overseeing registrations, website management, content creation, and database management. Managed and mentored executive team members, providing technical support. Developed strong skills in Team Management, WordPress, Technical Support, Canva, Project Management, Management, Operations Management, and Event Management.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaUsers)
    date: "Sep 2023 - Present",
  },
  {
    title: "Advisor",
    location: "FinDrome - The Finance Cell of NMIMS MPSTME",
    description: "Serving as an advisor for the finance cell.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaBuilding)
    date: "Mar 2022 - Present",
  },
  {
    title: "Secretary",
    location: "IEEE NMIMS MPSTME · Mumbai, Maharashtra, India · On-site",
    description:
      "Managed the entire committee, overseeing different departments and implementing new rules and regulations for improved efficiency. Collaborated on crucial decisions for committee operations, finance, and overall effectiveness. Enhanced skills in Management and Team Management.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaUsers)
    date: "Dec 2023 - Jan 2025",
  },
  {
    title: "Technical Lead",
    location: "ISKCON · Mumbai, Maharashtra, India · Hybrid",
    description:
      "Provided technical leadership to transition and optimize websites online. Designed and updated three official sites for ISKCON Juhu campus, utilizing WordPress, Wix, and DNS management.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaLaptopCode)
    date: "May 2024 - Jun 2024",
  },
  {
    title: "Financial Research Analyst",
    location: "Crowwd · London Area, United Kingdom · Remote",
    description:
      "Conducted financial research and analysis, gaining experience in Finance, Financial Reporting, and Financial Analysis.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaChartLine)
    date: "Aug 2024 - Jan 2025",
  },
  {
    title: "Web Developer Intern",
    location: "CodeClause · Mumbai, Maharashtra, India · Remote",
    description:
      "Completed multiple web development projects, enhancing skills in JavaScript, CSS, HTML, and general Web Development.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaCode)
    date: "Jun 2023 - Jul 2023",
  },
  {
    title: "Web Developer Intern",
    location: "The Sparks Foundation · Mumbai, Maharashtra, India · Remote",
    description:
      "Designed and managed websites for the company, focusing on functionality and user experience. Applied skills in JavaScript, CSS, HTML, and WordPress.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaCode)
    date: "May 2023 - Jun 2023",
  },
  {
    title: "Web Developer Intern",
    location: "LetsGrowMore · Mumbai, Maharashtra, India · Remote",
    description:
      "Developed projects using JavaScript, HTML, and CSS, focusing on UI integration and efficient code. Gained hands-on experience with Git and repository creation.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaCode)
    date: "May 2023 - May 2023",
  },
  {
    title: "Android Developer Intern",
    location: "Acmegrade · Remote",
    description:
      "Developed an e-commerce Android application using Java in Android Studio. Gained hands-on experience in application creation, testing, and debugging. Developed skills in Android Development and Mobile Applications.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaMobileAlt)
    date: "Feb 2023 - Apr 2023",
  },
  {
    title: "Campus Ambassador",
    location: "Acmegrade · Hybrid",
    description:
      "Promoted company programs to students, raising awareness about their benefits. Enhanced communication skills through direct engagement and program advocacy. Developed skills in Digital Marketing, Marketing, Communication, and English.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaBullhorn)
    date: "Jan 2023 - Feb 2023",
  },
  {
    title: "Executive Digital Creatives",
    location: "IEC MPSTME · Mumbai, Maharashtra, India",
    description:
      "Contributed to digital creative initiatives aimed at holistic student development. Utilized skills in Adobe Photoshop, Corel, CorelDRAW, and Canva.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaPalette)
    date: "Sep 2022 - Mar 2023",
  },
  {
    title: "Organising Member",
    location: "Taqneeq · Mumbai, Maharashtra, India · On-site",
    description: "Contributed to event organization, focusing on communication.",
    icon: React.createElement("div"), // Replace with a relevant icon (e.g., FaCalendarAlt)
    date: "Nov 2023 - Feb 2024",
  },
] as const;

export const projectsData = [
  {
    title: "React Ecommerce Website",
    description:
      "I worked as a full-stack developer on this project for a month. Users can check out the products add them to cart and even checkout with form validation.",
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    imageUrl: next,
  },
  {
    title: "Cloud Chat application",
    description:
      "This was my learning android app development project where I used Java, Firebase and Android Studio to create a simple chat application.",
    tags: ["Chat", "Android", "App Dev", "Java", "XML"],
    imageUrl: app,
  },
  {
    title: "Personal cube site",
    description:
      "This is a simple site made with javascript which shows a cube which is 3D and moves as per the motion done on the screen, each side of the die has a option of selection.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: mecube,
  },
  {
    title: "Findrome site",
    description:
      "This is a simple site for college committe which has financial data and realtime context update.",
    tags: ["Wix"],
    imageUrl: findrome,
  },
  {
    title: "Iskcon website",
    description:
      "I have made and managed ISKCON Kopargaon, GitaLifeYouth website which had their data and daily darshan and images with simple ecommerce integration.",
    tags: ["Wix", "Wordpress"],
    imageUrl: iskcon,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Angular.js",
  "C++",
  "Git",
  "MongoDB",
  "Redux",
  "Data analytics",
  "Financial analytics",
  "Express",
  "Python",
] as const;
