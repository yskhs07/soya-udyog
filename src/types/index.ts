export type PriceType = "fixed" | "ask";

export type Pack = {
  label: string;
  weightKg: number;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: "Meal" | "DOC" | "Full-Fat" | "Organic" | "Other";
  location: "Kota, Rajasthan";
  priceType: PriceType;
  pricePerKg?: number;
  moqKg?: number;
  packaging?: string;
  proteinPct?: number;
  moisturePct?: number;
  description: string;
  images: string[];
  featured?: boolean;
  retailEnabled: boolean;
  packs?: Pack[];
  imagePlaceholder: string;
};

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  pack: Pack;
  quantity: number;
};

export type QuoteRequest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessName: string;
  gstin?: string;
  city: string;
  state: string;
  pincode: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: "kg" | "ton";
  deliveryPreference: "pickup" | "dispatch";
  message?: string;
  createdAt: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: "cod";
  status: "pending_payment" | "confirmed" | "dispatched" | "delivered";
  total: number;
  createdAt: string;
};
