import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const selectedLabel = sortOptions.find(opt => opt.value === value)?.label || "Sort";
  
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-auto min-w-[140px] max-w-[200px] bg-background border border-border/60 rounded-full px-4 h-10 shadow-sm hover:border-coral/50 transition-colors">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate text-sm">{selectedLabel}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-xl shadow-lg z-50 min-w-[180px]">
          {sortOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="cursor-pointer hover:bg-coral/10 focus:bg-coral/10 rounded-lg whitespace-nowrap"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;
