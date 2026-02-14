import { useState } from "react";
import type { Product } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { ProductFilters } from "../products/ProductFilters";
import { ProductGrid } from "../products/ProductGrid";
import { ProductDetailsModal } from "../products/ProductDetailsModal";

type Props = {
  onRequestQuote: (product: Product) => void;
};

export function ProductsSection({ onRequestQuote }: Props) {
  const { products, loading, filters, updateFilters, resetFilters } =
    useProducts();
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Products
          </h2>
          <p className="mt-2 text-gray-600">
            Browse our complete range of soya products
          </p>
        </div>

        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onUpdate={updateFilters}
            onReset={resetFilters}
          />
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading products...</div>
        ) : (
          <ProductGrid
            products={products}
            onRequestQuote={onRequestQuote}
            onViewDetails={setDetailProduct}
          />
        )}

        <ProductDetailsModal
          product={detailProduct}
          open={!!detailProduct}
          onClose={() => setDetailProduct(null)}
          onRequestQuote={onRequestQuote}
        />
      </div>
    </section>
  );
}
