import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.shortName} — ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: profile.shortName,
    description: profile.title,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
