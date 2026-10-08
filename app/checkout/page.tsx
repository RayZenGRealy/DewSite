import type { Metadata } from "next";
import { ShopHeader } from "../../components/shop-header";
import { CheckoutView } from "../../components/checkout-view";

export const metadata: Metadata = {
  title: "Оформление — DEW Jewelry Atelier",
  description: "Предварительная форма заказа украшений DEW.",
};

export default function CheckoutPage() {
  return (
    <div className="store-shell">
      <ShopHeader />
      <CheckoutView />
      <footer className="shop-footer"><span>DEW · jewelry atelier</span><span>Без онлайн-оплаты · демонстрация</span></footer>
    </div>
  );
}
