"use client";

import { FormEvent, useEffect, useState } from "react";
import { decryptText, encryptText } from "@/lib/crypto";
import type { Message, Thread } from "@/lib/types";

export default function MessengerPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [active, setActive] = useState("t_ops");
  const [draft, setDraft] = useState("");
  const [unlocked, setUnlocked] = useState<Record<string, string>>({});

  async function load(threadId = active) {
    const res = await fetch(`/api/messages?threadId=${threadId}`);
    const json = await res.json();
    setThreads(json.threads);
    setMessages(json.messages);
  }
  useEffect(() => { void load(active); }, [active]);

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    const envelope = await encryptText(draft.trim());
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: active, from: "You", ciphertext: envelope.ciphertext, iv: envelope.iv, plaintextPreview: draft.trim() }),
    });
    setDraft("");
    await load(active);
  }

  async function unlock(m: Message) {
    setUnlocked((prev) => ({ ...prev, [m.id]: await decryptText(m.ciphertext, m.iv) }));
  }

  return (
    <div className="grid min-h-[70vh] overflow-hidden rounded-3xl border border-white/8 md:grid-cols-[240px_1fr]">
      <aside className="border-r border-white/8 p-4">
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/40">Encrypted rooms</p>
        {threads.map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)} className={`mb-1 w-full rounded-xl px-3 py-3 text-left ${active === t.id ? "bg-white/8" : "hover:bg-white/4"}`}>
            <div className="text-sm">{t.name}</div>
            <div className="truncate text-[11px] text-white/40">{t.last}</div>
          </button>
        ))}
      </aside>
      <section className="flex flex-col">
        <header className="border-b border-white/8 px-5 py-4 text-sm text-white/60">AES-GCM vault · ciphertext persisted · decrypt locally</header>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-md rounded-2xl px-4 py-3 text-sm ${m.from === "You" ? "ml-auto bg-cyan-glow/10" : "bg-white/6"}`}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{m.from}</p>
              <p className="mt-1 break-all font-mono text-[11px] text-white/55">{m.ciphertext.slice(0, 72)}</p>
              <p className="mt-2 text-white/85">{unlocked[m.id] || m.plaintextPreview || "Locked"}</p>
              <button onClick={() => unlock(m)} className="mt-2 text-[10px] uppercase tracking-[0.16em] text-cyan-glow">Decrypt</button>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-white/8 p-4">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write in cleartext — stored as ciphertext" className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none" />
          <button className="rounded-xl bg-foam px-4 py-2 text-sm text-ink">Seal</button>
        </form>
      </section>
    </div>
  );
}
