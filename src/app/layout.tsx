import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "One Step to Good | The Intellectual Operating System",
  description: "Watch how we control the narrative. Publications, software, music, film, and more — unified under one vision.",
  keywords: ["Omar Al-Sudani", "One Step to Good", "publications", "intellectual", "creative"],
  authors: [{ name: "Omar Al-Sudani" }],
  openGraph: {
    title: "One Step to Good | The Intellectual Operating System",
    description: "Watch how we control the narrative.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${dmSans.variable} antialiased bg-[#0d0d0d] text-[#f5f2ed]`}
      >
        {children}
      </body>
    </html>
  );
}