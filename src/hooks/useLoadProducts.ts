// hooks/useLoadProducts.ts
import { useProductStore } from "@/stores/useProductStore";
import { useCallback } from "react";

export const useLoadProducts = () => {
  const loadProductsFromStore = useProductStore((state) => state.loadProducts);

  return useCallback(() => {
    loadProductsFromStore();
  }, [loadProductsFromStore]);
};
