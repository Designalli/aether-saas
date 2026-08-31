"use client";

import { FormEvent, useEffect, useState } from "react";
import { TiltCard } from "@/components/tilt-card";
import type { Contact } from "@/lib/types";

const stages: Contact["stage"][] = ["lead", "qualified", "negotiation", "won", "lost"];

export default function CrmPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);

  async function load() {
    const res = await fetch("/api/contacts");
    setContacts(await res.json());
  }
  useEffect(() => { void load(); }, []);

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        company: form.get("company"),
        stage: form.get("stage"),
        value: Number(form.get("value") || 0),
        notes: form.get("notes"),
      }),
    });
    setOpen(false);
    e.currentTarget.reset();
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-glow/80">Relationships</p>
          <h1 className="mt-2 font-display text-4xl">CRM lattice</h1>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-foam px-4 py-2 text-sm text-ink">{open ? "Close" : "New contact"}</button>
      </div>
      {open && (
        <form onSubmit={onCreate} className="glass grid gap-3 rounded-2xl p-5 md:grid-cols-3">
          <input name="name" required placeholder="Name" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <input name="email" placeholder="Email" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <input name="company" placeholder="Company" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <select name="stage" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" defaultValue="lead">{stages.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          <input name="value" type="number" placeholder="Value" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <input name="notes" placeholder="Notes" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <button className="rounded-xl bg-white/10 px-4 py-2 text-sm md:col-span-3">Save contact</button>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {contacts.map((c) => (
          <TiltCard key={c.id} intensity={7}>
            <article className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-xl">{c.name}</h2>
                  <p className="text-sm text-white/50">{c.company} · {c.email}</p>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-glow">{c.stage}</span>
              </div>
              <p className="mt-4 text-2xl">${c.value.toLocaleString()}</p>
              <p className="mt-2 text-sm text-white/50">{c.notes}</p>
              <button onClick={() => remove(c.id)} className="mt-4 text-xs uppercase tracking-[0.16em] text-white/35">Archive</button>
            </article>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
