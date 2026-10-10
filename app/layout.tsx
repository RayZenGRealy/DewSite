import type { Metadata } from "next";
import { CartProvider } from "../components/cart-provider";
import { FavoritesProvider } from "../components/favorites-provider";
import "./globals.css";
import "./shop.css";

export const metadata: Metadata = {
  title: "DEW — Jewelry Atelier",
  description: "Авторские украшения из натуральных камней и бисера.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
