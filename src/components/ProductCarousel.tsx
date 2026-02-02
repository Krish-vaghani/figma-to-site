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

  // Calculate which 5 dots to show with current in center
  const totalSlides = scrollSnaps.length;
  const getDotIndices = () => {
    if (totalSlides <= 5) {
      return Array.from({ length: totalSlides }, (_, i) => i);
    }
    
    // Always show 5 dots with selected in the center (position 2)
    const indices: number[] = [];
    for (let i = -2; i <= 2; i++) {
      let index = selectedIndex + i;
      // Handle wrap around for loop
      if (index < 0) index = totalSlides + index;
      if (index >= totalSlides) index = index - totalSlides;
      indices.push(index);
    }
    return indices;
  };

  const dotIndices = getDotIndices();

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

      {/* 5 Dots Navigation - Center dot is primary */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {dotIndices.map((dotIndex, position) => {
          const isCenter = position === Math.floor(dotIndices.length / 2);
          const distanceFromCenter = Math.abs(position - Math.floor(dotIndices.length / 2));
          
          return (
            <button
              key={`dot-${dotIndex}-${position}`}
              onClick={() => scrollTo(dotIndex)}
              className={cn(
                "rounded-full transition-all duration-300 ease-out",
                isCenter
                  ? "w-3 h-3 sm:w-4 sm:h-4 bg-coral scale-110"
                  : distanceFromCenter === 1
                  ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-coral/50 hover:bg-coral/70"
                  : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCarousel;
