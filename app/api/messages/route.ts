import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { Message } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get("threadId");
  const store = await readStore();
  const messages = threadId ? store.messages.filter((m) => m.threadId === threadId) : store.messages;
  return NextResponse.json({ threads: store.threads, messages });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { threadId: string; from: string; ciphertext: string; iv: string; plaintextPreview?: string };
  const store = await readStore();
  const message: Message = {
    id: uid("m"),
    threadId: body.threadId,
    from: body.from || "You",
    ciphertext: body.ciphertext,
    iv: body.iv,
    createdAt: new Date().toISOString(),
    plaintextPreview: body.plaintextPreview,
  };
  store.messages.push(message);
  store.threads = store.threads.map((t) => t.id === body.threadId ? { ...t, last: body.plaintextPreview || "Encrypted payload" } : t);
  await writeStore(store);
  return NextResponse.json(message, { status: 201 });
}
