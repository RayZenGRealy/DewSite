"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../components/cart-provider";
import { useFavorites } from "../components/favorites-provider";
import { FavoriteButton } from "../components/favorite-button";

const stones = [
  { id: "onyx", name: "Оникс", tone: "#272727", glow: "rgba(222,198,154,.18)" },
  { id: "amethyst", name: "Аметист", tone: "#67546e", glow: "rgba(135,98,155,.20)" },
  { id: "moon", name: "Лунный камень", tone: "#c9c5bd", glow: "rgba(220,216,204,.19)" },
  { id: "garnet", name: "Гранат", tone: "#643232", glow: "rgba(132,57,57,.20)" },
  { id: "malachite", name: "Малахит", tone: "#315447", glow: "rgba(57,104,83,.20)" },
];

const products = [
  { id: "noir-orbit", name: "Noir Orbit", kind: "браслет · оникс", price: "2 400 ₴", shape: "orbit" },
  { id: "moon-thread", name: "Moon Thread", kind: "бусы · лунный камень", price: "3 800 ₴", shape: "thread" },
  { id: "violet-dust", name: "Violet Dust", kind: "бисер · аметист", price: "1 950 ₴", shape: "dust" },
];

export default function Home() {
  const [stone, setStone] = useState(stones[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { count: favoritesCount } = useFavorites();

  return (
    <main
      className="site-shell"
      style={{ "--mood-glow": stone.glow } as React.CSSProperties}
    >
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="DEW — на главную">
          <span className="brand-mark">D</span>
          <span className="brand-name">DEW</span>
          <span className="brand-sub">jewelry atelier</span>
        </a>

        <div className="top-actions">
          <Link className="text-action home-nav-link" href="/catalog">Каталог</Link>
          <Link className="text-action home-nav-link" href="/cart">Шкатулка · {count}</Link>
          <Link className="text-action home-favorites-link" href="/favorites">
            Избранное · {favoritesCount}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span>{menuOpen ? "Закрыть" : "Меню"}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav id="main-menu" className={`overlay-menu ${menuOpen ? "is-open" : ""}`}>
        <Link href="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
        <Link href="/cart" onClick={() => setMenuOpen(false)}>Шкатулка · {count}</Link>
        <Link href="/favorites" onClick={() => setMenuOpen(false)}>Избранное · {favoritesCount}</Link>
        <a href="#stones" onClick={() => setMenuOpen(false)}>Камни</a>
        <a href="#atelier" onClick={() => setMenuOpen(false)}>Мастерская</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">handmade · one of one</p>
          <h1>
            Украшения
            <span>с характером камня.</span>
          </h1>
          <p className="hero-note">
            Ручная работа, натуральные минералы и бисер. Каждое изделие собирается
            как маленький личный артефакт.
          </p>
          <a className="discover-link" href="#collection">
            <span>Открыть коллекцию</span>
            <b aria-hidden="true">↘</b>
          </a>
        </div>

        <div className="hero-object" aria-label="Абстрактная композиция браслета из натуральных камней">
          <div className="halo halo-one" />
          <div className="halo halo-two" />
          <div className="bracelet">
            {Array.from({ length: 14 }).map((_, index) => (
              <i
                key={index}
                style={
                  {
                    "--i": index,
                    "--stone": index % 5 === 0 ? "#b99c68" : stone.tone,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="hero-tag tag-top">01 / signature</div>
          <div className="hero-tag tag-bottom">{stone.name}</div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>01</span><i /><span>05</span>
        </div>
      </section>

      <section className="mood" id="stones">
        <div className="section-intro">
          <p className="eyebrow">выберите настроение</p>
          <h2>Камень меняет атмосферу.</h2>
        </div>

        <div className="stone-interactive">
        <div className="stone-picker" role="group" aria-label="Выбор натурального камня">
          {stones.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={stone.id === item.id ? "stone active" : "stone"}
              onClick={() => setStone(item)}
              aria-pressed={stone.id === item.id}
            >
              <span className="stone-number">0{index + 1}</span>
              <i style={{ background: item.tone }} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
          <Link className="stone-explore"
            href={`/catalog?stone=${encodeURIComponent(stone.name)}`}>
            <span>Украшения с камнем «{stone.name}»</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="collection-head">
          <p className="eyebrow">selected pieces</p>
          <h2>Не каталог.<br />Коллекция артефактов.</h2>
          <p>Небольшие серии. Ручная сборка. Естественная уникальность каждого камня.</p>
        </div>

        <div className="product-stage">
          {products.map((product, index) => {
            return (
              <article className={`product product-${index + 1}`} key={product.name}>
                <Link href={`/product/${product.id}`} className="product-visual" aria-label={`Открыть ${product.name}`}>
                  <div className={`jewel jewel-${product.shape}`}>
                    {Array.from({ length: product.shape === "thread" ? 11 : 9 }).map((_, bead) => (
                      <i key={bead} style={{ "--b": bead } as React.CSSProperties} />
                    ))}
                  </div>
                  <span className="piece-number">0{index + 1}</span>
                </Link>
                <div className="product-info">
                  <div>
                    <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                    <p>{product.kind}</p>
                  </div>
                  <strong>{product.price}</strong>
                </div>
                <FavoriteButton id={product.id} className="favorite home-favorite" />
              </article>
            );
          })}
        </div>
        <div className="home-all-products"><Link href="/catalog">Посмотреть всю коллекцию <span>→</span></Link></div>
      </section>

      <section className="atelier" id="atelier">
        <div className="atelier-orbit" aria-hidden="true">
          <span />
          <i />
        </div>
        <div className="atelier-copy">
          <p className="eyebrow">atelier notes</p>
          <h2>Красота не обязана быть идеальной.</h2>
          <p>
            Мы оставляем камню его природную форму и собираем украшение вокруг неё —
            не наоборот.
          </p>
          <a href="#top">История мастерской <span>→</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">DEW</div>
        <p>Авторские украшения · Украина</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
