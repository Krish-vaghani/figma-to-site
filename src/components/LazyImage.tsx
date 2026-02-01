import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  aspectRatio?: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholderClassName = "",
  aspectRatio
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "100px",
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={cn("relative overflow-hidden", aspectRatio)}
    >
      {/* Blur placeholder */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse",
          placeholderClassName,
          isLoaded ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500"
        )}
      />
      
      {/* Blurred preview (using same image at low quality via CSS) */}
      {isInView && !isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={cn(
            className,
            "transition-all duration-700",
            isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-105"
          )}
          onLoad={() => setIsLoaded(true)}
          initial={false}
        />
      )}
    </div>
  );
};

export default LazyImage;
