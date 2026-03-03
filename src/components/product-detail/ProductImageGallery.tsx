import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // When images array changes (e.g., user selects a different color),
    // reset to the first image so UI always shows the correct variant.
    setSelectedIndex(0);
  }, [images]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-square">
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
