import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display"
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xiaro.com.au"),
  title: {
    default: "Xiaro — One number for your whole fleet",
    template: "%s | Xiaro"
  },
  description:
    "Drivers message one company number on WhatsApp or SMS. Xiaro routes it to the on-shift supervisor, escalates until someone answers, and logs everything in a tamper-evident audit trail.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://xiaro.com.au",
    siteName: "Xiaro",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Xiaro — roster-routed messaging for transport teams"
      }
    ]
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
