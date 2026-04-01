import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // When the selected color has only one image, show skeleton until it loads so the user sees feedback.
  const [mainImageLoading, setMainImageLoading] = useState(false);
  const singleImageVariant = images.length === 1;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasMultipleImages = images.length > 1;

  const goPrev = () => {
    if (!hasMultipleImages) return;
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!hasMultipleImages) return;
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

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
      <button
        type="button"
        className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-square w-full"
        onClick={() => setIsLightboxOpen(true)}
        aria-label="View full image"
      >
        {/* Left-to-right shimmer only when this color has one image (no box, just shimmer) */}
        {singleImageVariant && mainImageLoading && (
          <span
            className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none"
            aria-hidden
          >
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </span>
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
      </button>

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

      {/* Fullscreen lightbox for main image */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 z-10 rounded-full bg-background text-foreground px-3 py-1 text-xs sm:text-sm shadow-sm hover:bg-secondary"
                onClick={() => setIsLightboxOpen(false)}
              >
                Close
              </button>
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 text-foreground px-2 py-1 text-xs sm:text-sm shadow hover:bg-secondary"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 text-foreground px-2 py-1 text-xs sm:text-sm shadow hover:bg-secondary"
                  >
                    Next
                  </button>
                </>
              )}
              <img
                src={images[selectedIndex]}
                alt={`${productName} - Full view ${selectedIndex + 1}`}
                className="w-full h-full object-contain rounded-xl bg-background"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImageGallery;
