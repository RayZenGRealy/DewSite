"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { JewelryArtwork } from "./jewelry-artwork";
import { formatPrice, productById } from "../lib/products";

export function CartView() {
  const { items, total, changeQuantity, remove } = useCart();

  return (
    <main className="cart-main">
      <div className="cart-hero">
        <p className="eyebrow">ваша подборка / dew</p>
        <h1>Личная <em>шкатулка.</em></h1>
        <p>Все украшения, которые вы выбрали, в одном месте.</p>
      </div>
      {!items.length ? (
        <div className="cart-empty">
          <span className="cart-empty-icon" aria-hidden="true">◇</span>
          <h2>Шкатулка пока пуста.</h2>
          <p>Начните свою коллекцию с украшения, которое откликается именно вам.</p>
          <Link href="/catalog" className="shop-button">Посмотреть коллекцию <span>↗</span></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {items.map((item) => {
              const product = productById(item.id);
              if (!product) return null;
              return (
                <article className="cart-item" key={`${item.id}:${item.size}`}>
                  <Link href={`/product/${product.id}`} className="cart-thumb">
                    <JewelryArtwork art={product.art} accent={product.accent} small />
                  </Link>
                  <div className="cart-item-info">
                    <Link href={`/product/${product.id}`}><h2>{product.name}</h2></Link>
                    <p>{product.stone} · {item.size}</p>
                    <strong>{formatPrice(product.price * item.quantity)}</strong>
                    <button className="remove-item" type="button" onClick={() => remove(item.id, item.size)}>Убрать</button>
                  </div>
                  <div className="quantity-input">
                    <button type="button" disabled={item.quantity <= 1} aria-label={`Уменьшить количество ${product.name}`}
                      onClick={() => changeQuantity(item.id, item.size, item.quantity - 1)}>−</button>
                    <output aria-label={`Количество: ${item.quantity}`}>{item.quantity}</output>
                    <button type="button" disabled={item.quantity >= 20} aria-label={`Увеличить количество ${product.name}`}
                      onClick={() => changeQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                  </div>
                </article>
              );
            })}
            <Link href="/catalog" className="back-collection">← Вернуться к коллекции</Link>
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">итого</p>
            <div className="summary-row"><span>Украшения</span><strong>{formatPrice(total)}</strong></div>
            <div className="summary-row"><span>Доставка</span><span>Уточняется при заказе</span></div>
            <div className="summary-total"><span>Сумма изделий</span><strong>{formatPrice(total)}</strong></div>
            <Link href="/checkout" className="shop-button">Перейти к оформлению <span>↗</span></Link>
            <p className="summary-note">Пока это демонстрация магазина. Онлайн-оплата и отправка заказа ещё не подключены.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
