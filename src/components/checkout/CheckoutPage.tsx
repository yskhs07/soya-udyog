import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { ArrowLeft, CreditCard } from "lucide-react";

export function CheckoutPage() {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Store form data
    const data: Record<string, string> = {};
    fd.forEach((value, key) => {
      data[key] = value.toString();
    });
    setFormData(data);

    // Show payment gateway message
    setShowPaymentModal(true);
  };

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
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="flex w-full items-center gap-4 rounded-lg border-2 border-primary-500 bg-primary-50 p-4">
              <CreditCard size={24} className="text-primary-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Online Payment
                </p>
                <p className="text-xs text-gray-500">
                  UPI, Cards, Net Banking, Wallets
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" fullWidth>
            Place Order — {formatCurrency(totalAmount)}
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

      <Modal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Payment Gateway Integration"
      >
        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800 font-medium">
              🚧 Payment Gateway Will Be Integrated Soon
            </p>
            <p className="text-xs text-amber-700 mt-2">
              We're currently setting up secure payment options for you. In the meantime, please contact us directly to complete your order.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Your Order Details:</h4>
            <div className="text-sm space-y-1 text-gray-600">
              <p><span className="font-medium">Name:</span> {formData.name}</p>
              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
              <p><span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
              <p className="mt-3 font-semibold text-gray-900">
                Total Amount: {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowPaymentModal(false)}
            >
              Close
            </Button>
            <Button
              fullWidth
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
