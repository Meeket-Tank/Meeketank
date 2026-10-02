"use client";

import { useEffect, useRef, useState } from "react";
import { milestones } from "@/lib/data";

type Candle = { o: number; h: number; l: number; c: number };

const CAPACITY = 72;
const INITIAL = 48;
const TICK_MS = 650;
const TICKS_PER_CANDLE = 6;

function seedCandles(): { candles: Candle[]; marks: { i: number; label: string }[] } {
  const candles: Candle[] = [];
  let price = 100;
  for (let i = 0; i < INITIAL; i++) {
    // upward drift with the occasional pullback — a career, basically
    const drift = 1.6 + Math.sin(i / 5) * 1.2;
    const o = price;
    const c = o + drift + (Math.random() - 0.45) * 5;
    const h = Math.max(o, c) + Math.random() * 3;
    const l = Math.min(o, c) - Math.random() * 3;
    candles.push({ o, h, l, c });
    price = c;
  }
  const step = Math.floor(INITIAL / (milestones.length + 1));
  const marks = milestones.map((m, k) => ({ i: step * (k + 1), label: `${m.year} · ${m.label}` }));
  return { candles, marks };
}

export default function CareerChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const state = useRef<{ candles: Candle[]; marks: { i: number; label: string }[]; ticks: number; hover: number | null }>({
    candles: [],
    marks: [],
    ticks: 0,
    hover: null,
  });
  const [quote, setQuote] = useState({ price: 0, change: 0, vol: 0 });
  const [hoverInfo, setHoverInfo] = useState<Candle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const s = state.current;
    const seeded = seedCandles();
    s.candles = seeded.candles;
    s.marks = seeded.marks;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let vol = 18_240;
    // canvas can't resolve CSS variables, so read the loaded mono font family once
    const mono = getComputedStyle(document.body).getPropertyValue("--font-mono").trim() || "monospace";

    function resize() {
      w = wrap!.clientWidth;
      h = wrap!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function draw() {
      const { candles, marks, hover } = s;
      const pad = { l: 8, r: 62, t: 14, b: 22 };
      const cw = (w - pad.l - pad.r) / CAPACITY;
      let max = -Infinity;
      let min = Infinity;
      for (const c of candles) {
        max = Math.max(max, c.h);
        min = Math.min(min, c.l);
      }
      const range = max - min || 1;
      max += range * 0.08;
      min -= range * 0.08;
      const y = (v: number) => pad.t + ((max - v) / (max - min)) * (h - pad.t - pad.b);

      ctx!.clearRect(0, 0, w, h);

      // grid + price axis
      ctx!.font = `10px ${mono}, monospace`;
      for (let g = 0; g <= 4; g++) {
        const gy = pad.t + (g / 4) * (h - pad.t - pad.b);
        ctx!.strokeStyle = "rgba(255,255,255,0.05)";
        ctx!.beginPath();
        ctx!.moveTo(pad.l, gy);
        ctx!.lineTo(w - pad.r, gy);
        ctx!.stroke();
        ctx!.fillStyle = "rgba(255,255,255,0.35)";
        ctx!.fillText((max - (g / 4) * (max - min)).toFixed(1), w - pad.r + 8, gy + 3);
      }

      // milestone markers
      ctx!.setLineDash([3, 4]);
      for (const m of marks) {
        if (m.i < 0 || m.i >= candles.length) continue;
        const x = pad.l + m.i * cw + cw / 2;
        ctx!.strokeStyle = "rgba(53,208,255,0.35)";
        ctx!.beginPath();
        ctx!.moveTo(x, pad.t);
        ctx!.lineTo(x, h - pad.b);
        ctx!.stroke();
        ctx!.save();
        ctx!.translate(x + 4, pad.t + 4);
        ctx!.rotate(Math.PI / 2);
        ctx!.fillStyle = "rgba(53,208,255,0.75)";
        ctx!.fillText(m.label, 0, 0);
        ctx!.restore();
      }
      ctx!.setLineDash([]);

      // candles
      candles.forEach((c, i) => {
        const x = pad.l + i * cw;
        const up = c.c >= c.o;
        const color = up ? "#00e396" : "#ff4d6d";
        ctx!.strokeStyle = color;
        ctx!.fillStyle = color;
        ctx!.globalAlpha = hover === null || hover === i ? 1 : 0.55;
        ctx!.beginPath();
        ctx!.moveTo(x + cw / 2, y(c.h));
        ctx!.lineTo(x + cw / 2, y(c.l));
        ctx!.stroke();
        const top = y(Math.max(c.o, c.c));
        const bh = Math.max(1, Math.abs(y(c.o) - y(c.c)));
        ctx!.fillRect(x + cw * 0.18, top, cw * 0.64, bh);
      });
      ctx!.globalAlpha = 1;

      // last price line + tag
      const last = candles[candles.length - 1];
      const ly = y(last.c);
      ctx!.strokeStyle = "rgba(0,227,150,0.6)";
      ctx!.setLineDash([2, 3]);
      ctx!.beginPath();
      ctx!.moveTo(pad.l, ly);
      ctx!.lineTo(w - pad.r, ly);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.fillStyle = "#00e396";
      ctx!.fillRect(w - pad.r + 2, ly - 8, pad.r - 4, 16);
      ctx!.fillStyle = "#04060a";
      ctx!.font = `bold 10px ${mono}, monospace`;
      ctx!.fillText(last.c.toFixed(2), w - pad.r + 7, ly + 3.5);

      // crosshair
      if (hover !== null && candles[hover]) {
        const hx = pad.l + hover * cw + cw / 2;
        ctx!.strokeStyle = "rgba(255,255,255,0.25)";
        ctx!.beginPath();
        ctx!.moveTo(hx, pad.t);
        ctx!.lineTo(hx, h - pad.b);
        ctx!.stroke();
      }
    }

    function tick() {
      const candles = s.candles;
      const last = candles[candles.length - 1];
      const move = (Math.random() - 0.44) * 1.6;
      last.c = Math.max(1, last.c + move);
      last.h = Math.max(last.h, last.c);
      last.l = Math.min(last.l, last.c);
      vol += Math.round(Math.random() * 140);
      s.ticks++;

      if (s.ticks % TICKS_PER_CANDLE === 0) {
        candles.push({ o: last.c, h: last.c, l: last.c, c: last.c });
        if (candles.length > CAPACITY) {
          candles.shift();
          s.marks.forEach((m) => (m.i -= 1));
          if (s.hover !== null) s.hover = Math.max(0, s.hover - 1);
        }
      }

      setQuote({
        price: last.c,
        change: ((last.c - candles[0].o) / candles[0].o) * 100,
        vol,
      });
      draw();
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const cw = (w - 8 - 62) / CAPACITY;
      const i = Math.floor((e.clientX - rect.left - 8) / cw);
      s.hover = i >= 0 && i < s.candles.length ? i : null;
      setHoverInfo(s.hover !== null ? { ...s.candles[s.hover] } : null);
      draw();
    }
    function onLeave() {
      s.hover = null;
      setHoverInfo(null);
      draw();
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    tick();
    const id = reduced ? undefined : setInterval(() => !document.hidden && tick(), TICK_MS);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      if (id) clearInterval(id);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const up = quote.change >= 0;

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded bg-up/15 px-2 py-0.5 font-mono text-xs font-bold text-up">$MKT</span>
          <span className="font-mono text-xl tabular-nums text-white">{quote.price.toFixed(2)}</span>
          <span className={`font-mono text-sm tabular-nums ${up ? "text-up" : "text-down"}`}>
            {up ? "▲" : "▼"} {Math.abs(quote.change).toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[0.68rem] text-white/45">
          {hoverInfo ? (
            <span className="tabular-nums">
              O {hoverInfo.o.toFixed(1)} H {hoverInfo.h.toFixed(1)} L {hoverInfo.l.toFixed(1)} C {hoverInfo.c.toFixed(1)}
            </span>
          ) : (
            <span className="tabular-nums">VOL {quote.vol.toLocaleString()}</span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-up animate-pulseDot" /> STREAMING
          </span>
        </div>
      </div>
      <div ref={wrapRef} className="relative h-64 sm:h-72">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-crosshair" />
      </div>
      <p className="border-t border-white/[0.06] px-4 py-2 font-mono text-[0.64rem] text-white/35">
        MEEKET CAREER INDEX · simulated tick stream · milestones from resume · hover for OHLC
      </p>
    </div>
  );
}
