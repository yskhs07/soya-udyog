import { useState, FormEvent } from "react";
import type { Product, QuoteRequest } from "../../types";
import { submitQuote } from "../../api/mockApi";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { CheckCircle } from "lucide-react";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export function QuoteModal({ product, open, onClose }: Props) {
  const [submitted, setSubmitted] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const quote = await submitQuote({
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || undefined,
      businessName: fd.get("businessName") as string,
      gstin: (fd.get("gstin") as string) || undefined,
      city: fd.get("city") as string,
      state: fd.get("state") as string,
      pincode: fd.get("pincode") as string,
      productId: product.id,
      productName: product.name,
      quantity: Number(fd.get("quantity")),
      unit: fd.get("unit") as "kg" | "ton",
      deliveryPreference: fd.get("delivery") as "pickup" | "dispatch",
      message: (fd.get("message") as string) || undefined,
    });
    setLoading(false);
    setSubmitted(quote);
  };

  const handleClose = () => {
    setSubmitted(null);
    onClose();
  };

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={submitted ? "Quote Submitted!" : `Request Quote — ${product.name}`}
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <CheckCircle size={56} className="mx-auto text-primary-500" />
          <div>
            <p className="text-lg font-bold text-gray-900">
              Quote Request Received
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your reference ID is:
            </p>
            <p className="mt-2 text-xl font-mono font-bold text-primary-700">
              {submitted.id}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Our team will contact you within 24 hours at {submitted.phone}
          </p>
          <Button onClick={handleClose} fullWidth>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-primary-50 p-3 text-sm">
            <span className="font-medium text-primary-800">Product:</span>{" "}
            <span className="text-primary-700">{product.name}</span>
            {product.moqKg && (
              <span className="text-primary-600">
                {" "}
                &bull; MOQ: {(product.moqKg / 1000).toFixed(0)}T
              </span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="name" label="Full Name" required placeholder="Your name" />
            <Input name="phone" label="Phone" required placeholder="+91 XXXXX XXXXX" type="tel" />
            <Input name="email" label="Email (optional)" placeholder="you@company.com" type="email" />
            <Input name="businessName" label="Business Name" required placeholder="Your company" />
            <Input name="gstin" label="GSTIN (optional)" placeholder="29XXXXX..." />
            <Input name="city" label="City" required placeholder="City" />
            <Input name="state" label="State" required placeholder="State" />
            <Input name="pincode" label="Pincode" required placeholder="XXXXXX" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              name="quantity"
              label="Quantity"
              required
              type="number"
              min={1}
              placeholder="e.g. 5000"
            />
            <Select
              name="unit"
              label="Unit"
              options={[
                { value: "kg", label: "Kilograms" },
                { value: "ton", label: "Tonnes" },
              ]}
            />
            <Select
              name="delivery"
              label="Delivery"
              options={[
                { value: "dispatch", label: "Dispatch to me" },
                { value: "pickup", label: "Self Pickup" },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Any special requirements..."
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Submitting..." : "Submit Quote Request"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
