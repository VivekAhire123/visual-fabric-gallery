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
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
          Tata Matching
          <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
            Center
          </span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Premium Fabric Collection - Discover exquisite fabrics with exclusive social media content
        </p>
        
        {/* Contact Information */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-accent font-semibold">📱 WhatsApp:</span>
                <a href="https://wa.me/917778036741" className="hover:text-accent transition-colors">
                  +91 77780 36741
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-accent font-semibold">📞 Mobile:</span>
                <a href="tel:+917490836570" className="hover:text-accent transition-colors">
                  +91 74908 36570
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-accent font-semibold">📍 Address:</span>
                <span>Bilimora 396321</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-accent font-semibold">🏪 Shop:</span>
                <span>Tata Matching Center</span>
              </div>
            </div>
          </div>
        </div>
        
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
      
      {/* Shop Background Image - Decorative Element */}
      <div className="absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2 opacity-10 sm:opacity-20 pointer-events-none">
        <img 
          src={shopBackground} 
          alt="Fabric Design" 
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-contain filter saturate-150 animate-pulse"
        />
      </div>
    </section>
  );
};