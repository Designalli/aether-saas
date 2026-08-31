"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { WebGpuField } from "@/components/webgpu-field";
import { SplineStage } from "@/components/spline-stage";

const modules = [
  { title: "CRM lattice", copy: "Pipeline, notes, and deal gravity.", href: "/dashboard/crm" },
  { title: "Cinematic calendar", copy: "Time as composition.", href: "/dashboard/calendar" },
  { title: "Encrypted vault", copy: "AES-GCM messenger. Ciphertext on the server.", href: "/dashboard/messenger" },
  { title: "Web3 desk", copy: "Wallet session UI for on-chain work.", href: "/dashboard/web3" },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative isolate min-h-[88vh]">
        <WebGpuField />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <SplineStage />
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-20">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.42em] text-cyan-glow/80">
            Emergent format · Spline · Framer · WebGPU
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight text-foam md:text-7xl">
            A cinema for<br />operating software.
          </motion.h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">
            Open-source full-stack SaaS template. Hover the volumes. Run the CRM. Book the calendar. Speak in ciphertext.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-full bg-foam px-6 py-3 text-sm font-medium text-ink">Open command deck</Link>
            <a href="https://github.com/createwithalli/aether-saas" className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80">View source</a>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-28 md:grid-cols-2">
        {modules.map((m, i) => (
          <TiltCard key={m.title}>
            <Link href={m.href} className="glass block min-h-[220px] rounded-3xl p-8 shadow-card">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">0{i + 1}</p>
              <h2 className="mt-6 font-display text-3xl">{m.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">{m.copy}</p>
            </Link>
          </TiltCard>
        ))}
      </section>
    </main>
  );
}
