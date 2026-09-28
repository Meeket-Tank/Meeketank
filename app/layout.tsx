import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NetworkBackground from "@/components/network-background";
import CommandPalette from "@/components/command-palette";
import BootSequence from "@/components/boot-sequence";
import ActiveSectionContextProvider from "@/context/active-section-context";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Meeket Tank | Finance × Tech Portfolio",
  description:
    "Meeket Tank — MBA Tech (Finance) at NMIMS. Finance automation, analytics and full-stack development. Live market terminal portfolio with resume.",
  keywords: ["Meeket Tank", "portfolio", "finance", "fintech", "Next.js", "NMIMS", "JSW Steel", "resume"],
  themeColor: "#04060a",
  icons: { icon: "/self.png" },
  openGraph: {
    title: "Meeket Tank | Finance × Tech",
    description: "A live market-terminal portfolio: resume, projects and real-time market clocks.",
    url: "https://meeket.in",
    images: ["/self.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="scanlines relative min-h-screen bg-ink-950 font-sans text-white antialiased">
        <div aria-hidden className="grid-bg pointer-events-none fixed inset-0 -z-20" />
        <div
          aria-hidden
          className="pointer-events-none fixed -top-40 left-1/2 -z-20 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-up/[0.07] blur-[140px]"
        />
        <NetworkBackground />

        <ActiveSectionContextProvider>
          <BootSequence />
          <Header />
          {children}
          <Footer />
          <CommandPalette />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0c121b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
              },
            }}
          />
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
