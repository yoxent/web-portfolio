import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: `${profile.shortName} | ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: profile.shortName,
    description: profile.title,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="portfolio-theme";var s=localStorage.getItem(k);var p=s==="dark"?"dark-brass":(s==="light"||s==="dark-brass"||s==="dark-ink"||s==="system"?s:"system");var dark=p==="dark-brass"||p==="dark-ink"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var theme=p==="system"?(dark?"dark-brass":"light"):p;var t={light:{ink:"#141414",paper:"#f3f4f6",muted:"#5c5f66",accent:"#0f6b5c",accentFg:"#f7fffc",hairline:"color-mix(in oklab, var(--ink) 12%, transparent)",bgGlow:"radial-gradient(1200px 600px at 10% -10%, #d9e4ef 0%, transparent 55%), radial-gradient(900px 500px at 90% 0%, #ddeae4 0%, transparent 50%), var(--paper)",selection:"color-mix(in oklab, var(--accent) 35%, white)"},"dark-brass":{ink:"#f0ebe3",paper:"#141210",muted:"#a39e94",accent:"#d4a843",accentFg:"#1a1508",hairline:"color-mix(in oklab, var(--ink) 14%, transparent)",bgGlow:"radial-gradient(1100px 560px at 8% -12%, #2a2318 0%, transparent 55%), radial-gradient(900px 500px at 92% 4%, #1f1a14 0%, transparent 50%), var(--paper)",selection:"color-mix(in oklab, var(--accent) 45%, black)"},"dark-ink":{ink:"#e8edf4",paper:"#0b0e14",muted:"#8f97a6",accent:"#7aa2d4",accentFg:"#0a1018",hairline:"color-mix(in oklab, var(--ink) 15%, transparent)",bgGlow:"radial-gradient(1100px 560px at 10% -10%, #152033 0%, transparent 55%), radial-gradient(900px 500px at 90% 0%, #121820 0%, transparent 50%), var(--paper)",selection:"color-mix(in oklab, var(--accent) 40%, black)"}}[theme];var r=document.documentElement;r.dataset.theme=theme;r.dataset.themePreference=p;r.style.colorScheme=theme==="light"?"light":"dark";r.style.setProperty("--ink",t.ink);r.style.setProperty("--paper",t.paper);r.style.setProperty("--muted",t.muted);r.style.setProperty("--accent",t.accent);r.style.setProperty("--accent-fg",t.accentFg);r.style.setProperty("--hairline",t.hairline);r.style.setProperty("--bg-glow",t.bgGlow);r.style.setProperty("--selection",t.selection);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
