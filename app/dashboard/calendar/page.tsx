"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { CalendarEvent } from "@/lib/types";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [cursor, setCursor] = useState(() => new Date(2026, 7, 1));

  async function load() {
    const res = await fetch("/api/events");
    setEvents(await res.json());
  }
  useEffect(() => { void load(); }, []);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    return [...Array.from({ length: first }, () => null), ...Array.from({ length: count }, (_, i) => i + 1)] as (number | null)[];
  }, [cursor]);

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.get("title"), date: form.get("date"), time: form.get("time"), type: "meeting", with: form.get("with") }),
    });
    e.currentTarget.reset();
    await load();
  }

  function isoFor(day: number) {
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${cursor.getFullYear()}-${m}-${d}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-glow/80">Time</p>
          <h1 className="mt-2 font-display text-4xl">{cursor.toLocaleString("en-US", { month: "long", year: "numeric" })}</h1>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-white/10 px-3 py-1 text-sm" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>Prev</button>
          <button className="rounded-full border border-white/10 px-3 py-1 text-sm" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>Next</button>
        </div>
      </div>
      <form onSubmit={onCreate} className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-5">
        <input name="title" required placeholder="Title" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        <input name="date" type="date" required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        <input name="time" type="time" required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        <input name="with" placeholder="With" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        <button className="rounded-xl bg-white/10 px-4 py-2 text-sm">Add block</button>
      </form>
      <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.16em] text-white/35">{"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d) => <div key={d}>{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const date = day ? isoFor(day) : "";
          const dayEvents = events.filter((e) => e.date === date);
          return (
            <div key={i} className="glass min-h-[110px] rounded-xl p-2 text-left">
              <div className="text-xs text-white/40">{day || ""}</div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((e) => (
                  <div key={e.id} className="rounded-md bg-cyan-glow/10 px-1.5 py-1 text-[11px] text-cyan-glow">{e.time} {e.title}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
