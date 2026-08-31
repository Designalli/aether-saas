"use client";

import { TiltCard } from "@/components/tilt-card";
import Link from "next/link";

const tiles = [
  { k: "Pipeline", v: "$286k", s: "4 active deals" },
  { k: "This week", v: "4", s: "scheduled blocks" },
  { k: "Vault", v: "AES-GCM", s: "session keys live" },
  { k: "Chain", v: "Disconnected", s: "wallet desk ready" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-glow/80">Overview</p>
        <h1 className="mt-2 font-display text-4xl">Command deck</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {tiles.map((t) => (
          <TiltCard key={t.k} intensity={8}>
            <div className="glass rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{t.k}</p>
              <p className="mt-3 font-display text-2xl">{t.v}</p>
              <p className="mt-1 text-xs text-white/45">{t.s}</p>
            </div>
          </TiltCard>
        ))}
      </div>
      <div className="glass rounded-3xl p-8">
        <h2 className="font-display text-2xl">What this template is</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          Working front + back end. JSON store, REST routes, 3D hover, Spline stage, WebGPU-capable field.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/dashboard/crm" className="rounded-full bg-white/10 px-4 py-2">Manage contacts</Link>
          <Link href="/dashboard/messenger" className="rounded-full bg-white/10 px-4 py-2">Open vault</Link>
        </div>
      </div>
    </div>
  );
}
