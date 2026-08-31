"use client";

import { useEffect, useRef } from "react";

export function WebGpuField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const particles = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), s: 0.2 + Math.random() * 1.4 }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.y -= 0.00025 * p.s;
        p.x += Math.sin(t * 0.0002 + i) * 0.00015;
        if (p.y < -0.02) p.y = 1.02;
        const x = p.x * w;
        const y = p.y * h;
        const r = p.s * (1.2 + p.z * 1.8);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        const tone = i % 3 === 0 ? "126,240,224" : i % 3 === 1 ? "180,156,255" : "232,237,247";
        g.addColorStop(0, `rgba(${tone},${0.55 + p.z * 0.3})`);
        g.addColorStop(1, `rgba(${tone},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const gpu = (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
    if (gpu) gpu.requestAdapter().then(() => { canvas.dataset.renderer = "webgpu-capable"; }).catch(() => { canvas.dataset.renderer = "canvas2d"; });
    else canvas.dataset.renderer = "canvas2d";
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
