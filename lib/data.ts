import next from "@/public/next.png";
import app from "@/public/app.png";
import mecube from "@/public/mecube.png";
import findrome from "@/public/findrome.png";
import iskcon from "@/public/iskcon.png";
import type { StaticImageData } from "next/image";

export const profile = {
  name: "Meeket Tank",
  fullName: "Meeket Ketan Tank",
  ticker: "MKT",
  headline: "MBA Tech · Finance × Computer Engineering",
  roles: [
    "Finance Technologist",
    "Full-Stack Developer",
    "Financial Analyst",
    "Data & AI Builder",
  ],
  location: "Mumbai, India",
  email: "meeketketantank@gmail.com",
  collegeEmail: "meeketketan.tank78@nmims.in",
  linkedin: "https://www.linkedin.com/in/meeketank/",
  github: "https://github.com/meeketank",
  website: "https://meeket.in",
  resume: "/CV.pdf",
} as const;

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Experience", hash: "#experience" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Resume", hash: "#resume" },
  { name: "Contact", hash: "#contact" },
] as const;

export const heroStats = [
  { label: "Team efficiency gain @ JSW (up to)", value: 50, suffix: "%", prefix: "+" },
  { label: "Manual hours saved / wk", value: 10, suffix: "h", prefix: "" },
  { label: "Page-load cut @ Logixal", value: 35, suffix: "%", prefix: "−" },
  { label: "Certifications", value: 10, suffix: "+", prefix: "" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  kind: "Internship" | "Leadership" | "Earlier";
  metrics: { label: string; value: string }[];
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "JSW Steel Ltd",
    role: "Management Intern · Finance & Accounts",
    period: "May 2026 – Sep 2026",
    location: "Mumbai",
    kind: "Internship",
    metrics: [
      { label: "Efficiency", value: "+40–50%" },
      { label: "Manual work saved", value: "10 h / wk" },
      { label: "LOR", value: "VP, JSW Steel" },
    ],
    points: [
      "Worked across Channel Finance (Credit Control), Project, Debt and Trade Finance in the F&A department.",
      "Built a report analytics system that automates renaming, merging and visualisation of bank reports.",
      "Shipped a real-time mutual fund tracking and FD management app for treasury decision making.",
      "Upgraded Excel workflows with Power Query, Python and a web UI, raising team efficiency by 40–50%.",
      "Architected the integration of complex financial datasets to improve data integrity across F&A.",
    ],
    stack: ["Node.js", "React", "Playwright", "Python", "Power Query", "OCR"],
  },
  {
    company: "Logixal Solutions",
    role: "Technical Intern · VTEX Web Development",
    period: "May 2025 – Jul 2025",
    location: "Mumbai",
    kind: "Internship",
    metrics: [
      { label: "Page-load time", value: "−35%" },
      { label: "Migration", value: "React → Next.js" },
      { label: "LOR", value: "Logixal" },
    ],
    points: [
      "Worked on enterprise-scale e-commerce platforms in the VTEX team.",
      "Migrated high-traffic apps from React to Next.js for better SEO, speed and scalability.",
      "Delivered dynamic pricing, real-time inventory sync and persistent session state.",
      "Integrated interactive 3D product visualisations with Three.js.",
    ],
    stack: ["Next.js", "React", "Three.js", "VTEX", "TypeScript"],
  },
  {
    company: "Chyzzy",
    role: "Strategist",
    period: "2025",
    location: "Remote",
    kind: "Leadership",
    metrics: [
      { label: "Ops delays", value: "−30%" },
      { label: "New clients", value: "+3" },
    ],
    points: [
      "Formulated premium apparel positioning through market analysis.",
      "Streamlined cross-team workflows, improving order-fulfilment efficiency.",
    ],
    stack: ["Market Analysis", "Strategy", "Operations"],
  },
  {
    company: "IEEE Computer Society, MPSTME",
    role: "President",
    period: "2024",
    location: "Mumbai",
    kind: "Leadership",
    metrics: [
      { label: "Team", value: "50 members" },
      { label: "Participants", value: "200+" },
    ],
    points: [
      "Led a 50-member team and organised 3 inter-collegiate competitions with 200+ participants.",
    ],
    stack: ["Leadership", "Event Management", "Web"],
  },
  {
    company: "FinDrome — Finance Cell, NMIMS",
    role: "Managing Director",
    period: "2024",
    location: "Mumbai",
    kind: "Leadership",
    metrics: [{ label: "Community", value: "100+ members" }],
    points: [
      "Led a 100+ member finance community focused on financial analysis and fintech projects.",
    ],
    stack: ["Finance", "Fintech", "Leadership"],
  },
  {
    company: "Crowwd · ISKCON · CodeClause · Sparks Foundation · LetsGrowMore · Acmegrade",
    role: "Research Analyst, Tech Lead & Developer Internships",
    period: "2023 – 2025",
    location: "Remote / Hybrid",
    kind: "Earlier",
    metrics: [{ label: "Roles", value: "6" }],
    points: [
      "Financial research and reporting for Crowwd (London, remote).",
      "Designed and ran three official ISKCON Juhu websites (WordPress, Wix, DNS).",
      "Web and Android development internships across JavaScript, WordPress and Java.",
    ],
    stack: ["Financial Research", "WordPress", "JavaScript", "Android"],
  },
];

export type Project = {
  title: string;
  year: string;
  category: "Fintech" | "AI / ML" | "Web";
  description: string;
  highlights: string[];
  tags: string[];
  link?: { label: string; href: string };
  image?: StaticImageData;
  live?: boolean;
};

export const projects: Project[] = [
  {
    title: "Channel Finance Reports Management & Analysis System",
    year: "2026",
    category: "Fintech",
    description:
      "Full-stack finance automation platform that downloads, consolidates, monitors and analyses bank reports end to end.",
    highlights: [
      "Real-time dashboards",
      "OCR + scheduling",
      "Directory monitoring",
      "AI-assisted processing",
    ],
    tags: ["Node.js", "React", "Playwright", "OCR", "AI"],
  },
  {
    title: "Mutual Fund Analytics & Comparison System",
    year: "2026",
    category: "Fintech",
    description:
      "Real-time mutual fund analytics on AMFI data: screening, comparison, historical return analysis and AI-generated summaries.",
    highlights: [
      "Live AMFI NAV feed",
      "Fund screener",
      "Portfolio comparison",
      "AI summaries",
    ],
    tags: ["AMFI API", "React", "Charts", "AI"],
    link: { label: "mfd.meeket.in", href: "https://mfd.meeket.in/" },
    live: true,
  },
  {
    title: "Jinni — Predictive Market Analysis (AI/ML)",
    year: "2026",
    category: "AI / ML",
    description:
      "Hybrid market-prediction system combining LSTM, Random Forest, technical indicators and fundamental ratios for forecasting and trade signals.",
    highlights: ["LSTM + RF ensemble", "RSI · MACD · MA", "Trade signals", "Viz dashboards"],
    tags: ["Python", "LSTM", "Random Forest", "Pandas", "Time Series"],
    link: {
      label: "GitHub",
      href: "https://github.com/Meeketank/Jinni-Indian-Stock-Market-AI",
    },
  },
  {
    title: "SME Credit Risk Assessment",
    year: "2025",
    category: "AI / ML",
    description:
      "Final-year B.Tech project: a credit-risk model for Indian SMEs, benchmarking ML models on financial and economic data.",
    highlights: ["Default prediction", "Debt & liquidity factors", "Model benchmarking"],
    tags: ["Python", "scikit-learn", "Credit Risk", "Finance"],
  },
  {
    title: "React E-commerce Website",
    year: "2024",
    category: "Web",
    description:
      "Full-stack store with product browsing, cart and validated checkout.",
    highlights: ["Cart + checkout", "Form validation"],
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    image: next,
  },
  {
    title: "Personal 3D Cube Site",
    year: "2023",
    category: "Web",
    description:
      "A 3D cube that follows on-screen motion; each face opens a different section.",
    highlights: ["3D interaction", "Motion-driven UI"],
    tags: ["JavaScript", "3D", "Framer"],
    image: mecube,
  },
  {
    title: "FinDrome Website",
    year: "2023",
    category: "Web",
    description: "Finance-cell site with financial data and live content updates.",
    highlights: ["Finance content", "Live updates"],
    tags: ["Wix"],
    image: findrome,
  },
  {
    title: "ISKCON Websites",
    year: "2024",
    category: "Web",
    description:
      "Built and ran ISKCON Kopargaon and GitaLifeYouth sites with daily darshan, galleries and e-commerce.",
    highlights: ["Daily content", "E-commerce"],
    tags: ["Wix", "WordPress"],
    image: iskcon,
  },
  {
    title: "Cloud Chat Application",
    year: "2023",
    category: "Web",
    description: "Android chat app built with Java and Firebase.",
    highlights: ["Realtime chat", "Firebase"],
    tags: ["Android", "Java", "Firebase"],
    image: app,
  },
];

// Skills rendered as an order book: finance on the bid side, tech on the ask side.
// `depth` is a 0–100 self-rating that drives the depth bar.
export const skillBook = {
  finance: [
    { name: "Financial Modeling", depth: 92 },
    { name: "Corporate & Channel Finance", depth: 88 },
    { name: "Portfolio Analytics", depth: 86 },
    { name: "Risk Metrics", depth: 82 },
    { name: "Time-Series Forecasting", depth: 80 },
    { name: "Financial Accounting & Markets", depth: 84 },
    { name: "Power BI · Tableau", depth: 85 },
    { name: "Excel · Power Query · Macros", depth: 94 },
    { name: "Statistical Testing", depth: 78 },
  ],
  tech: [
    { name: "React · Next.js", depth: 93 },
    { name: "Node.js · Express", depth: 88 },
    { name: "TypeScript · JavaScript", depth: 90 },
    { name: "Python · Pandas · NumPy", depth: 89 },
    { name: "Machine & Deep Learning", depth: 80 },
    { name: "API Integration & Automation", depth: 90 },
    { name: "Playwright · OCR", depth: 84 },
    { name: "Three.js", depth: 72 },
    { name: "AI Solutions & Prompting", depth: 88 },
  ],
} as const;

export const certifications = [
  { name: "FMVA & BIDA", issuer: "Corporate Finance Institute" },
  { name: "Forward Program", issuer: "McKinsey & Company" },
  { name: "NISM Series V-A: Mutual Fund Distributors", issuer: "SEBI · NISM" },
  { name: "Financial Management", issuer: "Duke University" },
  { name: "Advanced Data Analytics", issuer: "Google" },
  { name: "Project Management Capstone", issuer: "IBM" },
  { name: "Machine & Deep Learning Specialization", issuer: "DeepLearning.AI" },
  { name: "Finance & Spreadsheet Analysis", issuer: "Bloomberg" },
] as const;

export const achievements = [
  {
    title: "Neuro Web Award 2026",
    detail:
      "wirkungswerk GmbH & Co. KG — recognised among the best web designs for meeket.in.",
  },
  {
    title: "Letters of Recommendation",
    detail: "From Logixal and the Vice President of JSW Steel for innovation and project work.",
  },
  {
    title: "President, IEEE Computer Society",
    detail: "50-member team, 3 inter-collegiate competitions, 200+ participants.",
  },
  {
    title: "M.D., FinDrome Finance Cell",
    detail: "Led a 100+ member finance and fintech community.",
  },
] as const;

export const education = [
  {
    degree: "MBA Tech (Finance major, BI & Analytics minor)",
    school: "MPSTME, NMIMS Mumbai",
    score: "2.96 / 4",
    year: "2027",
  },
  {
    degree: "B.Tech Computer Engineering",
    school: "MPSTME, NMIMS Mumbai",
    score: "2.96 / 4",
    year: "2027",
  },
  { degree: "XII · HSC", school: "Saraswati Vidya Mandir Jr. College", score: "83.17%", year: "2022" },
  { degree: "X · ICSE", school: "GES English Medium School", score: "80.50%", year: "2020" },
] as const;

// Timeline milestones that annotate the $MKT career chart.
export const milestones = [
  { label: "First dev internships", year: "2023" },
  { label: "IEEE CS President", year: "2024" },
  { label: "Logixal · Next.js", year: "2025" },
  { label: "JSW Steel · F&A", year: "2026" },
] as const;
