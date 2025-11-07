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
import type { Product, Service } from "@/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./auth-context";

type WishlistItem =
  | { type: "product"; product: Product }
  | { type: "service"; service: Service };

interface WishlistContextValue {
  items: WishlistItem[];
  isLoading: boolean;
  toggleProduct(product: Product): Promise<void>;
  toggleService(service: Service): Promise<void>;
  containsProduct(productId: string): boolean;
  containsService(serviceId: string): boolean;
  clear(): Promise<void>;
}

const STORAGE_KEY = "et-marketplace-wishlist";

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

async function loadPersistedWishlist(): Promise<WishlistItem[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as WishlistItem[];
  } catch (error) {
    console.warn("Failed to load wishlist", error);
    return [];
  }
}

async function persistWishlist(items: WishlistItem[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Failed to persist wishlist", error);
  }
}

export function WishlistProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadPersistedWishlist().then((persisted) => {
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
      persistWishlist(items);
    }
  }, [items, isLoading]);

  const toggleProduct = useCallback<WishlistContextValue["toggleProduct"]>(
    async (product) => {
      setItems((current) => {
        const exists = current.some(
          (item) => item.type === "product" && item.product.id === product.id
        );

        if (exists) {
          return current.filter(
            (item) => item.type !== "product" || item.product.id !== product.id
          );
        }

        return [...current, { type: "product", product }];
      });

      if (user) {
        const exists = items.some(
          (item) => item.type === "product" && item.product.id === product.id
        );
        if (exists) {
          await supabase
            .from("wishlist")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", product.id);
        } else {
          await supabase.from("wishlist").upsert({
            user_id: user.id,
            product_id: product.id,
          });
        }
      }
    },
    [items, user]
  );

  const toggleService = useCallback<WishlistContextValue["toggleService"]>(
    async (service) => {
      setItems((current) => {
        const exists = current.some(
          (item) => item.type === "service" && item.service.id === service.id
        );

        if (exists) {
          return current.filter(
            (item) => item.type !== "service" || item.service.id !== service.id
          );
        }

        return [...current, { type: "service", service }];
      });

      if (user) {
        const exists = items.some(
          (item) => item.type === "service" && item.service.id === service.id
        );
        if (exists) {
          await supabase
            .from("wishlist")
            .delete()
            .eq("user_id", user.id)
            .eq("service_id", service.id);
        } else {
          await supabase.from("wishlist").upsert({
            user_id: user.id,
            service_id: service.id,
          });
        }
      }
    },
    [items, user]
  );

  const containsProduct = useCallback(
    (productId: string) =>
      items.some((item) => item.type === "product" && item.product.id === productId),
    [items]
  );

  const containsService = useCallback(
    (serviceId: string) =>
      items.some((item) => item.type === "service" && item.service.id === serviceId),
    [items]
  );

  const clear = useCallback(async () => {
    setItems([]);
    if (user) {
      await supabase.from("wishlist").delete().eq("user_id", user.id);
    }
  }, [user]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      isLoading,
      toggleProduct,
      toggleService,
      containsProduct,
      containsService,
      clear,
    }),
    [
      clear,
      containsProduct,
      containsService,
      isLoading,
      items,
      toggleProduct,
      toggleService,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return ctx;
}


