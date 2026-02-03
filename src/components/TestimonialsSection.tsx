import { Quote } from "lucide-react";
import { useInfiniteMarquee } from "@/hooks/use-infinite-marquee";
import avatarMale from "@/assets/avatar-male.jpg";
import avatarFemale from "@/assets/avatar-female.png";
import ScrollReveal from "./ScrollReveal";
import testimonialCardBg from "@/assets/testimonials-card-bg.png";

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
      className="flex-shrink-0 w-[340px] sm:w-[400px] rounded-[40px] p-6 sm:p-8 select-none [&_*]:no-underline flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${testimonialCardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-coral fill-coral/20 mb-4 flex-shrink-0" />

      {/* Quote Text */}
      <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6 flex-grow">{testimonial.quote}</p>

      {/* Author */}
      <div className="flex items-center gap-3 flex-shrink-0 mt-auto">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} - Customer testimonial`}
          className="w-12 h-12 rounded-full object-cover pointer-events-none"
          loading="lazy"
          draggable={false}
        />
        <div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h4>
          <p className="text-muted-foreground text-xs sm:text-sm">{testimonial.title}</p>
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
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background/50 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-4 py-2 w-max">
        {items.map((testimonial, index) => (
          <TestimonialCard key={`${direction}-${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-16 bg-secondary/30 overflow-hidden">
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
      <div className="space-y-2">
        <MarqueeRow testimonials={testimonialsRow1} direction="left" speed={35} />
        <MarqueeRow testimonials={testimonialsRow2} direction="right" speed={40} />
      </div>

      {/* Custom CSS for smooth marquee */}
      <style>{`
        /* marquee handled via scrollLeft (requestAnimationFrame) for perfect manual + infinite looping */
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
