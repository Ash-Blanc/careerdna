import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CareerDNA — Taste-Aware AI Career Coach for Students",
  description:
    "Convert your cultural passions (gaming, anime, football, music, creators, fashion) into high-leverage careers, signature portfolio projects, and a 30/60/90-day action plan with Qloo & Tambo Generative UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
