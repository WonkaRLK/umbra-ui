import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umbra UI — Dark Luxury Components",
  description:
    "A React component library built on shadcn/ui with a distinctive Dark Luxury visual theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
