import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Summer Camp 2026",
  description: "Learning RPG for Addie and Dean",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="space">
      <body className="min-h-screen text-camp-ink antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
