import { MapPin, ShieldCheck, Truck, Package } from "lucide-react";

const badges = [
  { icon: MapPin, label: "Kota, Rajasthan Supply" },
  { icon: ShieldCheck, label: "Quality Checked" },
  { icon: Truck, label: "Bulk Dispatch" },
  { icon: Package, label: "Retail Packs Available" },
];

export function TrustBadges() {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 rounded-lg bg-primary-50 px-4 py-3"
            >
              <b.icon className="h-6 w-6 shrink-0 text-primary-600" />
              <span className="text-sm font-medium text-primary-800">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
