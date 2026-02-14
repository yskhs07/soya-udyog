import { useMode } from "../../context/ModeContext";
import { cn } from "../../utils/cn";

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="inline-flex rounded-full bg-gray-100 p-1">
      <button
        onClick={() => setMode("b2c")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer",
          mode === "b2c"
            ? "bg-primary-600 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        B2C Retail
      </button>
      <button
        onClick={() => setMode("b2b")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer",
          mode === "b2b"
            ? "bg-primary-600 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        B2B Wholesale
      </button>
    </div>
  );
}
