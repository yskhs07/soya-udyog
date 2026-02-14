import type { Order } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../ui/Button";
import { CheckCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  order: Order;
};

export function OrderConfirmation({ order }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-lg py-16 px-4 text-center">
      <CheckCircle size={64} className="mx-auto text-primary-500 mb-6" />

      <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
      <p className="mt-2 text-gray-500">
        Thank you for your order. We'll process it shortly.
      </p>

      <div className="mt-6 rounded-xl border bg-white p-6 text-left space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Order ID</span>
          <span className="font-mono font-bold text-primary-700">
            {order.id}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            Pending Payment
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Payment</span>
          <span className="text-sm font-medium text-gray-700">
            Cash on Delivery
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(order.total)}
          </span>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Items</p>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm py-1"
            >
              <Package size={14} className="text-gray-400" />
              <span className="text-gray-700">
                {item.productName} ({item.pack.label}) x{item.quantity}
              </span>
              <span className="ml-auto font-medium text-gray-900">
                {formatCurrency(item.pack.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-xs font-medium text-gray-500 mb-1">Delivery To</p>
          <p className="text-sm text-gray-700">
            {order.customer.name} &bull; {order.customer.phone}
          </p>
          <p className="text-sm text-gray-500">
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.state} — {order.customer.pincode}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => navigate("/")} fullWidth>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
