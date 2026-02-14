import { Banknote, CreditCard } from "lucide-react";
import { cn } from "../../utils/cn";

type Props = {
  selected: "cod";
  onSelect: (method: "cod") => void;
};

export function PaymentPlaceholder({ selected, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>

      <button
        onClick={() => onSelect("cod")}
        className={cn(
          "flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors cursor-pointer",
          selected === "cod"
            ? "border-primary-500 bg-primary-50"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <Banknote
          size={24}
          className={selected === "cod" ? "text-primary-600" : "text-gray-400"}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Cash / Pay on Delivery
          </p>
          <p className="text-xs text-gray-500">Pay when your order arrives</p>
        </div>
      </button>

      <div className="flex w-full items-center gap-4 rounded-lg border-2 border-gray-200 p-4 opacity-50 cursor-not-allowed">
        <CreditCard size={24} className="text-gray-400" />
        <div>
          <p className="text-sm font-semibold text-gray-500">
            Online Payment
          </p>
          <p className="text-xs text-gray-400">
            UPI, Cards, Net Banking — Coming Soon
          </p>
        </div>
        <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
          Soon
        </span>
      </div>
    </div>
  );
}
