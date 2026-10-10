"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "../lib/products";

type FavoritesContextValue = {
  favorites: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
};

const STORAGE_KEY = "dewsite-favorites-v1";
const knownIds = new Set(products.map((product) => product.id));
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function normalize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string =>
    typeof id === "string" && knownIds.has(id)
  ))].slice(0, knownIds.size);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFavorites(normalize(JSON.parse(saved)));
    } catch {
      // Keep a usable in-memory favorites list if storage is blocked.
    }
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        setFavorites(event.newValue ? normalize(JSON.parse(event.newValue)) : []);
      } catch {
        setFavorites([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Favorites remain available during the current page session.
    }
  }, [favorites, hydrated]);

  const has = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggle = useCallback((id: string) => {
    if (!knownIds.has(id)) return;
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id]
    );
  }, []);

  const value = useMemo(() => ({
    favorites,
    count: favorites.length,
    has,
    toggle,
  }), [favorites, has, toggle]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
