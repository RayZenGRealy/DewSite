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
import { productById } from "../lib/products";

export type CartItem = { id: string; size: string; quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (id: string, size: string, quantity?: number) => void;
  changeQuantity: (id: string, size: string, quantity: number) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
};
const STORAGE_KEY = "dewsite-cart-v1";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalize(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const items: CartItem[] = [];
  for (const candidate of value.slice(0, 50)) {
    if (!candidate || typeof candidate !== "object") continue;
    const entry = candidate as Partial<CartItem>;
    const product = typeof entry.id === "string" ? productById(entry.id) : undefined;
    if (!product || typeof entry.size !== "string" || !product.sizes.includes(entry.size)) continue;
    const number = Number(entry.quantity);
    if (!Number.isFinite(number) || number < 1) continue;
    const qty = Math.min(20, Math.floor(number));
    const existing = items.find((item) => item.id === product.id && item.size === entry.size);
    if (existing) existing.quantity = Math.min(20, existing.quantity + qty);
    else items.push({ id: product.id, size: entry.size, quantity: qty });
  }
  return items;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(normalize(JSON.parse(saved)));
    } catch {
      // Browsers may block storage; cart still works for this session.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable: in-memory cart remains functional.
    }
  }, [items, hydrated]);

  const add = useCallback((id: string, size: string, quantity = 1) => {
    const product = productById(id);
    if (!product || !product.sizes.includes(size)) return;
    const safe = Math.min(20, Math.max(1, Math.floor(quantity) || 1));
    setItems((current) => {
      const found = current.find((item) => item.id === id && item.size === size);
      if (!found) return [...current, { id, size, quantity: safe }];
      return current.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.min(20, item.quantity + safe) }
          : item
      );
    });
  }, []);

  const changeQuantity = useCallback((id: string, size: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    const safe = Math.min(20, Math.max(1, Math.floor(quantity)));
    setItems((current) => current.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity: safe } : item
    ));
  }, []);

  const remove = useCallback((id: string, size: string) => {
    setItems((current) => current.filter((item) => item.id !== id || item.size !== size));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) =>
    sum + (productById(item.id)?.price ?? 0) * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, count, total, add, changeQuantity, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
