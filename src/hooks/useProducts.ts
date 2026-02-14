import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { fetchProducts, type ProductFilters } from "../api/mockApi";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});

  const load = useCallback(async (f?: ProductFilters) => {
    setLoading(true);
    const data = await fetchProducts(f);
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(filters);
  }, [filters, load]);

  const updateFilters = useCallback((partial: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { products, loading, filters, updateFilters, resetFilters };
}
