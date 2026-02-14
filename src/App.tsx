import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Product } from "./types";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { TrustBadges } from "./components/sections/TrustBadges";
import { ProductsSection } from "./components/sections/ProductsSection";
import { WholesaleSection } from "./components/sections/WholesaleSection";
import { RetailSection } from "./components/sections/RetailSection";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { CartDrawer } from "./components/cart/CartDrawer";
import { QuoteModal } from "./components/quote/QuoteModal";
import { CheckoutPage } from "./components/checkout/CheckoutPage";

function HomePage() {
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductsSection onRequestQuote={setQuoteProduct} />
      <WholesaleSection />
      <RetailSection />
      <FAQ />
      <Contact />
      <QuoteModal
        product={quoteProduct}
        open={!!quoteProduct}
        onClose={() => setQuoteProduct(null)}
      />
    </>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
