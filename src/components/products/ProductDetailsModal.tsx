import { useState } from "react";
import type { Product, Pack } from "../../types";
import { useMode } from "../../context/ModeContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Modal } from "../ui/Modal";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ProductImage } from "../ui/ProductImage";
import { ShoppingCart, FileText } from "lucide-react";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
};

export function ProductDetailsModal({
  product,
  open,
  onClose,
  onRequestQuote,
}: Props) {
  const { isB2B } = useMode();
  const { addItem } = useCart();
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);

  if (!product) return null;

  const showRetail = !isB2B && product.retailEnabled && product.packs;
  const packs = product.packs ?? [];
  const activePack = selectedPack ?? packs[0] ?? null;

  return (
    <Modal open={open} onClose={onClose} title={product.name}>
      <div className="space-y-5">
        <ProductImage
          name={product.name}
          color={product.imagePlaceholder}
          src={product.images[0]}
          className="h-48 w-full rounded-xl"
        />

        <div className="flex flex-wrap gap-2">
          <Badge>{product.category}</Badge>
          {product.proteinPct && (
            <Badge variant="amber">{product.proteinPct}% Protein</Badge>
          )}
          {product.moisturePct && (
            <Badge variant="gray">{product.moisturePct}% Moisture</Badge>
          )}
          {product.packaging && <Badge variant="gray">{product.packaging}</Badge>}
        </div>

        <p className="text-sm text-gray-500">
          Shiv Soya &bull; {product.location}
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          {product.description}
        </p>

        {(isB2B || !product.retailEnabled) && (
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            <div className="text-xl font-bold text-primary-700">
              {product.priceType === "ask"
                ? "Ask Price"
                : `${formatCurrency(product.pricePerKg!)}/kg`}
            </div>
            {product.moqKg && (
              <p className="text-sm text-gray-600">
                Minimum Order: {(product.moqKg / 1000).toFixed(0)} Tonnes
              </p>
            )}
            <Button
              fullWidth
              variant="secondary"
              onClick={() => {
                onClose();
                onRequestQuote(product);
              }}
            >
              <FileText size={16} />
              Request Quote
            </Button>
          </div>
        )}

        {showRetail && (
          <div className="rounded-lg bg-gray-50 p-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">Select Pack Size</p>
            <div className="flex flex-wrap gap-2">
              {packs.map((pack) => (
                <button
                  key={pack.label}
                  onClick={() => setSelectedPack(pack)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${activePack?.label === pack.label
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  {pack.label} — {formatCurrency(pack.price)}
                </button>
              ))}
            </div>
            {activePack && (
              <Button
                fullWidth
                onClick={() => {
                  addItem(product.id, product.name, activePack);
                  onClose();
                }}
              >
                <ShoppingCart size={16} />
                Add to Cart — {formatCurrency(activePack.price)}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
