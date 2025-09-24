import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import heroImage from "@/assets/hero-fabric-shop.jpg";

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
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
          Luxury Fabric
          <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
            Collection
          </span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover premium fabrics with integrated social media showcase. 
          Connect your products to Instagram, Pinterest, and YouTube.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button 
            onClick={onUploadClick}
            className="btn-hero group w-full sm:w-auto"
            size="lg"
          >
            <Upload className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Upload Fabric Collection</span>
            <span className="sm:hidden">Upload Fabrics</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto"
          >
            Browse Gallery
          </Button>
        </div>
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse hidden sm:block" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-pulse hidden sm:block" />
    </section>
  );
};