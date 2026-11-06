import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin", "latin-ext"], weight: ["400", "600", "700"], display: "swap" });
const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin", "latin-ext"], weight: ["400"], display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a1730" };

export const metadata: Metadata = {
  title: { default: "Institutul „Victor Babeș” București", template: "%s | Institutul „Victor Babeș”" },
  description:
    "Institutul Național de Cercetare-Dezvoltare în Domeniul Patologiei și Științelor Biomedicale „Victor Babeș”, București.",
  robots: { index: false, follow: false }, // concept stage: keep previews out of search engines
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
