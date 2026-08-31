import { useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
}

let cartItems: CartItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return cartItems;
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const existing = cartItems.find((i) => i.id === item.id);
  if (existing) {
    cartItems = cartItems.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    cartItems = [...cartItems, { ...item, quantity: 1 }];
  }
  notify();
}

export function removeFromCart(id: string) {
  cartItems = cartItems.filter((i) => i.id !== id);
  notify();
}

export function updateQty(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  cartItems = cartItems.map((i) => (i.id === id ? { ...i, quantity } : i));
  notify();
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
