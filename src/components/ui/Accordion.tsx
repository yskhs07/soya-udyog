import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

type Item = { question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            {item.question}
            <ChevronDown
              size={18}
              className={cn(
                "shrink-0 text-gray-400 transition-transform",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
