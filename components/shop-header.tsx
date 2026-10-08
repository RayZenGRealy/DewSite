"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function ShopHeader() {
  const { count } = useCart();

  return (
    <header className="shop-header">
      <Link href="/" className="shop-logo" aria-label="DEW — главная">
        <span className="shop-logo-monogram">D</span>
        <span>DEW <small>jewelry atelier</small></span>
      </Link>
      <nav aria-label="Основная навигация">
        <Link href="/catalog">Коллекция</Link>
        <Link href="/#stones">Камни</Link>
        <Link href="/#atelier">История</Link>
      </nav>
      <Link href="/cart" className="shop-cart-link">
        Шкатулка <span aria-label={`Товаров: ${count}`}>{count}</span>
      </Link>
    </header>
  );
}
