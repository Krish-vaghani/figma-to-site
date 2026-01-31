import { Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import avatarMale from "@/assets/avatar-male.jpg";
import avatarFemale from "@/assets/avatar-female.png";

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
    quote: "I Love How Lightweight Yet Spacious The Bag Is. The Design Is Elegant, And I've Received So Many Compliments Already.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 3,
    quote: "From Ordering To Delivery, Everything Was Smooth. The Purse Looks Exactly Like The Pictures And Feels Very Durable.",
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
    quote: "Beautiful Detailing And Premium Material. The Purse Feels Comfortable To Carry And Adds A Classy Touch To Any Outfit.",
    name: "Ahmad Korsgaard",
    title: "Ecom Business Owner",
    avatar: avatarMale,
  },
  {
    id: 6,
    quote: "I'm Really Impressed With The Craftsmanship. It Feels High Quality And Is Ideal For Everyday Use As Well As Events.",
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
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 select-none">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-coral fill-coral/20 mb-4" />

      {/* Quote Text */}
      <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover pointer-events-none"
          draggable={false}
        />
        <div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base">
            {testimonial.name}
          </h4>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

const MarqueeRow = ({ 
  testimonials, 
  direction,
  speed = 25
}: { 
  testimonials: Testimonial[]; 
  direction: "left" | "right";
  speed?: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // Triple the items for seamless infinite scroll
  const items = [...testimonials, ...testimonials, ...testimonials];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStart.current = {
      x: e.pageX - wrapperRef.current.offsetLeft,
      scrollLeft: wrapperRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - dragStart.current.x) * 1.5;
    wrapperRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStart.current = {
      x: e.touches[0].pageX - wrapperRef.current.offsetLeft,
      scrollLeft: wrapperRef.current.scrollLeft,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const x = e.touches[0].pageX - wrapperRef.current.offsetLeft;
    const walk = (x - dragStart.current.x) * 1.5;
    wrapperRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
      style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />
      
      <div
        ref={containerRef}
        className="flex gap-6 py-2 w-max"
        style={{
          animation: isPaused ? 'none' : `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {items.map((testimonial, index) => (
          <TestimonialCard key={`${direction}-${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          What Our <span className="text-coral">Clients Say</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
          Discover What Our Customers Are Saying About Their Experience, Quality, And
          Timeless Style They Love.
        </p>
      </div>

      {/* Scrolling Rows */}
      <div className="space-y-6">
        <MarqueeRow testimonials={testimonialsRow1} direction="left" speed={35} />
        <MarqueeRow testimonials={testimonialsRow2} direction="right" speed={40} />
      </div>

      {/* Custom CSS for smooth marquee */}
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
