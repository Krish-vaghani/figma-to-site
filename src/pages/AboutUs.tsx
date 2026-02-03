import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.png";
import instagramBackground from "@/assets/instagram-background.png";
import heroProduct from "@/assets/hero-product.jpg";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";

const AboutUs = () => {
  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      ),
      title: "Thoughtful Design",
      description: "Our Purses Are Designed With Both Style And Functionality In Mind, Making Them Perfect For Everyday Use."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Fine Craftsmanship",
      description: "Every Detail Is Carefully Finished By Skilled Craftsmanship To Deliver A Purse You'll Love Using Every Day."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" fill="currentColor"/>
          <circle cx="9" cy="7" r="4" fill="currentColor"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Customer First",
      description: "We Value Our Customers And Focus On Delivering Products And Service That Exceed Expectations."
    }
  ];

  const instagramImages = [product1, product2, product3];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      
      {/* Header with Hero Background */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar className="bg-transparent" />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                About Us
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-coral transition-colors">Home</Link>
                <span>/</span>
                <span className="text-foreground">About Us</span>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Decorative Hero Image */}
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center mt-8 sm:mt-12">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-coral/20">
                  <img 
                    src={heroProduct} 
                    alt="Featured purse" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative leaf elements */}
                <div className="absolute -left-8 -top-4 w-16 h-16 opacity-30">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" fill="hsl(var(--coral))"/>
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* About Content Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Text Content */}
            <ScrollReveal variant="fadeLeft">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">
                  About <span className="text-coral">Us</span>
                </h2>
                
                <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  <p>
                    We Believe A Purse Is More Than Just An Accessory — It's A Part Of Your Everyday Life, Your Style, And Your Confidence.
                  </p>
                  
                  <p>
                    Our Brand Was Created With A Simple Idea: To Design Purses That Are Stylish, Functional, And Made To Last. Every Piece Is Thoughtfully Crafted To Balance Modern Trends With Timeless Elegance, So You Can Carry It Anywhere, Every Day.
                  </p>
                  
                  <p>
                    We Focus On Quality Materials, Smart Compartments, And Fine Finishing To Make Sure Each Purse Feels As Good As It Looks. From Workdays To Weekends, Our Designs Are Made To Fit Seamlessly Into Your Lifestyle.
                  </p>
                  
                  <p>
                    Our Mission Is To Offer Affordable Luxury Without Compromising On Comfort Or Durability. We Design For Women Who Value Practicality But Never Want To Compromise On Style.
                  </p>
                  
                  <p>
                    Every Purse We Create Is A Reflection Of Our Passion For Detail And Our Commitment To Our Customers. Because You Deserve A Purse That Understands Your Life And Complements Your Personality.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal variant="fadeRight" delay={0.2}>
              <div className="relative">
                {/* Decorative illustration behind */}
                <div className="absolute -top-12 -right-8 w-48 h-48 opacity-20 hidden lg:block">
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" stroke="hsl(var(--coral))" strokeWidth="1" strokeDasharray="4 4"/>
                    <circle cx="100" cy="100" r="60" stroke="hsl(var(--coral))" strokeWidth="1"/>
                  </svg>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src={heroProduct} 
                    alt="About us featured purse" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} variant="fadeUp" delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/30 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-4 text-coral">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section 
        className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${instagramBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Instagram Images */}
            <div className="flex gap-4 sm:gap-6 flex-1">
              {instagramImages.map((image, index) => (
                <ScrollReveal key={index} variant="fadeUp" delay={index * 0.1}>
                  <div className="w-28 h-36 sm:w-40 sm:h-52 lg:w-48 lg:h-64 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={image} 
                      alt={`Instagram post ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Follow CTA */}
            <ScrollReveal variant="fadeLeft" delay={0.3}>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                  Follow Our <span className="text-coral">Instagram</span>
                </h3>
                <p className="text-muted-foreground mb-4">@Welcom.My</p>
                <Button 
                  className="rounded-full px-6 py-5 bg-foreground text-background hover:bg-coral transition-all duration-300 gap-2 group"
                >
                  Follow Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
