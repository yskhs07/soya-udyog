import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Drawer } from "../ui/Drawer";
import { Button } from "../ui/Button";
import { CartItemRow } from "./CartItem";
import { ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, totalAmount } = useCart();
  const navigate = useNavigate();

  return (
    <Drawer open={drawerOpen} onClose={closeDrawer} title="Your Cart">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <ShoppingBag size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-1">
            Browse products and add items to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="border-t bg-gray-50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <Button
              fullWidth
              onClick={() => {
                closeDrawer();
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
