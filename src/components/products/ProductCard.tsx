import { useState } from "react";
import type { Product, Pack } from "../../types";
import { useMode } from "../../context/ModeContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ProductImage } from "../ui/ProductImage";
import { ShoppingCart, FileText } from "lucide-react";

type Props = {
  product: Product;
  onRequestQuote: (product: Product) => void;
  onViewDetails: (product: Product) => void;
};

export function ProductCard({ product, onRequestQuote, onViewDetails }: Props) {
  const { isB2B } = useMode();
  const { addItem } = useCart();
  const [selectedPack, setSelectedPack] = useState<Pack | null>(
    product.packs?.[0] ?? null
  );

  const showRetail = !isB2B && product.retailEnabled && product.packs;
  const showB2B = isB2B || !product.retailEnabled;

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      <button onClick={() => onViewDetails(product)} className="cursor-pointer bg-transparent border-none p-0">
        <ProductImage
          name={product.name}
          color={product.imagePlaceholder}
          className="h-40 w-full"
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge>{product.category}</Badge>
          {product.proteinPct && (
            <Badge variant="amber">{product.proteinPct}% Protein</Badge>
          )}
          {product.featured && <Badge variant="green">Featured</Badge>}
        </div>

        <button
          onClick={() => onViewDetails(product)}
          className="text-left cursor-pointer bg-transparent border-none p-0"
        >
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
        </button>

        <p className="mt-1 text-xs text-gray-500">
          Soya Udyog &bull; {product.location}
        </p>

        {showB2B && (
          <div className="mt-3 space-y-1">
            <div className="text-lg font-bold text-primary-700">
              {product.priceType === "ask" ? "Ask Price" : `${formatCurrency(product.pricePerKg!)}/kg`}
            </div>
            {product.moqKg && (
              <p className="text-xs text-gray-500">
                MOQ: {(product.moqKg / 1000).toFixed(0)} Tonnes &bull; {product.packaging}
              </p>
            )}
          </div>
        )}

        {showRetail && product.packs && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-1">
              {product.packs.map((pack) => (
                <button
                  key={pack.label}
                  onClick={() => setSelectedPack(pack)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    selectedPack?.label === pack.label
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {pack.label}
                </button>
              ))}
            </div>
            {selectedPack && (
              <div className="text-lg font-bold text-primary-700">
                {formatCurrency(selectedPack.price)}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-3">
          {showB2B ? (
            <Button
              fullWidth
              variant="secondary"
              onClick={() => onRequestQuote(product)}
            >
              <FileText size={16} />
              Request Quote
            </Button>
          ) : showRetail && selectedPack ? (
            <Button
              fullWidth
              onClick={() =>
                addItem(product.id, product.name, selectedPack)
              }
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
