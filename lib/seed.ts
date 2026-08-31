import type { Store } from "./types";

export const seed: Store = {
  contacts: [
    { id: "c_aurora", name: "Aurora Chen", email: "aurora@lumen.studio", company: "Lumen Studio", stage: "negotiation", value: 48000, notes: "Cinematic product site + CRM handoff.", createdAt: "2026-08-12T14:00:00.000Z" },
    { id: "c_niko", name: "Niko Alvarez", email: "niko@orbitchain.io", company: "Orbitchain", stage: "qualified", value: 125000, notes: "Web3 wallet UX + encrypted comms.", createdAt: "2026-08-18T09:30:00.000Z" },
    { id: "c_mira", name: "Mira Sol", email: "mira@emergent.media", company: "Emergent Media", stage: "lead", value: 22000, notes: "Framer + Spline hybrid landing.", createdAt: "2026-08-24T16:12:00.000Z" },
    { id: "c_julian", name: "Julian Park", email: "jp@northline.co", company: "Northline", stage: "won", value: 91000, notes: "Closed. Onboarding calendar + messenger.", createdAt: "2026-07-02T11:00:00.000Z" }
  ],
  events: [
    { id: "e1", title: "Orbitchain product review", date: "2026-08-31", time: "11:00", type: "meeting", with: "Niko Alvarez" },
    { id: "e2", title: "Design critique — AETHER v2", date: "2026-09-02", time: "15:30", type: "focus" },
    { id: "e3", title: "Lumen Studio kickoff", date: "2026-09-04", time: "09:00", type: "call", with: "Aurora Chen" },
    { id: "e4", title: "Public template launch", date: "2026-09-08", time: "18:00", type: "launch" }
  ],
  threads: [
    { id: "t_ops", name: "AETHER Ops", last: "Vault rotated. New session keys live.", encrypted: true },
    { id: "t_orbit", name: "Orbitchain", last: "Can we ship the wallet sheet Friday?", encrypted: true },
    { id: "t_lumen", name: "Lumen Studio", last: "Loved the hover field. More grain.", encrypted: true }
  ],
  messages: [
    { id: "m1", threadId: "t_ops", from: "You", ciphertext: "c2VlZC1tZXNzYWdl", iv: "init", createdAt: "2026-08-30T18:04:00.000Z", plaintextPreview: "Vault rotated. New session keys live." },
    { id: "m2", threadId: "t_orbit", from: "Niko", ciphertext: "c2VlZC1tZXNzYWdl", iv: "init", createdAt: "2026-08-30T19:22:00.000Z", plaintextPreview: "Can we ship the wallet sheet Friday?" }
  ]
};
