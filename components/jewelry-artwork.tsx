import type { CSSProperties } from "react";
import type { JewelryArt } from "../lib/products";

export function JewelryArtwork({
  art,
  accent,
  small = false,
}: {
  art: JewelryArt;
  accent: string;
  small?: boolean;
}) {
  const count = art === "necklace" ? 18 : art === "beads" ? 20 : 13;
  return (
    <div
      className={`piece-art piece-art-${art} ${small ? "piece-art-small" : ""}`}
      style={{ "--piece-accent": accent } as CSSProperties}
      role="img"
      aria-label="Декоративная стилизованная визуализация украшения"
    >
      <span className="piece-art-ring" aria-hidden="true" />
      <div className="piece-beads" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <i
            key={index}
            style={{ "--bead-index": index, "--bead-count": count } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
