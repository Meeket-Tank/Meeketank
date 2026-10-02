"use client";

import { useEffect, useState } from "react";

type Quote = { symbol: string; price: string; change: number; kind: "fund" | "career" };

// AMFI scheme codes (direct-growth plans), served with CORS by api.mfapi.in.
const FUND_CODES = ["122639", "120716", "118989", "120503", "125497", "120586"];

// Resume KPIs rendered as tickers; always shown next to the live fund feed.
const CAREER: Quote[] = [
  { symbol: "MKT.JSW.EFFICIENCY", price: "+40–50%", change: 45, kind: "career" },
  { symbol: "MKT.F&A.HOURS/WK", price: "10h saved", change: 10, kind: "career" },
  { symbol: "MKT.LOGIXAL.LOADTIME", price: "−35%", change: 35, kind: "career" },
  { symbol: "MKT.CHYZZY.DELAYS", price: "−30%", change: 30, kind: "career" },
  { symbol: "MKT.IEEE.PARTICIPANTS", price: "200+", change: 12, kind: "career" },
  { symbol: "MKT.CERTS", price: "10+", change: 8, kind: "career" },
];

function shortName(name: string) {
  return name
    .split(/\s[-–]\s/)[0]
    .replace(/\b(Fund|Plan|Direct|Growth|Option)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

async function fetchFund(code: string): Promise<Quote | null> {
  const res = await fetch(`https://api.mfapi.in/mf/${code}`);
  if (!res.ok) return null;
  const json = await res.json();
  const [latest, prev] = json?.data ?? [];
  if (!latest || !prev || !json.meta?.scheme_name) return null;
  const nav = Number(latest.nav);
  const change = ((nav - Number(prev.nav)) / Number(prev.nav)) * 100;
  return {
    symbol: shortName(json.meta.scheme_name),
    price: `₹${nav.toFixed(2)}`,
    change,
    kind: "fund",
  };
}

export default function TickerTape() {
  const [funds, setFunds] = useState<Quote[]>([]);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [updated, setUpdated] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.allSettled(FUND_CODES.map(fetchFund));
      if (cancelled) return;
      const ok = results
        .map((r) => (r.status === "fulfilled" ? r.value : null))
        .filter((q): q is Quote => q !== null);
      if (ok.length) {
        setFunds(ok);
        setStatus("live");
        setUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } else {
        setStatus((s) => (s === "live" ? s : "offline"));
      }
    }

    load();
    const id = setInterval(load, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const items = [...funds, ...CAREER];

  return (
    <div className="flex h-8 items-center border-b border-white/[0.06] bg-ink-950/80 font-mono text-[0.72rem]">
      <div
        className="flex h-full shrink-0 items-center gap-2 border-r border-white/[0.06] px-3 text-white/60"
        title={
          status === "live"
            ? `Mutual fund NAVs from AMFI via mfapi.in · fetched ${updated}`
            : "Live NAV feed unavailable — showing career metrics only"
        }
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            status === "live" ? "bg-up animate-pulseDot" : status === "loading" ? "bg-amber animate-pulseDot" : "bg-white/30"
          }`}
        />
        <span className="hidden sm:inline">
          {status === "live" ? "AMFI NAV · LIVE" : status === "loading" ? "CONNECTING" : "CAREER FEED"}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {items.map((q) => (
                <li key={q.symbol + dup} className="flex items-center gap-2 px-5 whitespace-nowrap">
                  <span className={q.kind === "career" ? "text-cyan" : "text-white/80"}>{q.symbol}</span>
                  <span className="text-white/90">{q.price}</span>
                  {q.kind === "fund" && (
                    <span className={q.change >= 0 ? "text-up" : "text-down"}>
                      {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change).toFixed(2)}%
                    </span>
                  )}
                  {q.kind === "career" && <span className="text-up">▲</span>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
