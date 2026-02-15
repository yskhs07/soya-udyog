import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, Pack } from "../types";
import * as api from "../api/mockApi";

type CartContextType = {
  items: CartItem[];
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, productName: string, pack: Pack, qty?: number) => Promise<void>;
  updateQty: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  totalItems: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    api.getCart().then(setItems);
  }, []);

  const addItem = useCallback(
    async (productId: string, productName: string, pack: Pack, qty = 1) => {
      const id = `${productId}-${pack.label}`;
      const updated = await api.addToCart({
        id,
        productId,
        productName,
        pack,
        quantity: qty,
      });
      setItems(updated);
      setDrawerOpen(true);
    },
    []
  );

  const updateQty = useCallback(async (id: string, qty: number) => {
    const updated = await api.updateCartItem(id, qty);
    setItems(updated);
  }, []);

  const removeItem = useCallback(async (id: string) => {
    const updated = await api.removeFromCart(id);
    setItems(updated);
  }, []);

  const clear = useCallback(async () => {
    await api.clearCart();
    setItems([]);
  }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = items.reduce(
    (s, i) => s + i.pack.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addItem,
        updateQty,
        removeItem,
        clear,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
