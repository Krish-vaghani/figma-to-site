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

      <div className="relative z-10 container mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light italic text-foreground/80">
              Elevate Your Everyday Style
            </h2>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Lorem Ipsum Text{" "}
              <span className="block">
                Simply <span className="text-coral">Dummy Text</span>
              </span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg">
              Discover Thoughtfully Crafted Purses That Blend Timeless Design With
              Modern Elegance — Perfect For Work, Casual Days, And Special Moments.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base gap-2 group">
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base gap-2 group border-foreground/20"
              >
                View More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Content - Product Image with Floating Cards */}
          <div className="relative">
            {/* Floating Card - Top */}
            <div className="absolute top-0 left-0 z-20 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 max-w-[250px]">
              <img
                src={avatar}
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">
                  What's White-Label
                </p>
                <p className="text-foreground text-sm">Jewellery Solutions?</p>
              </div>
            </div>

            {/* Main Product Image */}
            <div className="relative rounded-3xl overflow-hidden ml-16 mt-16">
              <img
                src={heroProduct}
                alt="Elegant silver clutch purse"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Floating Card - Bottom */}
            <div className="absolute bottom-12 left-0 z-20 bg-white rounded-2xl shadow-lg p-5 max-w-[220px]">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Purse Name
              </p>
              <h3 className="font-semibold text-foreground text-lg mt-1">
                Lorem Ipsum
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-coral text-coral"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">250 Reviews</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-3">$125.00</p>
              <button className="flex items-center gap-2 text-foreground font-medium mt-3 group">
                View More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
