import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";
import { dummyProducts } from "@/data/dummy-data";
import { useAuth } from "./auth-context";

const STORAGE_KEY = "et-marketplace-cart";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isLoading: boolean;
  subtotal: number;
  total: number;
  addItem(product: Product, quantity?: number): Promise<void>;
  updateQuantity(cartItemId: string, quantity: number): Promise<void>;
  removeItem(cartItemId: string): Promise<void>;
  clearCart(): Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

async function loadPersistedCart(): Promise<CartItem[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as CartItem[];
  } catch (error) {
    console.warn("Failed to load cart", error);
    return [];
  }
}

async function persistCart(items: CartItem[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Failed to persist cart", error);
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    loadPersistedCart().then((persisted) => {
      if (!mounted) return;
      setItems(persisted);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      persistCart(items);
    }
  }, [items, isLoading]);

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0),
    [items]
  );

  const total = useMemo(() => (subtotal > 0 ? subtotal + 1000 : 0), [subtotal]);

  const addItem = useCallback<CartContextValue["addItem"]>(
    async (product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...current,
          {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
          },
        ];
      });

      if (user) {
        // Optimistic insert to Supabase cart table
        await supabase.from("cart").upsert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        });
      }
    },
    [user]
  );

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    async (cartItemId, quantity) => {
      setItems((current) =>
        current.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );

      const item = items.find((entry) => entry.id === cartItemId);
      if (item && user) {
        await supabase
          .from("cart")
          .update({ quantity })
          .eq("user_id", user.id)
          .eq("product_id", item.product.id);
      }
    },
    [items, user]
  );

  const removeItem = useCallback<CartContextValue["removeItem"]>(
    async (cartItemId) => {
      const entry = items.find((item) => item.id === cartItemId);
      setItems((current) => current.filter((item) => item.id !== cartItemId));

      if (entry && user) {
        await supabase
          .from("cart")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", entry.product.id);
      }
    },
    [items, user]
  );

  const clearCart = useCallback(async () => {
    setItems([]);
    if (user) {
      await supabase.from("cart").delete().eq("user_id", user.id);
    }
  }, [user]);

  // Seed demo data for signed-out users on first launch
  useEffect(() => {
    if (!user && !isLoading && items.length === 0) {
      setItems(
        dummyProducts.slice(0, 2).map((product, index) => ({
          id: `${product.id}-seed-${index}`,
          product,
          quantity: 1,
        }))
      );
    }
  }, [isLoading, items.length, user]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isLoading,
      subtotal,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, isLoading, items, removeItem, subtotal, total, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }

  return ctx;
}


