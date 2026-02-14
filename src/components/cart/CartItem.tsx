import type { CartItem as CartItemType } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  item: CartItemType;
};

export function CartItemRow({ item }: Props) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b py-4 last:border-0">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">
          {item.productName}
        </h4>
        <p className="text-xs text-gray-500">{item.pack.label}</p>
        <p className="text-sm font-medium text-primary-700 mt-1">
          {formatCurrency(item.pack.price)} each
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            className="rounded-md border p-1 text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="rounded-md border p-1 text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            {formatCurrency(item.pack.price * item.quantity)}
          </span>
          <button
            onClick={() => removeItem(item.id)}
            className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
