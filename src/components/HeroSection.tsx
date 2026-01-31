import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.png";
import heroProduct from "@/assets/hero-product.jpg";
import avatar from "@/assets/avatar.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern - Full image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-left order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-light italic text-foreground/80">
              Elevate Your Everyday Style
            </h2>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground leading-tight">
              Lorem Ipsum Text{" "}
              <span className="block">
                Simply <span className="text-coral">Dummy Text</span>
              </span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg lg:text-lg xl:text-xl max-w-lg">
              Discover Thoughtfully Crafted Purses That Blend Timeless Design With
              Modern Elegance — Perfect For Work, Casual Days, And Special Moments.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 rounded-full px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 text-sm sm:text-base gap-2 group w-full sm:w-auto transition-all duration-300 shadow-lg hover:shadow-xl">
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 text-sm sm:text-base gap-2 group border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background w-full sm:w-auto transition-all duration-300"
              >
                View More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Content - Product Image with Floating Cards */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Main Product Image - No rounded corners to match reference */}
            <div className="relative overflow-hidden group">
              <img
                src={heroProduct}
                alt="Elegant silver clutch purse"
                className="w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating Card - Top positioned near image */}
            <div className="absolute top-12 sm:top-16 lg:top-20 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[40%] z-20 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 max-w-[220px] sm:max-w-[260px] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
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

            {/* Floating Card - Bottom positioned on image */}
            <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-8 z-20 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-5 max-w-[180px] sm:max-w-[220px] transition-all duration-300 hover:-translate-y-1 cursor-pointer group/card">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Purse Name
              </p>
              <h3 className="font-semibold text-foreground text-base sm:text-lg mt-1 group-hover/card:text-coral transition-colors">
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
              <button className="flex items-center gap-2 text-foreground font-medium mt-2 sm:mt-3 group/btn text-sm hover:text-coral transition-colors">
                View More
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
