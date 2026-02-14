import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  onRequestQuote: (product: Product) => void;
  onViewDetails: (product: Product) => void;
};

export function ProductGrid({ products, onRequestQuote, onViewDetails }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRequestQuote={onRequestQuote}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
