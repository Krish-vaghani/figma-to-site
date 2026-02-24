import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGyroscopeTilt } from "@/hooks/useGyroscopeTilt";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile();
  const { tilt } = useGyroscopeTilt(12);

  // Use the same image repeated if only one provided
  const galleryImages = images.length >= 4 ? images : Array(4).fill(images[0]);

  // Subtle transform based on device tilt (mobile only)
  const tiltStyle = isMobile
    ? {
        transform: `scale(1.06) translate(${tilt.x * 8}px, ${tilt.y * 5}px)`,
        transition: "transform 0.3s ease-out",
      }
    : {};

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={galleryImages[selectedIndex]}
            alt={`${productName} - View ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
            style={tiltStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {galleryImages.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative overflow-hidden rounded-lg sm:rounded-xl aspect-square transition-all duration-200 ${
              selectedIndex === index
                ? "ring-2 ring-coral ring-offset-2"
                : "ring-1 ring-border hover:ring-muted-foreground"
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
