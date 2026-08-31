import { promises as fs } from "fs";
import path from "path";
import { seed } from "./seed";
import type { Store } from "./types";

const file = path.join(process.cwd(), "data", "store.json");

async function ensure() {
  await fs.mkdir(path.dirname(file), { recursive: true });
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readStore(): Promise<Store> {
  await ensure();
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Store;
}

export async function writeStore(next: Store) {
  await ensure();
  await fs.writeFile(file, JSON.stringify(next, null, 2), "utf8");
}
