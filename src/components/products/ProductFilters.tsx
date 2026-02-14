import { Search } from "lucide-react";
import type { ProductFilters as Filters } from "../../api/mockApi";
import { Select } from "../ui/Select";

type Props = {
  filters: Filters;
  onUpdate: (partial: Partial<Filters>) => void;
  onReset: () => void;
};

const categories = [
  { value: "All", label: "All Categories" },
  { value: "Meal", label: "Meal" },
  { value: "DOC", label: "DOC" },
  { value: "Full-Fat", label: "Full-Fat" },
  { value: "Organic", label: "Organic" },
  { value: "Other", label: "Other" },
];

const sortOptions = [
  { value: "", label: "Sort By" },
  { value: "name", label: "Name A-Z" },
  { value: "protein-high", label: "Protein: High to Low" },
  { value: "protein-low", label: "Protein: Low to High" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export function ProductFilters({ filters, onUpdate, onReset }: Props) {
  const hasFilters = filters.search || filters.category || filters.sort;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ""}
          onChange={(e) => onUpdate({ search: e.target.value })}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <Select
        options={categories}
        value={filters.category || "All"}
        onChange={(e) => onUpdate({ category: e.target.value })}
      />
      <Select
        options={sortOptions}
        value={filters.sort || ""}
        onChange={(e) =>
          onUpdate({ sort: (e.target.value || undefined) as Filters["sort"] })
        }
      />
      {hasFilters && (
        <button
          onClick={onReset}
          className="text-sm text-primary-600 hover:text-primary-800 font-medium whitespace-nowrap cursor-pointer bg-transparent border-none p-0"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
