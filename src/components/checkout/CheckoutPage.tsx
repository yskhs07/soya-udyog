import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/mockApi";
import type { Order } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PaymentPlaceholder } from "./PaymentPlaceholder";
import { OrderConfirmation } from "./OrderConfirmation";
import { ArrowLeft } from "lucide-react";

export function CheckoutPage() {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentMethod] = useState<"cod">("cod");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await createOrder({
      items: [...items],
      customer: {
        name: fd.get("name") as string,
        phone: fd.get("phone") as string,
        email: (fd.get("email") as string) || undefined,
        address: fd.get("address") as string,
        city: fd.get("city") as string,
        state: fd.get("state") as string,
        pincode: fd.get("pincode") as string,
      },
      paymentMethod,
      total: totalAmount,
    });
    setLoading(false);
    setOrder(result);
  };

  if (order) {
    return <OrderConfirmation order={order} />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center px-4">
        <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
        <p className="text-sm text-gray-400 mt-1">
          Add some products before checking out.
        </p>
        <Button onClick={() => navigate("/")} className="mt-6">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer bg-transparent border-none p-0"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Shipping Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" label="Full Name" required placeholder="Your name" />
              <Input name="phone" label="Phone" required placeholder="+91 XXXXX XXXXX" type="tel" />
              <Input name="email" label="Email (optional)" placeholder="you@email.com" type="email" className="sm:col-span-2" />
              <Input name="address" label="Address" required placeholder="Street, locality" className="sm:col-span-2" />
              <Input name="city" label="City" required placeholder="City" />
              <Input name="state" label="State" required placeholder="State" />
              <Input name="pincode" label="Pincode" required placeholder="XXXXXX" />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <PaymentPlaceholder selected={paymentMethod} onSelect={() => {}} />
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Placing Order..." : `Place Order — ${formatCurrency(totalAmount)}`}
          </Button>
        </form>

        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-white p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.productName} ({item.pack.label}) x{item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.pack.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between">
              <span className="font-medium text-gray-700">Total</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
