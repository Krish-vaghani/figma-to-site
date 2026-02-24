import { Quote } from "lucide-react";
import { useInfiniteMarquee } from "@/hooks/use-infinite-marquee";
import { avatarMale, avatarFemale, testimonialCardBg } from "@/lib/assetUrls";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: 1,
    quote: "The Quality Of The Purse Exceeded My Expectations. It Feels Premium And Is Perfect For Special Occasions.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
  },
  {
    id: 2,
    quote:
      "I Love How Lightweight Yet Spacious The Bag Is. The Design Is Elegant, And I've Received So Many Compliments Already.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 3,
    quote:
      "From Ordering To Delivery, Everything Was Smooth. The Purse Looks Exactly Like The Pictures And Feels Very Durable.",
    name: "Cameron Williamson",
    title: "Agency Owner, USA",
    avatar: avatarFemale,
  },
  {
    id: 4,
    quote: "Beautiful Craftsmanship And Excellent Finish. Has Quickly Become My Go-To Bag For Everyday Use.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: 5,
    quote:
      "Beautiful Detailing And Premium Material. The Purse Feels Comfortable To Carry And Adds A Classy Touch To Any Outfit.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 6,
    quote:
      "I'm Really Impressed With The Craftsmanship. It Feels High Quality And Is Ideal For Everyday Use As Well As Events.",
    name: "Cameron Williamson",
    title: "Agency Owner, USA",
    avatar: avatarFemale,
  },
  {
    id: 7,
    quote: "The Purse Has A Premium Look And Feel. It's Versatile Enough To Carry Every Day Or For Special Occasions.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 8,
    quote: "The Detailing Is Exquisite. It's A Great Choice For Formal And Casual Outings.",
    name: "Sarah Williamson",
    title: "Fashion Blogger, USA",
    avatar: avatarFemale,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[380px] rounded-2xl border border-border/40 shadow-lg select-none flex flex-col overflow-hidden transition-all hover:shadow-xl"
    >
      {/* Top section with quote (extra inner padding so content doesn't crop) */}
      <div className="px-5 sm:px-7 pt-7 sm:pt-8 pb-4 sm:pb-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
            <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-coral fill-coral/30" />
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-coral fill-coral" viewBox="0 0 20 20">
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

      {/* Author divider */}
      <div className="border-t border-border/50 mx-5 sm:mx-7" />

      {/* Author section */}
      <div className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-4 sm:py-5">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} - Customer testimonial`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover pointer-events-none ring-2 ring-coral/20"
          loading="lazy"
          draggable={false}
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

import { LandingSection } from "@/types/landing";

interface TestimonialsSectionProps {
  data?: LandingSection;
}

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Section Header */}
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

      {/* Scrolling Rows */}
      <div className="space-y-4">
        <MarqueeRow testimonials={testimonialsRow1} direction="left" speed={35}  />
        <MarqueeRow testimonials={testimonialsRow2} direction="right" speed={35} />
      </div>

      {/* Custom CSS for smooth marquee */}
      <style>{`
        /* marquee handled via scrollLeft (requestAnimationFrame) for perfect manual + infinite looping */
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
