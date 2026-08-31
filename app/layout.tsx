import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const geist = Inter({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "AETHER — Cinematic SaaS OS",
  description: "Open-source cinematic SaaS template: 3D hover, Spline, Framer Motion, WebGPU field, CRM, calendar, encrypted messenger, Web3 desk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${geist.variable} font-body letterbox antialiased`}>
        <div className="film-grain" />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
