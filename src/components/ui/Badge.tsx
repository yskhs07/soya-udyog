import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  variant?: "green" | "amber" | "gray";
  className?: string;
};

const styles = {
  green: "bg-primary-100 text-primary-800",
  amber: "bg-amber-100 text-amber-800",
  gray: "bg-gray-100 text-gray-700",
};

export function Badge({ children, variant = "green", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
