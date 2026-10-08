"use client";

import { useState } from "react";
import Link from "next/link";
import { type Product } from "../lib/products";
import { useCart } from "./cart-provider";

export function ProductBuy({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function onAdd() {
    add(product.id, size, quantity);
    setAdded(true);
  }

  return (
    <div className="buy-box">
      <div className="buy-label"><span>Размер / вариант</span><span>01</span></div>
      <div className="size-options" role="group" aria-label="Выберите размер">
        {product.sizes.map((option) => (
          <button key={option} type="button" className={size === option ? "selected" : ""}
            aria-pressed={size === option} onClick={() => { setSize(option); setAdded(false); }}>{option}</button>
        ))}
      </div>
      <div className="buy-line">
        <div className="quantity-input" aria-label="Количество">
          <button type="button" aria-label="Уменьшить количество" disabled={quantity <= 1} onClick={() => setQuantity((n) => Math.max(1, n - 1))}>−</button>
          <output aria-label={`Количество: ${quantity}`}>{quantity}</output>
          <button type="button" aria-label="Увеличить количество" disabled={quantity >= 20} onClick={() => setQuantity((n) => Math.min(20, n + 1))}>+</button>
        </div>
        <button type="button" className="shop-button" onClick={onAdd}>Добавить в шкатулку <span>↗</span></button>
      </div>
      {added && <p className="buy-feedback" role="status">Добавлено в корзину. <Link href="/cart">Перейти в шкатулку →</Link></p>}
    </div>
  );
}
