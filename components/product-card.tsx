import Link from "next/link";
import { formatPrice, type Product } from "../lib/products";
import { JewelryArtwork } from "./jewelry-artwork";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link href={`/product/${product.id}`} className="catalog-card">
      <div className="catalog-card-visual">
        <span className="catalog-card-index">{String(index + 1).padStart(2, "0")}</span>
        {product.label && <span className="catalog-card-label">{product.label}</span>}
        <JewelryArtwork art={product.art} accent={product.accent} />
        <span className="catalog-card-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="catalog-card-details">
        <div><h3>{product.name}</h3><p>{product.stone} · {product.category}</p></div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </Link>
  );
}
