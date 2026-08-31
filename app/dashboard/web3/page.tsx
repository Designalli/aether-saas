"use client";

import { useMemo, useState } from "react";
import { TiltCard } from "@/components/tilt-card";

function fakeAddress() {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  return "0x" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Web3Page() {
  const [address, setAddress] = useState<string | null>(null);
  const short = useMemo(() => (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : null), [address]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-glow/80">On-chain desk</p>
        <h1 className="mt-2 font-display text-4xl">Web3 session</h1>
      </div>
      <TiltCard>
        <div className="glass rounded-3xl p-8">
          <p className="text-sm text-white/55">Template wallet sheet. Hook to wagmi / viem / WalletConnect in production.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {address ? (
              <>
                <span className="rounded-full border border-cyan-glow/30 px-4 py-2 font-mono text-sm text-cyan-glow">{short}</span>
                <button onClick={() => setAddress(null)} className="rounded-full border border-white/15 px-4 py-2 text-sm">Disconnect</button>
              </>
            ) : (
              <button onClick={() => setAddress(fakeAddress())} className="rounded-full bg-foam px-5 py-2 text-sm text-ink">Connect wallet</button>
            )}
          </div>
        </div>
      </TiltCard>
      <div className="grid gap-4 md:grid-cols-3">
        {[{ k: "Network", v: "Ethereum · demo" }, { k: "Balance", v: address ? "2.184 ETH" : "—" }, { k: "Status", v: address ? "Session live" : "Idle" }].map((row) => (
          <div key={row.k} className="glass rounded-2xl p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{row.k}</p>
            <p className="mt-2 font-display text-xl">{row.v}</p>
          </div>
        ))}
      </div>
      {address && <div className="glass rounded-2xl p-5 font-mono text-xs text-white/50">{address}</div>}
    </div>
  );
}
