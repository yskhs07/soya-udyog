import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold text-white">Soya Udyog</span>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed">
              Leading manufacturer and supplier of premium soya products from
              Kota, Rajasthan. Serving both bulk B2B and retail B2C customers
              across India.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white transition-colors text-primary-200 no-underline">Products</a></li>
              <li><a href="#wholesale" className="hover:text-white transition-colors text-primary-200 no-underline">Wholesale</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors text-primary-200 no-underline">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors text-primary-200 no-underline">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" />
                <span className="text-primary-200">Industrial Area, Kota, Rajasthan 324005</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-primary-400" />
                <span className="text-primary-200">+91 98290 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-primary-400" />
                <span className="text-primary-200">info@soyaudyog.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-800 pt-6 text-center text-xs text-primary-300">
          &copy; {new Date().getFullYear()} Soya Udyog, Kota, Rajasthan. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
