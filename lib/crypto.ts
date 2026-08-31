const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toB64(buf: ArrayBuffer | Uint8Array) {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  bytes.forEach((b) => { s += String.fromCharCode(b); });
  return btoa(s);
}

function fromB64(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function getKey() {
  const raw = encoder.encode("aether-demo-key-please-replace!!");
  const hash = await crypto.subtle.digest("SHA-256", raw);
  return crypto.subtle.importKey("raw", hash, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function encryptText(plain: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(plain));
  return { ciphertext: toB64(cipher), iv: toB64(iv) };
}

export async function decryptText(ciphertext: string, iv: string) {
  if (iv === "init") return "[seed message — encrypt new ones to decrypt live]";
  const key = await getKey();
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(iv) }, key, fromB64(ciphertext));
  return decoder.decode(plain);
}
