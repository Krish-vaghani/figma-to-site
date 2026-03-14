import { useViewedToday } from "@/contexts/ViewedTodayContext";

interface TodayViewedBadgeProps {
  productId: string | number;
}

export default function TodayViewedBadge({ productId }: TodayViewedBadgeProps) {
  const { getCountForProduct } = useViewedToday();
  const count = getCountForProduct(productId);
  return (
    <span className="inline-flex items-center shrink-0 px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap bg-coral/10 text-coral border border-coral/20">
     Today Viewed {count}
    </span>
  );
}
