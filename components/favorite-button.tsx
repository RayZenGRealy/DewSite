"use client";

import { useFavorites } from "./favorites-provider";
import { productById } from "../lib/products";

export function FavoriteButton({ id, className = "" }: { id: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const product = productById(id);
  if (!product) return null;
  const selected = has(id);

  return (
    <button
      type="button"
      className={`favorite-button ${className} ${selected ? "active" : ""}`}
      aria-label={selected
        ? `Убрать ${product.name} из избранного`
        : `Добавить ${product.name} в избранное`}
      aria-pressed={selected}
      onClick={() => toggle(id)}
      title={selected ? "Убрать из избранного" : "В избранное"}
    >
      <span aria-hidden="true">{selected ? "♥" : "♡"}</span>
    </button>
  );
}
