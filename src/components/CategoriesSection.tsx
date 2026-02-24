import { categoryTote, categorySling, categoryClutches, categoryMini } from "@/lib/assetUrls";
import ScrollReveal from "./ScrollReveal";
import StaggerReveal from "./StaggerReveal";

interface Category {
  id: number;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 1, name: "Tote Bags", image: categoryTote },
  { id: 2, name: "Shoulder Bags", image: categoryTote },
  { id: 3, name: "Sling Bags", image: categorySling },
  { id: 4, name: "Clutches Bags", image: categoryClutches },
  { id: 5, name: "Mini Bags", image: categoryMini },
  { id: 6, name: "Office Bags", image: categoryTote },
];

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      {/* Circle Image Container */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full bg-secondary/50 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-coral/20 group-hover:scale-105">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-contain p-4 sm:p-5 md:p-6 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-coral/0 group-hover:bg-coral/10 transition-colors duration-300 rounded-full" />
      </div>

      {/* Category Name */}
      <h3 className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:text-coral transition-colors duration-300">
        {category.name}
      </h3>
    </div>
  );
};

import { LandingSection } from "@/types/landing";

interface CategoriesSectionProps {
  data?: LandingSection;
}

const CategoriesSection = ({ data }: CategoriesSectionProps) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Find Your <span className="text-coral">Perfect Purse</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
              Whether It's Daily Use, Office Wear, Or A Special Occasion — We Have The
              Perfect Purse For You.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6 xl:gap-8" staggerDelay={0.08}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default CategoriesSection;
