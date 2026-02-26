import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { avatar, avatarMale, avatarFemale } from "@/lib/assetUrls";
import { normalizeRating } from "@/lib/utils";
import { useGetProductReviewsQuery } from "@/store/services/productApi";
import type { ApiProductReview } from "@/types/product";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  time: string;
  text: string;
  createdAt?: string;
}

// Simple helper to make a human-readable time label from ISO date
function formatReviewTime(dateLike?: string): string {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
}

function mapApiReviewToReview(r: ApiProductReview, index: number): Review {
  const name =
    r.user_name ||
    r.userName ||
    r.name ||
    "Customer";

  const avatarFromApi = (r.user_image ?? r.userImage) || undefined;

  // Rotate through default avatars when API doesn't provide an image
  const fallbackAvatars = [avatarFemale, avatarMale, avatar];
  const avatarIndex = index % fallbackAvatars.length;

  const rating = Number(r.rating ?? 0);

  const rawDate = r.createdAt || r.updatedAt;
  const time = formatReviewTime(rawDate);

  const text = r.review || r.comment || r.message || "";

  return {
    id: String(r._id ?? r.id ?? index),
    name,
    avatar: avatarFromApi || fallbackAvatars[avatarIndex],
    rating,
    time,
    text,
    createdAt: rawDate,
  };
}

interface ReviewsSectionProps {
  /** Backend product id (not slug); used in /product/detail/:id for reviews. */
  productId: string;
}

const ReviewsSection = ({ productId }: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">("Newest");
  const [showAll, setShowAll] = useState(false);

  // If there is no product id in the URL, don't attempt to load reviews
  const {
    data,
    isLoading,
    isError,
  } = useGetProductReviewsQuery(productId, {
    skip: !productId,
  });

  let apiReviews: ApiProductReview[] = [];

  if (data?.data?.reviews) {
    apiReviews = data.data.reviews;
  }

  const mappedReviews: Review[] = apiReviews.map(mapApiReviewToReview);

  const hasReviews = mappedReviews.length > 0;

  const sortedReviews = [...mappedReviews].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (sortBy === "Newest") {
      return bTime - aTime;
    }
    return aTime - bTime;
  });

  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, 2);

  return (
    <div className="py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground font-serif">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort By :</span>
          <button
            className="flex items-center gap-1 text-sm font-medium text-foreground border border-border rounded-full px-3 py-1.5 hover:bg-secondary/50 transition-colors"
            onClick={() => setSortBy((prev) => (prev === "Newest" ? "Oldest" : "Newest"))}
          >
            {sortBy}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6 sm:space-y-8">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading reviews…</p>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-muted-foreground">
            Unable To Load Reviews Right Now.
          </p>
        )}

        {!isLoading && !isError && !hasReviews && (
          <p className="text-sm text-muted-foreground">
            No Reviews Yet — Be The First To Share Your Experience.
          </p>
        )}

        {!isLoading && !isError && hasReviews && visibleReviews.map((review, index) => {
          const displayRating = normalizeRating(review.rating);
          const isLast = index === visibleReviews.length - 1;

          return (
          <div key={review.id} className="space-y-3">
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{review.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                            i < Math.floor(displayRating)
                              ? "fill-coral text-coral"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {displayRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              {review.time && (
                <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                  {review.time}
                </span>
              )}
            </div>

            {/* Review Text */}
            {review.text && (
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {review.text}
              </p>
            )}

            {/* Divider (except for last) */}
            {!isLast && <div className="border-t border-border" />}
          </div>
        )})}
      </div>

      {/* View All / Show Less Button */}
      {hasReviews && mappedReviews.length > 2 && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-foreground text-background font-medium px-6 py-2.5 rounded-full text-sm flex items-center gap-2 hover:bg-coral transition-colors duration-300"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "View All"}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
