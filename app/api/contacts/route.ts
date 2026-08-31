import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { Contact } from "@/lib/types";

export async function GET() {
  const store = await readStore();
  return NextResponse.json(store.contacts);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Contact>;
  const store = await readStore();
  const contact: Contact = {
    id: uid("c"),
    name: body.name || "Untitled",
    email: body.email || "",
    company: body.company || "",
    stage: body.stage || "lead",
    value: Number(body.value || 0),
    notes: body.notes || "",
    createdAt: new Date().toISOString(),
  };
  store.contacts.unshift(contact);
  await writeStore(store);
  return NextResponse.json(contact, { status: 201 });
}

export async function PATCH(req: Request) {
  const body = (await req.json()) as Partial<Contact> & { id: string };
  const store = await readStore();
  store.contacts = store.contacts.map((c) => (c.id === body.id ? { ...c, ...body } : c));
  await writeStore(store);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const store = await readStore();
  store.contacts = store.contacts.filter((c) => c.id !== id);
  await writeStore(store);
  return NextResponse.json({ ok: true });
}
