import { useMode } from "../../context/ModeContext";
import { useScrollTo } from "../../hooks/useScrollTo";
import { Button } from "../ui/Button";

export function Hero() {
  const { isB2B } = useMode();
  const scrollTo = useScrollTo();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isB2B
              ? "Premium Soya Products — Bulk Supply from Kota"
              : "Fresh Soya Products — Delivered to Your Door"}
          </h1>
          <p className="mt-4 text-lg text-primary-100 sm:text-xl">
            {isB2B
              ? "Soybean Meal, DOC, Full Fat Soya & more. MOQ from 5 tonnes. Quality-checked, GST-billed, dispatched from Kota, Rajasthan."
              : "Soya Chunks, Flour, Granules & more in convenient retail packs. High protein, great taste, straight from Kota, Rajasthan."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => scrollTo("products")}
              className="bg-white !text-primary-800 hover:bg-primary-50"
            >
              {isB2B ? "View Bulk Products" : "Shop Now"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollTo(isB2B ? "wholesale" : "contact")}
              className="!text-white border border-white/30 hover:bg-white/10"
            >
              {isB2B ? "Request Bulk Quote" : "Contact Us"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
