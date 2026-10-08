import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShopHeader } from "../../../components/shop-header";
import { JewelryArtwork } from "../../../components/jewelry-artwork";
import { ProductBuy } from "../../../components/product-buy";
import { formatPrice, productById, products } from "../../../lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productById(slug);
  if (!product) return { title: "Украшение не найдено — DEW" };
  return { title: `${product.name} — DEW Jewelry Atelier`, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productById(slug);
  if (!product) notFound();

  return (
    <div className="store-shell">
      <ShopHeader />
      <main className="product-main">
        <div className="crumbs"><Link href="/catalog">Коллекция</Link><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong></div>
        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery-frame"><JewelryArtwork art={product.art} accent={product.accent} /></div>
            <p>01 / визуальная композиция, не фотография изделия</p>
          </div>
          <div className="product-panel">
            <p className="eyebrow">DEW / авторская коллекция</p>
            <h1>{product.name}</h1>
            <p className="product-stone">{product.stone} · {product.category}</p>
            <p className="product-price">{formatPrice(product.price)}</p>
            <p className="product-description">{product.description}</p>
            <ProductBuy product={product} />
            <div className="product-specs">
              <div><span>Состав</span><p>{product.material}</p></div>
              <div><span>Изготовление</span><p>Ручная работа</p></div>
              <div><span>Доставка</span><p>Условия уточняются при подтверждении заказа</p></div>
            </div>
          </div>
        </div>
      </main>
      <footer className="shop-footer"><span>DEW · jewelry atelier</span><Link href="/catalog">← Продолжить знакомство с коллекцией</Link></footer>
    </div>
  );
}
