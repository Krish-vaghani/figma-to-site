import { ArrowRight } from "lucide-react";
import elevate1 from "@/assets/elevate-1.png";
import elevate2 from "@/assets/elevate-2.png";
import elevate3 from "@/assets/elevate-3.png";
import elevate4 from "@/assets/elevate-4.png";

const ElevateSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Elevate Your <span className="text-coral">Everyday Look</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Timeless Purses Crafted For Effortless Elegance And Lasting Style.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Large Image */}
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] lg:aspect-auto lg:row-span-2">
            <img
              src={elevate1}
              alt="Brown shoulder bag with gold chain"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Right Column - Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Green Bag Image */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] sm:aspect-square">
              <img
                src={elevate2}
                alt="Green structured handbag"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Text Card - Everyday Style */}
            <div className="flex flex-col justify-center p-4 sm:p-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Everyday Style,
                <br />
                Refined
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed">
                Elegant Purses Designed For Comfort And Durability, Blending Modern Style With Timeless Appeal For Daily Use.
              </p>
              <button className="mt-4 sm:mt-6 bg-foreground text-background px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit hover:bg-coral transition-all duration-300 hover:scale-105 group/btn">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column - Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Text Card - Effortless */}
            <div className="flex flex-col justify-center p-4 sm:p-6 order-2 sm:order-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Effortless. Elegant.
                <br />
                Essential.
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed">
                Refined Silhouettes Crafted To Complement Your Everyday Look, From Casual Moments To Special Outings.
              </p>
              <button className="mt-4 sm:mt-6 bg-foreground text-background px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit hover:bg-coral transition-all duration-300 hover:scale-105 group/btn">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Straw Bag Image */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] sm:aspect-square order-1 sm:order-2">
              <img
                src={elevate3}
                alt="Straw tote bag with white trim"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Large Pink Bag - Full Width on Mobile, Right Column on Desktop */}
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:col-start-2 lg:row-start-2">
            <img
              src={elevate4}
              alt="Pink bucket bag with tassels"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevateSection;
