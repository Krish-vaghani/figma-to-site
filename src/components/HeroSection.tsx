import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.png";
import heroProduct from "@/assets/hero-product.jpg";
import avatar from "@/assets/avatar.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light italic text-foreground/80">
              Elevate Your Everyday Style
            </h2>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Lorem Ipsum Text{" "}
              <span className="block">
                Simply <span className="text-coral">Dummy Text</span>
              </span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
              Discover Thoughtfully Crafted Purses That Blend Timeless Design With
              Modern Elegance — Perfect For Work, Casual Days, And Special Moments.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base gap-2 group w-full sm:w-auto">
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base gap-2 group border-foreground/20 w-full sm:w-auto"
              >
                View More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Content - Product Image with Floating Cards */}
          <div className="relative order-1 lg:order-2">
            {/* Floating Card - Top */}
            <div className="absolute top-0 left-0 sm:left-4 z-20 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 max-w-[200px] sm:max-w-[250px]">
              <img
                src={avatar}
                alt="Customer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">
                  What's White-Label
                </p>
                <p className="text-foreground text-xs sm:text-sm">Jewellery Solutions?</p>
              </div>
            </div>

            {/* Main Product Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden ml-8 sm:ml-12 lg:ml-16 mt-12 sm:mt-16">
              <img
                src={heroProduct}
                alt="Elegant silver clutch purse"
                className="w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Floating Card - Bottom */}
            <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-0 z-20 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 max-w-[180px] sm:max-w-[220px]">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Purse Name
              </p>
              <h3 className="font-semibold text-foreground text-base sm:text-lg mt-1">
                Lorem Ipsum
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-coral text-coral"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">250 Reviews</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground mt-2 sm:mt-3">$125.00</p>
              <button className="flex items-center gap-2 text-foreground font-medium mt-2 sm:mt-3 group text-sm">
                View More
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
