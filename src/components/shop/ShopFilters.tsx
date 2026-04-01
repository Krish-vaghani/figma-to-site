import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export interface FilterState {
  priceRange: [number, number];
  collections: string[];
  ratings: number[];
}

interface ShopFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

/** Collection tags shown in filter: Best Collection, Hot, Sale, Trending */
const COLLECTION_TAGS = ["Best Collection", "Hot", "Sale", "Trending"] as const;

const ShopFilters = ({ filters, onFiltersChange }: ShopFiltersProps) => {
  const toggleFilter = (type: keyof FilterState, value: string | number) => {
    const current = filters[type] as (string | number)[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [type]: updated });
  };

  const renderStars = (count: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? "fill-coral text-coral" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [values[0], values[1]] as [number, number],
    });
  };

  const renderCheckbox = (
    label: string,
    checked: boolean,
    onChange: () => void
  ) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="h-5 w-5 rounded border-muted-foreground/30 data-[state=checked]:bg-coral data-[state=checked]:border-coral"
      />
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <h2 className="text-xl font-bold text-foreground">Filter Options</h2>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 px-3 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            ₹{filters.priceRange[0].toLocaleString()}
          </div>
          <span className="text-muted-foreground">–</span>
          <div className="flex-1 px-3 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            ₹{filters.priceRange[1].toLocaleString()}
          </div>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={10000}
          step={100}
          className="[&_[role=slider]]:bg-coral [&_[role=slider]]:border-coral [&_.bg-primary]:bg-coral"
        />
      </div>

      {/* Filter by Review (star rating) */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Filter by Review</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters.ratings.includes(rating)}
                onCheckedChange={() => toggleFilter("ratings", rating)}
                className="h-5 w-5 rounded border-muted-foreground/30 data-[state=checked]:bg-coral data-[state=checked]:border-coral"
              />
              <div className="flex items-center gap-2">
                {renderStars(rating)}
                <span className="text-sm text-muted-foreground">
                  {rating} Star
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Review / By Collection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Review</h3>
        <p className="text-sm text-muted-foreground">By Collection</p>
        <div className="space-y-3">
          {COLLECTION_TAGS.map((col) =>
            renderCheckbox(col, filters.collections.includes(col), () =>
              toggleFilter("collections", col)
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default ShopFilters;
