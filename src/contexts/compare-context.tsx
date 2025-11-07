import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Product } from "@/types";

interface CompareContextValue {
  products: Product[];
  isOpen: boolean;
  toggleProduct(product: Product): void;
  clear(): void;
  setOpen(open: boolean): void;
}

const MAX_COMPARE_ITEMS = 4;

const CompareContext = createContext<CompareContextValue | undefined>(
  undefined
);

export function CompareProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleProduct = useCallback((product: Product) => {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }

      if (current.length >= MAX_COMPARE_ITEMS) {
        return current;
      }

      return [...current, product];
    });
    setIsOpen(true);
  }, []);

  const clear = useCallback(() => {
    setProducts([]);
    setIsOpen(false);
  }, []);

  const setOpen = useCallback((open: boolean) => setIsOpen(open), []);

  const value = useMemo<CompareContextValue>(
    () => ({ products, isOpen, toggleProduct, clear, setOpen }),
    [clear, isOpen, products, setOpen, toggleProduct]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used within CompareProvider");
  }

  return ctx;
}


