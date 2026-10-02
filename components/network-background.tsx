"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };
type Packet = { a: number; b: number; t: number; speed: number; up: boolean };

/**
 * Full-screen canvas: a drifting node graph (a "market network") whose edges
 * light up near the cursor and carry green/red data packets between nodes.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    const LINK = 150;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
      packets = [];
    }

    function spawnPacket() {
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (d < LINK && d < bestD && Math.random() > 0.3) {
          best = i;
          bestD = d;
        }
      }
      if (best >= 0) {
        packets.push({ a, b: best, t: 0, speed: 0.01 + Math.random() * 0.02, up: Math.random() > 0.35 });
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // gentle pull toward cursor
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dm = Math.hypot(dx, dy);
        if (dm < 200) {
          n.x += dx * 0.002;
          n.y += dy * 0.002;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const near = Math.max(0, 1 - Math.hypot(mouse.x - mx, mouse.y - my) / 260);
            const alpha = (1 - d / LINK) * (0.08 + near * 0.35);
            ctx!.strokeStyle = near > 0.05 ? `rgba(0,227,150,${alpha})` : `rgba(120,160,200,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = "rgba(160,190,220,0.45)";
        ctx!.fillRect(n.x - 1, n.y - 1, 2, 2);
      }

      if (Math.random() < 0.12 && packets.length < 40) spawnPacket();
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx!.fillStyle = p.up ? "rgba(0,227,150,0.9)" : "rgba(255,77,109,0.9)";
        ctx!.shadowColor = ctx!.fillStyle;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    if (reduced) {
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
    />
  );
}
