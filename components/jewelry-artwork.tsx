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
        {Array.from({ length: count }, (_, index) => {
          const angle = art === "necklace"
            ? Math.PI * (index / (count - 1))
            : 2 * Math.PI * (index / count);
          const radius = art === "beads" ? 22 + (index % 3) * 6 : 33;
          const x = 50 + radius * Math.cos(angle);
          const y = art === "necklace"
            ? 32 + 46 * Math.sin(angle)
            : 50 + radius * Math.sin(angle);
          return (
            <i
              key={index}
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            />
          );
        })}
      </div>
    </div>
  );
}
