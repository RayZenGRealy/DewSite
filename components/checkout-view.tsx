"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { formatPrice, productById } from "../lib/products";

export function CheckoutView() {
  const { items, total } = useCart();
  const [reviewed, setReviewed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewed(true);
  }

  return (
    <main className="checkout-main">
      <div className="checkout-heading">
        <p className="eyebrow">заказ / демонстрация</p>
        <h1>Завершение <em>истории.</em></h1>
        <p>Введите данные для предварительной проверки формы. Они никуда не отправляются и не сохраняются на сервере.</p>
      </div>
      {!items.length ? (
        <div className="cart-empty"><h2>Шкатулка пуста</h2><Link href="/catalog" className="shop-button">Выбрать украшения ↗</Link></div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Контактные данные</h2>
            <label>Ваше имя<input value={name} onChange={(event) => { setName(event.target.value); setReviewed(false); }}
              required autoComplete="name" maxLength={80} placeholder="Как к вам обращаться?" /></label>
            <div className="checkout-fields">
              <label>Телефон<input type="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setReviewed(false); }}
                required autoComplete="tel" maxLength={35} placeholder="+380..." /></label>
              <label>Email<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setReviewed(false); }}
                required autoComplete="email" maxLength={180} placeholder="name@example.com" /></label>
            </div>
            <label>Город и способ доставки<textarea value={delivery} onChange={(event) => { setDelivery(event.target.value); setReviewed(false); }}
              required maxLength={300} rows={3} placeholder="Город, отделение или пожелания по доставке" /></label>
            <label>Комментарий (необязательно)<textarea value={comment} onChange={(event) => setComment(event.target.value)}
              maxLength={500} rows={3} placeholder="Дополнительные пожелания" /></label>
            <button className="shop-button" type="submit">Проверить заполнение <span>→</span></button>
            {reviewed && (
              <div role="status" className="checkout-feedback">
                <strong>Форма заполнена корректно.</strong>
                <p>Это демонстрация: заказ НЕ создан, сообщение НЕ отправлено и оплата НЕ выполнялась. Отправку заказов подключим после настройки сервера.</p>
              </div>
            )}
          </form>
          <aside className="cart-summary">
            <p className="eyebrow">ваш выбор</p>
            {items.map((item) => {
              const product = productById(item.id);
              if (!product) return null;
              return (
                <div className="checkout-item" key={`${item.id}:${item.size}`}>
                  <div><strong>{product.name}</strong><small>{item.size} · {item.quantity} шт.</small></div>
                  <span>{formatPrice(product.price * item.quantity)}</span>
                </div>
              );
            })}
            <div className="summary-total"><span>Сумма изделий</span><strong>{formatPrice(total)}</strong></div>
            <p className="summary-note">Доставка рассчитывается отдельно. Оплата и подтверждение заказа пока недоступны.</p>
            <Link href="/cart" className="back-collection">← Изменить шкатулку</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
