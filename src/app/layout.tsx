import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageLayout from "@shared/layout/PageLayout";
import SmoothScroll from "@shared/components/SmoothScroll";
import CustomCursor from "@shared/components/CustomCursor";
import Preloader from "@shared/components/Preloader";
import FilmGrain from "@shared/components/FilmGrain";
import GridBackground from "@shared/components/GridBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Abbas Ali Dalal - Creative Developer & Design Engineer",
  description: "Award-winning developer crafting immersive digital experiences with Next.js, Three.js, and creative code.",
  keywords: ["Creative Developer", "Design Engineer", "WebGL", "Next.js", "Framer Motion", "Three.js"],
  authors: [{ name: "Abbas Ali Dalal" }],
  openGraph: {
    title: "Abbas Ali Dalal - Creative Developer",
    description: "Award-winning developer crafting immersive digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          // CSS Variables for theme colors
          '--color-primary': '14 165 233',
          '--color-secondary': '139 92 246',
          '--color-accent': '236 72 153',
          '--color-background': '9 9 11',
        } as React.CSSProperties}
      >
        <SmoothScroll>
          <CustomCursor />
          <Preloader />
          <FilmGrain />
          <GridBackground />
          <PageLayout>
            {children}
          </PageLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
