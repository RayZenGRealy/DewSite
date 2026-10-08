import type { Metadata } from "next";
import { ShopHeader } from "../../components/shop-header";
import { CartView } from "../../components/cart-view";

export const metadata: Metadata = {
  title: "Шкатулка — DEW Jewelry Atelier",
  description: "Выбранные украшения из коллекции DEW.",
};

export default function CartPage() {
  return (
    <div className="store-shell">
      <ShopHeader />
      <CartView />
      <footer className="shop-footer"><span>DEW · jewelry atelier</span><span>Каждое украшение — маленькая история.</span></footer>
    </div>
  );
}
