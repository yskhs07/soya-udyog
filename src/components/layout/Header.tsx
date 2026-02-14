import { Link } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useCart } from "../../context/CartContext";
import { useMode } from "../../context/ModeContext";
import { useScrollTo } from "../../hooks/useScrollTo";

export function Header() {
  const { totalItems, openDrawer } = useCart();
  const { isB2C } = useMode();
  const scrollTo = useScrollTo();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Leaf className="h-7 w-7 text-primary-600" />
          <span className="text-lg font-bold text-gray-900">
            Soya Udyog
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => scrollTo("products")} className="hover:text-primary-700 cursor-pointer bg-transparent border-none p-0">
            Products
          </button>
          <button onClick={() => scrollTo("about")} className="hover:text-primary-700 cursor-pointer bg-transparent border-none p-0">
            About
          </button>
          <button onClick={() => scrollTo("faq")} className="hover:text-primary-700 cursor-pointer bg-transparent border-none p-0">
            FAQ
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-primary-700 cursor-pointer bg-transparent border-none p-0">
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {isB2C && (
            <button
              onClick={openDrawer}
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 cursor-pointer bg-transparent border-none"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
