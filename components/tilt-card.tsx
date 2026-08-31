"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, intensity = 14 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 180, damping: 18 });
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(126,240,224,0.28), transparent 42%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 900 }} className={cn("relative will-change-transform", className)}>
      <div style={{ transform: "translateZ(28px)" }}>{children}</div>
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 mix-blend-screen" style={{ background: glare }} />
    </motion.div>
  );
}
