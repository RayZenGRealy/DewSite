"use client";

import { useMemo, useState } from "react";
import { categories, products, type Category } from "../lib/products";
import { ProductCard } from "./product-card";

type SortOrder = "featured" | "price-asc" | "price-desc";
const stones = Array.from(new Set(products.map((product) => product.stone)));

export function CatalogClient() {
  const [category, setCategory] = useState<Category | "Все">("Все");
  const [search, setSearch] = useState("");
  const [stone, setStone] = useState("Все камни");
  const [order, setOrder] = useState<SortOrder>("featured");

  const matching = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("ru");
    const selected = products.filter((product) => {
      const categoryMatch = category === "Все" || product.category === category;
      const stoneMatch = stone === "Все камни" || product.stone === stone;
      const searchMatch = !query || [product.name, product.stone, product.category, product.material]
        .join(" ").toLocaleLowerCase("ru").includes(query);
      return categoryMatch && stoneMatch && searchMatch;
    });

    if (order === "price-asc") selected.sort((a, b) => a.price - b.price);
    if (order === "price-desc") selected.sort((a, b) => b.price - a.price);
    return selected;
  }, [category, search, stone, order]);

  function reset() {
    setSearch("");
    setCategory("Все");
    setStone("Все камни");
    setOrder("featured");
  }

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
              key={item} type="button"
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

      <div className="catalog-refine">
        <label>Минерал
          <select value={stone} onChange={(event) => setStone(event.target.value)}>
            <option value="Все камни">Все камни</option>
            {stones.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <label>Порядок
          <select value={order} onChange={(event) => setOrder(event.target.value as SortOrder)}>
            <option value="featured">Авторская подборка</option>
            <option value="price-asc">Цена: сначала дешевле</option>
            <option value="price-desc">Цена: сначала дороже</option>
          </select>
        </label>
        <button type="button" className="catalog-reset" onClick={reset}>Сбросить фильтры ↺</button>
      </div>

      <div className="catalog-result" aria-live="polite">
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
          <button type="button" className="shop-button secondary" onClick={reset}>
            Показать всю коллекцию
          </button>
        </div>
      )}
      <p className="art-disclaimer">На этом этапе изображения украшений — стилизованные иллюстрации. Фотографии и наличие товаров будут добавлены позже.</p>
    </main>
  );
}
