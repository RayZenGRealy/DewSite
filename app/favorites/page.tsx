import type { Metadata } from "next";
import { ShopHeader } from "../../components/shop-header";
import { FavoritesView } from "../../components/favorites-view";

export const metadata: Metadata = {
  title: "Избранное — DEW Jewelry Atelier",
  description: "Личная коллекция избранных украшений DEW.",
};

export default function FavoritesPage() {
  return (
    <div className="store-shell">
      <ShopHeader />
      <FavoritesView />
      <footer className="shop-footer">
        <span>DEW · jewelry atelier</span>
        <span>Украшения, к которым хочется возвращаться.</span>
      </footer>
    </div>
  );
}
