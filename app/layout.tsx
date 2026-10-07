import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEW — Jewelry Atelier",
  description: "Авторские украшения из натуральных камней и бисера.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
