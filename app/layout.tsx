import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xiaro | Workforce Communications Platform",
  description:
    "Xiaro routes voice calls, WhatsApp messages and SMS requests to the right supervisor, manager or team based on rosters, shifts and escalation rules."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
