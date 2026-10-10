"use client";

import Link from "next/link";
import { products } from "../lib/products";
import { useFavorites } from "./favorites-provider";
import { ProductCard } from "./product-card";

export function FavoritesView() {
  const { favorites, count } = useFavorites();
  const selected = products.filter((product) => favorites.includes(product.id));

  return (
    <main className="catalog-main favorites-main">
      <div className="catalog-intro">
        <p className="eyebrow">DEW / ваша коллекция</p>
        <div className="catalog-title-row">
          <h1>Особенные<br /><em>находки.</em></h1>
          <p>Украшения, к которым хочется возвращаться. Соберите свою маленькую шкатулку вдохновения.</p>
        </div>
        <div className="catalog-deco" aria-hidden="true">♡</div>
      </div>

      <div className="favorites-topline">
        <span>Сохранено: {count}</span>
        <Link href="/catalog">Исследовать все украшения <span aria-hidden="true">↗</span></Link>
      </div>

      {selected.length ? (
        <div className="catalog-grid">
          {selected.map((product, index) => (
            <ProductCard product={product} index={index} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <div className="favorites-empty-gem" aria-hidden="true">◇</div>
          <h2>Здесь появятся ваши любимые украшения.</h2>
          <p>Нажимайте на сердечко возле изделий — они сохранятся на этом устройстве.</p>
          <Link className="shop-button" href="/catalog">Открыть коллекцию <span aria-hidden="true">↗</span></Link>
        </div>
      )}
      <p className="art-disclaimer">Избранное хранится в браузере этого устройства. Фотографии изделий пока заменены декоративными иллюстрациями.</p>
    </main>
  );
}
