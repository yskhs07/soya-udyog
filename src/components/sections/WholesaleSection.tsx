import { useScrollTo } from "../../hooks/useScrollTo";
import { Button } from "../ui/Button";
import { Truck, FileText, Receipt, Scale } from "lucide-react";

const features = [
  {
    icon: Scale,
    title: "Minimum Order Quantity",
    desc: "Starting from 5 Tonnes. Flexible MOQ for regular buyers.",
  },
  {
    icon: Truck,
    title: "Pan-India Logistics",
    desc: "Dispatched from Kota via trusted transporters. Bulk freight rates.",
  },
  {
    icon: Receipt,
    title: "GST-Billed",
    desc: "Proper GST invoicing with HSN codes. Input tax credit available.",
  },
  {
    icon: FileText,
    title: "Quality Certificates",
    desc: "Lab-tested with protein, moisture & aflatoxin reports per batch.",
  },
];

export function WholesaleSection() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="wholesale"
      className="bg-primary-50 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Wholesale & Bulk Supply
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            We supply soybean meal, DOC, and full fat soya in bulk to feed
            manufacturers, poultry farms, and traders across India.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white p-6 shadow-sm border border-primary-100"
            >
              <f.icon className="h-8 w-8 text-primary-600 mb-3" />
              <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button onClick={() => scrollTo("products")}>
            View Bulk Products & Request Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
