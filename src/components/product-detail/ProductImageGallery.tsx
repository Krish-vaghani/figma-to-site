import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // When the selected color has only one image, show skeleton until it loads so the user sees feedback.
  const [mainImageLoading, setMainImageLoading] = useState(false);
  const singleImageVariant = images.length === 1;

  useEffect(() => {
    // When images array changes (e.g., user selects a different color),
    // reset to the first image so UI always shows the correct variant.
    setSelectedIndex(0);
    // Only show loading skeleton when this variant has a single image (load can feel slow).
    if (images.length === 1) {
      setMainImageLoading(true);
    } else {
      setMainImageLoading(false);
    }
  }, [images]);

  const handleMainImageLoad = () => {
    if (singleImageVariant) setMainImageLoading(false);
  };
  const handleMainImageError = () => {
    if (singleImageVariant) setMainImageLoading(false);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-square">
        {/* Skeleton only when this color has one image, so user sees feedback while it loads */}
        {singleImageVariant && mainImageLoading && (
          <Skeleton className="absolute inset-0 rounded-2xl z-10" />
        )}
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${productName} - View ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onLoad={handleMainImageLoad}
            onError={handleMainImageError}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail Row (exactly as many as API provides) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
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
