import { Star } from "lucide-react";

interface RatingBreakdownProps {
  rating: number;
  totalReviews: number;
}

const RatingBreakdown = ({ rating, totalReviews }: RatingBreakdownProps) => {
  // Simulated rating distribution
  const distribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 55 },
    { stars: 3, percentage: 35 },
    { stars: 2, percentage: 20 },
    { stars: 1, percentage: 10 },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-6 sm:py-8">
      {/* Left: Overall Rating */}
      <div className="flex-shrink-0">
        <p className="text-4xl sm:text-5xl font-bold text-foreground">{rating.toFixed(1)}</p>
        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                i < Math.floor(rating)
                  ? "fill-coral text-coral"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{totalReviews} Reviews</p>
      </div>

      {/* Right: Star Bars */}
      <div className="flex-1 w-full space-y-2 sm:space-y-2.5">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-12 text-right flex-shrink-0">
              {item.stars} star
            </span>
            <div className="flex-1 h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-coral rounded-full transition-all duration-700"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
