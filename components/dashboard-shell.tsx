"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LayoutDashboard, MessageSquareLock, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/crm", label: "CRM", icon: Users },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/messenger", label: "Encrypted vault", icon: MessageSquareLock },
  { href: "/dashboard/web3", label: "Web3 desk", icon: Wallet },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      <aside className="hidden w-60 shrink-0 border-r border-white/5 p-5 md:block">
        <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-white/35">Command deck</p>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = path === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white", active && "bg-white/8 text-white shadow-glow")}>
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="flex-1 p-5 md:p-8">{children}</section>
    </div>
  );
}
