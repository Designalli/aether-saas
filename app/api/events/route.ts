import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/types";

export async function GET() {
  const store = await readStore();
  return NextResponse.json(store.events);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<CalendarEvent>;
  const store = await readStore();
  const event: CalendarEvent = {
    id: uid("e"),
    title: body.title || "Untitled",
    date: body.date || new Date().toISOString().slice(0, 10),
    time: body.time || "09:00",
    type: body.type || "meeting",
    with: body.with,
  };
  store.events.push(event);
  await writeStore(store);
  return NextResponse.json(event, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const store = await readStore();
  store.events = store.events.filter((e) => e.id !== id);
  await writeStore(store);
  return NextResponse.json({ ok: true });
}
