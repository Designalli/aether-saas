"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Overture" },
  { href: "/dashboard", label: "Command" },
  { href: "/dashboard/crm", label: "CRM" },
  { href: "/dashboard/calendar", label: "Calendar" },
  { href: "/dashboard/messenger", label: "Vault" },
  { href: "/dashboard/web3", label: "Web3" },
];

export function SiteNav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#05060a]/70 px-6 py-4 backdrop-blur-xl">
      <Link href="/" className="font-display text-lg tracking-[0.22em]">AETHER</Link>
      <nav className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.22em] text-white/55 md:flex">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={cn("transition hover:text-white", path === l.href && "text-cyan-glow")}>
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href="/dashboard" className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80">Enter system</Link>
    </header>
  );
}
