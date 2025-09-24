import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import heroImage from "@/assets/hero-fabric-shop.jpg";
import shopBackground from "@/assets/shop-background.png";

interface HeroProps {
  onUploadClick: () => void;
}

export const Hero = ({ onUploadClick }: HeroProps) => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious fabric shop interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
        <div className="absolute inset-0 fabric-texture opacity-30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            <span className="block">Tata Matching</span>
            <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-shimmer">
              Center
            </span>
          </h1>
          
          <p className="font-elegant text-lg sm:text-2xl lg:text-3xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            Where tradition meets elegance • Premium fabric boutique experience
          </p>
        </div>
        
        {/* Contact Information - Boutique Style */}
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 border border-white/10 shadow-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="text-left">
                  <span className="text-accent font-serif font-medium text-sm block">WhatsApp</span>
                  <a href="https://wa.me/917778036741" className="text-white hover:text-accent transition-colors font-medium text-lg">
                    +91 77780 36741
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Mobile</span>
                  <a href="tel:+917490836570" className="text-white hover:text-accent transition-colors font-medium text-lg">
                    +91 74908 36570
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Location</span>
                  <span className="text-white font-medium text-lg">Bilimora 396321</span>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl">🏪</span>
                </div>
                <div className="text-left">
                  <span className="text-accent font-serif font-medium text-sm block">Boutique</span>
                  <span className="text-white font-medium text-lg">Premium Fabric Collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Button 
            onClick={onUploadClick}
            className="btn-hero group w-full sm:w-auto text-lg"
            size="lg"
          >
            <Upload className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline font-serif">Add Your Collection</span>
            <span className="sm:hidden font-serif">Add Fabrics</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto text-lg font-serif rounded-2xl px-8 py-5 transition-all duration-500"
          >
            Browse Gallery
          </Button>
        </div>
      </div>

      {/* Floating Elements - Enhanced boutique style */}
      <div className="absolute top-16 left-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-24 right-12 w-40 h-40 bg-primary-glow/10 rounded-full blur-3xl animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse hidden xl:block" />
      
      {/* Shop Background Image - Enhanced decorative element */}
      <div className="absolute top-1/2 right-4 sm:right-8 lg:right-16 transform -translate-y-1/2 opacity-15 sm:opacity-25 pointer-events-none">
        <div className="relative">
          <img 
            src={shopBackground} 
            alt="Fabric Design" 
            className="w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 object-contain filter saturate-150 animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
};