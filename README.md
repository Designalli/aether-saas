# AETHER

Cinematic full-stack SaaS template.

Dark film grain. 3D hover volumes. Spline stage (WebGPU viewer). Framer Motion. Working backend.

https://github.com/createwithalli/aether-saas

## Surfaces

- `/` cinematic landing
- `/dashboard` command deck
- `/dashboard/crm` contact pipeline CRUD
- `/dashboard/calendar` month grid
- `/dashboard/messenger` AES-GCM vault
- `/dashboard/web3` wallet session UI

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

API data lives in `data/store.json` (created on first request). Optional Prisma schema is in `prisma/schema.prisma`.

## Motion

- `components/tilt-card.tsx` — 3D hover
- `components/spline-stage.tsx` — Spline viewer (WebGPU when available)
- `components/webgpu-field.tsx` — particle atmosphere + WebGPU probe

## Production checklist

Replace the demo AES key. Add auth. Move JSON store to Postgres. Wire wagmi for the wallet sheet.

MIT license.
