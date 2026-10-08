"use client";

import { useMemo, useState } from "react";
import { categories, products, type Category } from "../lib/products";
import { ProductCard } from "./product-card";

export function CatalogClient() {
  const [category, setCategory] = useState<Category | "Все">("Все");
  const [search, setSearch] = useState("");
  const matching = useMemo(() =>
    products.filter((product) => {
      const categoryMatch = category === "Все" || product.category === category;
      const query = search.trim().toLocaleLowerCase("ru");
      const searchMatch = !query ||
        [product.name, product.stone, product.category, product.material]
          .join(" ").toLocaleLowerCase("ru").includes(query);
      return categoryMatch && searchMatch;
    }), [category, search]);

  return (
    <main className="catalog-main">
      <div className="catalog-intro">
        <p className="eyebrow">коллекция / 001</p>
        <div className="catalog-title-row">
          <h1>Искусство<br /><em>быть собой.</em></h1>
          <p>Тёплая ручная работа. Характер натуральных камней. Украшения, которые хочется рассматривать.</p>
        </div>
        <div className="catalog-deco" aria-hidden="true">✳</div>
      </div>

      <div className="catalog-controls">
        <div className="catalog-tabs" role="group" aria-label="Категории украшений">
          {(["Все", ...categories] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >{item}</button>
          ))}
        </div>
        <label className="catalog-search">
          <span className="sr-only">Поиск украшений</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)}
            type="search" placeholder="Найти украшение или камень..." />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>

      <div className="catalog-result">
        <span>Предметов в коллекции: {matching.length}</span>
        <span>Ручная работа · натуральные материалы</span>
      </div>

      {matching.length ? (
        <div className="catalog-grid">
          {matching.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      ) : (
        <div className="catalog-empty">
          <h2>Ничего не найдено.</h2>
          <p>Попробуйте другой материал или категорию.</p>
          <button type="button" className="shop-button secondary" onClick={() => { setSearch(""); setCategory("Все"); }}>
            Показать всю коллекцию
          </button>
        </div>
      )}
      <p className="art-disclaimer">На этом этапе изображения украшений — стилизованные иллюстрации. Фотографии и наличие товаров будут добавлены позже.</p>
    </main>
  );
}
