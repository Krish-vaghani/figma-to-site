import React, { useState, useMemo } from "react";
import { Star, ChevronDown } from "lucide-react";
import { avatar, avatarMale, avatarFemale } from "@/lib/assetUrls";
import type { ApiReview } from "@/types/product";

interface Review {
  id: number | string;
  name: string;
  avatar: string;
  rating: number;
  time: string;
  text: string;
}

const defaultAvatars = [avatarFemale, avatarMale, avatar];

function formatReviewTime(createdAt?: string): string {
  if (!createdAt) return "Recently";
  try {
    const d = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } catch {
    return "Recently";
  }
}

function apiReviewsToReviews(apiReviews: ApiReview[] | { list?: ApiReview[] } | undefined): Review[] | null {
  const list = Array.isArray(apiReviews) ? apiReviews : apiReviews?.list;
  if (!list?.length) return null;
  return list.map((r, i) => ({
    id: r._id ?? i,
    name: r.user_name ?? r.name ?? "Customer",
    avatar: r.avatar ?? defaultAvatars[i % defaultAvatars.length],
    rating: typeof r.rating === "number" ? r.rating : 5,
    time: formatReviewTime(r.createdAt),
    text: r.comment ?? r.text ?? "",
  }));
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Courtney Henry",
    avatar: avatarFemale,
    rating: 5.0,
    time: "2 mins ago",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Cursus Tristique In Tellus Diam, Metus Sit. Quis Venenatis, Neque Arcu Accumsan Sollicitudin Aliquet Nunc. Enim, Arcu Non In Aenean Tristique Felis.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Neque Arcu Accumsan Sollicitudin",
  },
  {
    id: 2,
    name: "Courtney Henry",
    avatar: avatarMale,
    rating: 5.0,
    time: "2 mins ago",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Cursus Tristique In Tellus Diam, Metus Sit. Quis Venenatis, Neque Arcu Accumsan Sollicitudin Aliquet Nunc. Enim, Arcu Non In Aenean Tristique Felis.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Neque Arcu Accumsan Sollicitudin",
  },
  {
    id: 3,
    name: "Courtney Henry",
    avatar: avatar,
    rating: 5.0,
    time: "2 mins ago",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Cursus Tristique In Tellus Diam, Metus Sit. Quis Venenatis, Neque Arcu Accumsan Sollicitudin Aliquet Nunc. Enim, Arcu Non In Aenean Tristique Felis.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Neque Arcu Accumsan Sollicitudin",
  },
];

export interface ReviewsSectionProps {
  apiReviews?: ApiReview[] | { list?: ApiReview[] };
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ apiReviews }) => {
  const [sortBy, setSortBy] = useState("Newest");
  const reviews = useMemo(() => apiReviewsToReviews(apiReviews) ?? mockReviews, [apiReviews]);

  return (
    <div className="py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground font-serif">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort By :</span>
          <button className="flex items-center gap-1 text-sm font-medium text-foreground border border-border rounded-full px-3 py-1.5 hover:bg-secondary/50 transition-colors">
            {sortBy}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6 sm:space-y-8">
        {reviews.map((review) => (
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
                            i < Math.floor(review.rating)
                              ? "fill-coral text-coral"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                {review.time}
              </span>
            </div>

            {/* Review Text */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {review.text}
            </p>

            {/* Divider (except for last) */}
            {review.id !== reviews[reviews.length - 1]?.id && (
              <div className="border-t border-border" />
            )}
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-foreground text-background font-medium px-6 py-2.5 rounded-full text-sm flex items-center gap-2 hover:bg-coral transition-colors duration-300">
          View All
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

ReviewsSection.displayName = "ReviewsSection";
export default ReviewsSection;
