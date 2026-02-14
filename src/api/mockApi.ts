import type { CartItem, Order, QuoteRequest, Product } from "../types";
import { products as allProducts } from "../data/products";
import { generateQuoteId, generateOrderId } from "../utils/generateId";

const DELAY = 200;
const CART_KEY = "soya_cart";
const QUOTES_KEY = "soya_quotes";
const ORDERS_KEY = "soya_orders";

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY));
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Products
export type ProductFilters = {
  search?: string;
  category?: string;
  priceType?: string;
  minProtein?: number;
  sort?: "name" | "protein-high" | "protein-low" | "price-low" | "price-high";
};

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  let result = [...allProducts];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters?.category && filters.category !== "All") {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters?.priceType) {
    result = result.filter((p) => p.priceType === filters.priceType);
  }

  if (filters?.minProtein) {
    result = result.filter(
      (p) => p.proteinPct !== undefined && p.proteinPct >= filters.minProtein!
    );
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "protein-high":
        result.sort((a, b) => (b.proteinPct ?? 0) - (a.proteinPct ?? 0));
        break;
      case "protein-low":
        result.sort((a, b) => (a.proteinPct ?? 0) - (b.proteinPct ?? 0));
        break;
      case "price-low":
        result.sort((a, b) => (a.pricePerKg ?? Infinity) - (b.pricePerKg ?? Infinity));
        break;
      case "price-high":
        result.sort((a, b) => (b.pricePerKg ?? 0) - (a.pricePerKg ?? 0));
        break;
    }
  }

  return delay(result);
}

// Cart
export async function getCart(): Promise<CartItem[]> {
  return delay(readJson<CartItem[]>(CART_KEY, []));
}

export async function addToCart(item: CartItem): Promise<CartItem[]> {
  const cart = readJson<CartItem[]>(CART_KEY, []);
  const existing = cart.find(
    (c) => c.productId === item.productId && c.pack.label === item.pack.label
  );
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  writeJson(CART_KEY, cart);
  return delay(cart);
}

export async function updateCartItem(
  id: string,
  quantity: number
): Promise<CartItem[]> {
  let cart = readJson<CartItem[]>(CART_KEY, []);
  if (quantity <= 0) {
    cart = cart.filter((c) => c.id !== id);
  } else {
    const item = cart.find((c) => c.id === id);
    if (item) item.quantity = quantity;
  }
  writeJson(CART_KEY, cart);
  return delay(cart);
}

export async function removeFromCart(id: string): Promise<CartItem[]> {
  const cart = readJson<CartItem[]>(CART_KEY, []).filter((c) => c.id !== id);
  writeJson(CART_KEY, cart);
  return delay(cart);
}

export async function clearCart(): Promise<void> {
  writeJson(CART_KEY, []);
  return delay(undefined);
}

// Quotes
export async function submitQuote(
  data: Omit<QuoteRequest, "id" | "createdAt">
): Promise<QuoteRequest> {
  const quote: QuoteRequest = {
    ...data,
    id: generateQuoteId(),
    createdAt: new Date().toISOString(),
  };
  const quotes = readJson<QuoteRequest[]>(QUOTES_KEY, []);
  quotes.push(quote);
  writeJson(QUOTES_KEY, quotes);
  return delay(quote);
}

// Orders
export async function createOrder(
  data: Omit<Order, "id" | "status" | "createdAt">
): Promise<Order> {
  const order: Order = {
    ...data,
    id: generateOrderId(),
    status: "pending_payment",
    createdAt: new Date().toISOString(),
  };
  const orders = readJson<Order[]>(ORDERS_KEY, []);
  orders.push(order);
  writeJson(ORDERS_KEY, orders);
  await clearCart();
  return delay(order);
}
