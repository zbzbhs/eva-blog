// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { TerminalShell } from "@/components/terminal/shell";

export const metadata: Metadata = {
  title: "NERV DIGITAL ARCHIVE",
  description: "MAGI SYSTEM v3.0 — Evangelion Digital Archive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <TerminalShell>{children}</TerminalShell>
      </body>
    </html>
  );
}
