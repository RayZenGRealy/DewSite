"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { useFavorites } from "./favorites-provider";

export function ShopHeader() {
  const { count } = useCart();
  const { count: favoritesCount } = useFavorites();

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
      <div className="shop-header-actions">
        <Link href="/favorites" className="shop-favorite-link"
          aria-label={`Избранное: ${favoritesCount} изделий`}>
          <span aria-hidden="true">♡</span><span className="shop-favorite-count">{favoritesCount}</span>
        </Link>
        <Link href="/cart" className="shop-cart-link">
          Шкатулка <span aria-label={`Товаров: ${count}`}>{count}</span>
        </Link>
      </div>
    </header>
  );
}
