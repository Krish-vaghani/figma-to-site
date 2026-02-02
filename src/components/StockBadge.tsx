import { AlertTriangle } from "lucide-react";
import { getStockStatus } from "@/data/products";
import { motion } from "framer-motion";

interface StockBadgeProps {
  stock: number;
  className?: string;
  showIcon?: boolean;
  variant?: "badge" | "text";
}

const StockBadge = ({ stock, className = "", showIcon = true, variant = "badge" }: StockBadgeProps) => {
  const status = getStockStatus(stock);

  if (!status.urgent) return null;

  if (variant === "text") {
    const shortText = `${stock} Left`;
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
          status.color === "destructive"
            ? "bg-red-500/10 text-red-600 border border-red-200"
            : "bg-amber-500/10 text-amber-700 border border-amber-200"
        } ${className}`}
      >
        {shortText}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
        status.color === "destructive"
          ? "bg-red-500/10 text-red-600 border border-red-200"
          : "bg-amber-500/10 text-amber-700 border border-amber-200"
      } ${className}`}
    >
      {showIcon && <AlertTriangle className="h-3 w-3" />}
      <span>{status.text}</span>
    </motion.div>
  );
};

export default StockBadge;
