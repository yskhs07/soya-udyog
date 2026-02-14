import { cn } from "../../utils/cn";

type Props = {
  name: string;
  color: string;
  className?: string;
};

export function ProductImage({ name, color, className }: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-t-xl text-white font-bold text-2xl select-none",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      }}
    >
      {initials}
    </div>
  );
}
