import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Star } from "lucide-react";
import { useFabricItems, FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedSlideshowProps {
  onItemClick: (item: FabricItem) => void;
}

export const FeaturedSlideshow = ({ onItemClick }: FeaturedSlideshowProps) => {
  const { fabricItems } = useFabricItems();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get featured items or top items with discounts
  const featuredItems = React.useMemo(() => {
    return fabricItems
      .filter(item => item.featured || item.discount > 0)
      .sort((a, b) => {
        // Sort by featured first, then by discount
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.discount - a.discount;
      })
      .slice(0, 8); // Show top 8 featured items
  }, [fabricItems]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying && !isHovered && featuredItems.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % featuredItems.length
        );
      }, 4000); // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovered, featuredItems.length]);

  // Smooth scroll to current item
  useEffect(() => {
    if (scrollContainerRef.current && featuredItems.length > 0) {
      const container = scrollContainerRef.current;
      const itemWidth = 320; // Approximate width of each item
      const scrollPosition = currentIndex * itemWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, featuredItems.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % featuredItems.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Don't render on mobile
  if (isMobile || featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Premium Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our featured fabrics with exclusive discounts and premium quality
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* Slideshow Items */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`flex-shrink-0 w-80 cursor-pointer hover-lift group overflow-hidden animate-scale-in ${
                  index === currentIndex ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => onItemClick(item)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden image-boutique relative">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                        -{item.discount}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif font-semibold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Price and Discount */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary font-serif">
                        ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through font-light">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    {/* Color */}
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground font-medium">Color:</span>
                        <span className="text-sm font-semibold text-primary">{item.color}</span>
                      </div>
                    )}
                    
                    {/* Material */}
                    {item.material && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground font-medium">Material:</span>
                        <span className="text-sm font-semibold text-primary">{item.material}</span>
                      </div>
                    )}

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">Stock:</span>
                      <span className={`text-sm font-semibold ${item.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.stock_quantity > 0 ? `${item.stock_quantity} available` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
