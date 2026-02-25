import { useEffect, useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { useInfiniteMarquee } from "@/hooks/use-infinite-marquee";
import { avatar, avatarFemale, avatarMale } from "@/lib/assetUrls";
import type { LandingSection } from "@/types/landing";
import ScrollReveal from "./ScrollReveal";

const TESTIMONIAL_API_URL = "https://api.pursolina.com/api/v1/testimonial/list";
const DEFAULT_AVATAR = avatar;

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  stars: number;
}

interface ApiTestimonial {
  _id: string;
  message: string;
  review: number;
  user_image?: string | null;
  user_name: string;
  user_address: string;
  is_active: boolean;
}

interface ApiResponse {
  message: string;
  data: ApiTestimonial[];
}

/** Use default image for any user_image issue; never skip a testimonial because of image. */
function getAvatarUrl(userImage: unknown): string {
  if (userImage == null) return DEFAULT_AVATAR;
  if (typeof userImage !== "string") return DEFAULT_AVATAR;
  const trimmed = userImage.trim();
  if (trimmed === "") return DEFAULT_AVATAR;
  return trimmed;
}

function mapApiToTestimonial(item: ApiTestimonial): Testimonial {
  return {
    id: item._id,
    quote: item.message || "",
    name: item.user_name || "",
    title: item.user_address || "",
    avatar: getAvatarUrl(item.user_image),
    stars: Math.min(5, Math.max(0, Number(item.review) || 5)),
  };
}

/** Always 2 rows; distribute evenly (e.g. 3 → [2,1], 4 → [2,2], 5 → [3,2]). */
function splitIntoRows(items: Testimonial[]): Testimonial[][] {
  const n = items.length;
  if (n === 0) return [];
  const firstRowSize = Math.ceil(n / 2);
  return [items.slice(0, firstRowSize), items.slice(firstRowSize)];
}

const fallbackRow1: Testimonial[] = [
  {
    id: "1",
    quote: "The Quality Of The Purse Exceeded My Expectations. It Feels Premium And Is Perfect For Special Occasions.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
    stars: 5,
  },
  {
    id: "2",
    quote:
      "I Love How Lightweight Yet Spacious The Bag Is. The Design Is Elegant, And I've Received So Many Compliments Already.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
    stars: 5,
  },
  { id: "3", quote: "From Ordering To Delivery, Everything Was Smooth.", name: "Cameron Williamson", title: "Agency Owner, USA", avatar: avatarFemale, stars: 5 },
  { id: "4", quote: "Beautiful Craftsmanship And Excellent Finish.", name: "Ahmad Korsgaard", title: "Ecom Business Owner", avatar: avatarMale, stars: 5 },
];
const fallbackRow2: Testimonial[] = [
  { id: "5", quote: "Beautiful Detailing And Premium Material.", name: "Ahmad Korsgaard", title: "Ecom Business Owner", avatar: avatarMale, stars: 5 },
  { id: "6", quote: "I'm Really Impressed With The Craftsmanship.", name: "Cameron Williamson", title: "Agency Owner, USA", avatar: avatarFemale, stars: 5 },
  { id: "7", quote: "The Purse Has A Premium Look And Feel.", name: "Ahmad Korsgaard", title: "Ecom Business Owner", avatar: avatarMale, stars: 5 },
  { id: "8", quote: "The Detailing Is Exquisite.", name: "Sarah Williamson", title: "Fashion Blogger, USA", avatar: avatarFemale, stars: 5 },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [imgSrc, setImgSrc] = useState(testimonial.avatar);
  useEffect(() => {
    setImgSrc(testimonial.avatar);
  }, [testimonial.avatar]);
  const stars = testimonial.stars ?? 5;

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[380px] rounded-2xl border border-border/40 shadow-lg select-none flex flex-col overflow-hidden transition-all hover:shadow-xl"
    >
      <div className="px-5 sm:px-7 pt-7 sm:pt-8 pb-4 sm:pb-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
            <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-coral fill-coral/30" />
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < stars ? "text-coral fill-coral" : "text-muted-foreground/40"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p
          className="text-foreground/85 text-xs sm:text-sm leading-relaxed font-normal"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {testimonial.quote}
        </p>
      </div>

      <div className="border-t border-border/50 mx-5 sm:mx-7" />

      <div className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-4 sm:py-5">
        <img
          src={imgSrc}
          alt={`${testimonial.name} - Customer testimonial`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover pointer-events-none ring-2 ring-coral/20"
          loading="lazy"
          draggable={false}
          onError={() => setImgSrc(DEFAULT_AVATAR)}
        />
        <div className="min-w-0">
          <h4 className="font-semibold text-foreground text-sm truncate">{testimonial.name}</h4>
          <p className="text-muted-foreground text-xs truncate">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

const MarqueeRow = ({
  testimonials,
  direction,
  speed = 25,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}) => {
  const { wrapperRef, isDragging, handlers } = useInfiniteMarquee({
    direction,
    speedSeconds: speed,
    sets: 3,
  });

  // Triple the items for seamless infinite scroll
  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      ref={wrapperRef}
      className={
        "relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing" +
        (isDragging ? " select-none" : "")
      }
      // Keep scroll behavior "auto" so RAF-based auto-scroll never fights CSS smooth scrolling.
      style={{ scrollBehavior: "auto" }}
      {...handlers}
    >
      <div className="flex gap-4 w-max">
        {items.map((testimonial, index) => (
          <TestimonialCard key={`${direction}-${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  data?: LandingSection;
}

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(TESTIMONIAL_API_URL)
      .then((res) => res.json())
      .then((body: ApiResponse) => {
        if (cancelled) return;
        const list = Array.isArray(body?.data) ? body.data : [];
        const active = list.filter((t) => t.is_active);
        setTestimonials(active.map(mapApiToTestimonial));
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load testimonials");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => splitIntoRows(testimonials), [testimonials]);
  const useFallback = !loading && (error || testimonials.length === 0);
  const displayRows = useFallback
    ? [fallbackRow1, fallbackRow2]
    : rows;

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            What Our <span className="text-coral">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Discover What Our Customers Are Saying About Their Experience, Quality, And Timeless Style They Love.
          </p>
        </div>
      </ScrollReveal>

      {loading ? (
        <div className="flex justify-center py-12 text-muted-foreground">Loading testimonials…</div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {displayRows
            .filter((row) => row.length > 0)
            .map((rowTestimonials, index) => (
              <MarqueeRow
                key={index}
                testimonials={rowTestimonials}
                direction={index % 2 === 0 ? "left" : "right"}
                speed={35}
              />
            ))}
        </div>
      )}

      <style>{`
        /* marquee handled via scrollLeft (requestAnimationFrame) for perfect manual + infinite looping */
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
