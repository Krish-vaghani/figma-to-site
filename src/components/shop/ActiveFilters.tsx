import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: {
    collections: string[];
    priceRange: [number, number];
    ratings: number[];
  };
  onRemove: (type: string, value: string) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({ filters, onRemove, onClearAll }: ActiveFiltersProps) => {
  const [minPrice, maxPrice] = filters.priceRange;
  const hasDefaultPrice = minPrice === 0 && maxPrice === 10000;

  const allFilters = [
    ...filters.collections.map((v) => ({ type: "collections" as const, value: v })),
    ...filters.ratings.map((r) => ({ type: "ratings" as const, value: String(r) })),
    ...(!hasDefaultPrice ? [{ type: "priceRange" as const, value: "" }] : []),
  ];

  if (allFilters.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-foreground">Active Filter</h3>
      <div className="flex flex-wrap items-center gap-2">
        {allFilters.map(({ type, value }) => (
          <button
            key={type === "priceRange" ? "priceRange" : `${type}-${value}`}
            onClick={() => onRemove(type, value)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-coral text-white text-sm font-medium rounded-full hover:bg-coral/90 transition-colors"
          >
            {type === "priceRange"
              ? `Price: ₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}`
              : type === "ratings"
                ? `${value} Star`
                : value}
            <X className="h-4 w-4" />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="text-coral text-sm font-medium hover:underline"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;
