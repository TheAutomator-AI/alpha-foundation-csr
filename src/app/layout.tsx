import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/experience/CustomCursor";
import { ScrollProgress } from "@/components/experience/ScrollProgress";
import { NoiseOverlay } from "@/components/experience/NoiseOverlay";
import { SmoothScroll } from "@/components/experience/SmoothScroll";
import { FloatingNav } from "@/components/navigation/FloatingNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Foundation | CSR & Social Impact",
  description:
    "Transform CSR partnerships into sustainable social impact across education, healthcare, environmental restoration, disaster relief, women empowerment, and community development in South India.",
  keywords: [
    "CSR India",
    "Corporate Social Responsibility",
    "Alpha Foundation",
    "CSR Partnership",
    "Social Impact",
    "Education",
    "Healthcare",
    "Environment",
    "Community Development",
    "South India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased selection:bg-cyan-400 selection:text-black">
        <SmoothScroll />
        <CursorProvider>
          <NoiseOverlay />
          <ScrollProgress />
          <FloatingNav />
          <main className="relative z-10">{children}</main>
        </CursorProvider>
      </body>
    </html>
  );
}
