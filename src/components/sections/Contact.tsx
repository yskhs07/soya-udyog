import { useState, FormEvent } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Contact Us
          </h2>
          <p className="mt-2 text-gray-600">
            Get in touch for pricing, bulk orders, or any queries
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    Industrial Area, Kota, Rajasthan 324005
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">+91 98290 00000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">info@soyaudyog.com</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919829000000?text=Hi%20Soya%20Udyog%2C%20I%27m%20interested%20in%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-white font-semibold hover:bg-green-600 transition-colors no-underline"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-white p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Send a Message
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" label="Name" required placeholder="Your name" />
              <Input name="phone" label="Phone" required placeholder="+91 XXXXX XXXXX" type="tel" />
            </div>
            <Input name="email" label="Email (optional)" placeholder="you@email.com" type="email" />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="How can we help you?"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {sent ? (
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm">
                <CheckCircle size={18} />
                Message sent! We'll get back to you soon.
              </div>
            ) : (
              <Button type="submit" fullWidth>
                Send Message
              </Button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
