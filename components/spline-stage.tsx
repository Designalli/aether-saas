"use client";

import Script from "next/script";

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function SplineStage({ scene = SCENE }: { scene?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-cyan-glow/30 via-violet-glow/20 to-transparent blur-2xl orb" />
      </div>
      <div className="relative h-full w-full" dangerouslySetInnerHTML={{ __html: `<spline-viewer url="${scene}" style="width:100%;height:100%;background:transparent;"></spline-viewer>` }} />
    </div>
  );
}
