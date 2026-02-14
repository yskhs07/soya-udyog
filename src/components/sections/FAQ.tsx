import { Accordion } from "../ui/Accordion";

const faqItems = [
  {
    question: "Where is Soya Udyog located?",
    answer:
      "We are based in the Industrial Area of Kota, Rajasthan (324005). Our manufacturing and dispatch operations run from this facility.",
  },
  {
    question: "What is the minimum order quantity for bulk products?",
    answer:
      "Our standard MOQ starts from 5 Tonnes for soybean meal and related products. For Soya DOC and Hulls, the MOQ is 10 Tonnes. Custom quantities can be discussed for regular buyers.",
  },
  {
    question: "Do you provide GST-billed invoices?",
    answer:
      "Yes, all bulk/wholesale orders are properly GST-billed with applicable HSN codes. Input tax credit is available for registered businesses.",
  },
  {
    question: "What quality certifications do your products have?",
    answer:
      "Every batch comes with lab test reports covering protein content, moisture levels, and aflatoxin levels. We follow strict quality control processes at our Kota facility.",
  },
  {
    question: "Can I buy retail packs for home use?",
    answer:
      "Yes! We offer Soya Chunks, Soya Flour, and Soya Granules in 1 kg, 5 kg, and 10 kg retail packs. Switch to B2C Retail mode on the website to browse retail products and order with Cash on Delivery.",
  },
  {
    question: "How is bulk delivery handled?",
    answer:
      "Bulk orders are dispatched from our Kota facility via trusted transporters. We can arrange delivery across India. Self-pickup from our factory is also available.",
  },
  {
    question: "How do I request a wholesale quote?",
    answer:
      "Switch to B2B Wholesale mode, select the product you need, and click 'Request Quote'. Fill in your business details and quantity — our team will respond within 24 hours with pricing.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "For retail orders, we currently accept Cash on Delivery (COD). Online payment options (UPI, cards, net banking) are coming soon. For wholesale orders, payment terms are discussed during quotation.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-16 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600">
            Everything you need to know about our products and ordering
          </p>
        </div>
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
