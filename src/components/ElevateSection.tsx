import { ArrowRight } from "lucide-react";
import elevate1 from "@/assets/elevate-1.png";
import elevate2 from "@/assets/elevate-2.png";
import elevate3 from "@/assets/elevate-3.png";
import elevate4 from "@/assets/elevate-4.png";
import ScrollReveal from "./ScrollReveal";

const ElevateSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Elevate Your <span className="text-coral">Everyday Look</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
              Timeless Purses Crafted For Effortless Elegance And Lasting Style.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* 1. Full-width brown bag */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/5]">
              <img
                src={elevate1}
                alt="Brown shoulder bag with gold chain"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>

          {/* 2. Text "Effortless..." + Straw bag */}
          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  Effortless. Elegant.
                  <br />
                  Essential.
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                  Refined Silhouettes Crafted To Complement Your Everyday Look, From Casual Moments To Special Outings.
                </p>
                <button className="mt-3 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5 w-fit hover:bg-coral transition-all duration-300 group/btn">
                  Shop Now
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delay={0.2}>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
                <img
                  src={elevate3}
                  alt="Straw tote bag with white trim"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          </div>

          {/* 3. Green bag + Text "Everyday Style..." */}
          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
                <img
                  src={elevate2}
                  alt="Green structured handbag"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delay={0.2}>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  Everyday Style,
                  <br />
                  Refined
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                  Elegant Purses Designed For Comfort And Durability, Blending Modern Style With Timeless Appeal For Daily Use.
                </p>
                <button className="mt-3 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5 w-fit hover:bg-coral transition-all duration-300 group/btn">
                  Shop Now
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* 4. Full-width pink bag */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={elevate4}
                alt="Pink bucket bag with tassels"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>
        </div>

        {/* Desktop Bento Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Left Column - Large Image */}
          <ScrollReveal variant="fadeLeft" delay={0.1}>
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl row-span-2 h-full">
              <img
                src={elevate1}
                alt="Brown shoulder bag with gold chain"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>

          {/* Right Column - Top Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Green Bag Image */}
            <ScrollReveal variant="scale" delay={0.2}>
              <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-square">
                <img
                  src={elevate2}
                  alt="Green structured handbag"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>

            {/* Text Card - Everyday Style */}
            <ScrollReveal variant="fadeRight" delay={0.3}>
              <div className="flex flex-col justify-center p-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  Everyday Style,
                  <br />
                  Refined
                </h3>
                <p className="text-muted-foreground text-base mt-4 leading-relaxed">
                  Elegant Purses Designed For Comfort And Durability, Blending Modern Style With Timeless Appeal For Daily Use.
                </p>
                <button className="mt-6 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit hover:bg-coral transition-all duration-300 hover:scale-105 group/btn">
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Text Card - Effortless */}
            <ScrollReveal variant="fadeLeft" delay={0.2}>
              <div className="flex flex-col justify-center p-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  Effortless. Elegant.
                  <br />
                  Essential.
                </h3>
                <p className="text-muted-foreground text-base mt-4 leading-relaxed">
                  Refined Silhouettes Crafted To Complement Your Everyday Look, From Casual Moments To Special Outings.
                </p>
                <button className="mt-6 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit hover:bg-coral transition-all duration-300 hover:scale-105 group/btn">
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>

            {/* Straw Bag Image */}
            <ScrollReveal variant="scale" delay={0.3}>
              <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-square">
                <img
                  src={elevate3}
                  alt="Straw tote bag with white trim"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          </div>

          {/* Large Pink Bag */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[16/10]">
              <img
                src={elevate4}
                alt="Pink bucket bag with tassels"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ElevateSection;
