import { useScrollTo } from "../../hooks/useScrollTo";
import { Button } from "../ui/Button";
import { Package, Heart, Zap } from "lucide-react";

export function RetailSection() {
  const scrollTo = useScrollTo();

  return (
    <section id="retail" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Retail Packs for Home
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Enjoy the goodness of soya at home! Our retail range includes Soya
              Chunks, Soya Flour, and Soya Granules in convenient 1 kg, 5 kg,
              and 10 kg packs. High in protein, great for daily cooking.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <Package className="h-6 w-6 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Convenient Pack Sizes
                  </p>
                  <p className="text-sm text-gray-500">
                    1 kg, 5 kg, and 10 kg packs for every household need
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="h-6 w-6 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Healthy & Nutritious
                  </p>
                  <p className="text-sm text-gray-500">
                    High protein, low fat, perfect meat alternative
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-6 w-6 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Quick Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    Cash on delivery available. Order online, pay at your door
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={() => scrollTo("products")}>
                Browse Retail Products
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Soya Chunks", image: "/products/chunks-07.png" },
              { name: "Soya Flour", image: "/products/flour-08.png" },
              { name: "Soya Granules", image: "/products/granules-09.png" },
              { name: "More Products", image: "/products/more-products.png" },
            ].map((item) => (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-xl h-36 group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-lg">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
