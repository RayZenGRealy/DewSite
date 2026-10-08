import type { Metadata } from "next";
import { ShopHeader } from "../../components/shop-header";
import { CatalogClient } from "../../components/catalog-client";

export const metadata: Metadata = {
  title: "Коллекция — DEW Jewelry Atelier",
  description: "Авторские браслеты, бусы, бисерные украшения и комплекты из натуральных камней.",
};

export default function CatalogPage() {
  return (
    <div className="store-shell">
      <ShopHeader />
      <CatalogClient />
      <footer className="shop-footer"><span>DEW · jewelry atelier</span><span>Создано вручную, с характером.</span></footer>
    </div>
  );
}
