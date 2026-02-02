import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  children: React.ReactNode[];
  autoplayDelay?: number;
  className?: string;
}

const ProductCarousel = ({ 
  children, 
  autoplayDelay = 3000,
  className 
}: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: false,
    },
    [
      Autoplay({ 
        delay: autoplayDelay, 
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const totalSlides = scrollSnaps.length;

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden px-4 sm:px-8" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-6">
          {children.map((child, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 min-w-0 first:ml-4 last:mr-4 sm:first:ml-8 sm:last:mr-8"
              style={{ flex: "0 0 auto" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border border-border rounded-full p-2 sm:p-3 shadow-lg hover:bg-coral hover:text-white hover:border-coral transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border border-border rounded-full p-2 sm:p-3 shadow-lg hover:bg-coral hover:text-white hover:border-coral transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Animated Dots Navigation */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {scrollSnaps.map((_, index) => {
          const isSelected = index === selectedIndex;
          // Calculate distance from selected for scaling effect
          let distance = Math.abs(index - selectedIndex);
          // Handle loop wrap-around distance
          if (totalSlides > 0) {
            const wrapDistance = totalSlides - distance;
            distance = Math.min(distance, wrapDistance);
          }
          
          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "rounded-full transition-all duration-500 ease-out",
                isSelected
                  ? "w-4 h-4 sm:w-5 sm:h-5 bg-coral scale-110 shadow-lg shadow-coral/30"
                  : distance === 1
                  ? "w-3 h-3 sm:w-4 sm:h-4 bg-coral/60 hover:bg-coral/80"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCarousel;
