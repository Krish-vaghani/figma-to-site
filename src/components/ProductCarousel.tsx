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
      dragFree: true, // Smoother drag experience
      containScroll: false,
      duration: 25, // Faster, smoother transitions
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

  // Always show exactly 5 dots with selected in the center (position 2, 0-indexed)
  const getVisibleDotIndices = () => {
    if (totalSlides === 0) return [];
    
    const indices: number[] = [];
    for (let i = -2; i <= 2; i++) {
      let index = selectedIndex + i;
      // Handle wrap around for loop
      if (index < 0) index = totalSlides + index;
      if (index >= totalSlides) index = index % totalSlides;
      indices.push(index);
    }
    return indices;
  };

  const visibleDots = getVisibleDotIndices();

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden px-4 sm:px-8" ref={emblaRef}>
        <div className="flex items-stretch gap-4 sm:gap-6">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-0"
              style={{ flex: "0 0 auto" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden */}

      {/* 5 Dots Navigation - Center dot is always primary */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {visibleDots.map((dotIndex, position) => {
          // Position 2 (middle of 5) is always the selected/center dot
          const isCenter = position === 2;
          const distanceFromCenter = Math.abs(position - 2);
          
          return (
            <button
              key={`dot-${position}-${dotIndex}`}
              onClick={() => scrollTo(dotIndex)}
              className={cn(
                "rounded-full transition-all duration-500 ease-out",
                isCenter
                  ? "w-4 h-4 sm:w-5 sm:h-5 bg-coral scale-110 shadow-lg shadow-coral/30"
                  : distanceFromCenter === 1
                  ? "w-3 h-3 sm:w-4 sm:h-4 bg-coral/60 hover:bg-coral/80"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
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
