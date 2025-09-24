import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, ExternalLink } from "lucide-react";

interface FabricItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  instagramUrl: string;
  pinterestUrl: string;
  youtubeUrl: string;
}

interface FabricGalleryProps {
  items: FabricItem[];
  onItemClick: (item: FabricItem) => void;
}

export const FabricGallery = ({ items, onItemClick }: FabricGalleryProps) => {
  if (items.length === 0) {
    return (
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Fabric Collection</h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12">
            No fabric items uploaded yet. Start building your collection!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Placeholder cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-gradient p-4 sm:p-6 hover-lift opacity-50">
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted-foreground/20 rounded-full" />
                </div>
                <div className="h-3 sm:h-4 bg-muted rounded mb-2" />
                <div className="h-2 sm:h-3 bg-muted rounded w-2/3" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Premium Fabric Collection</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tap on any fabric to explore social media content
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="card-gradient cursor-pointer hover-lift group overflow-hidden"
              onClick={() => onItemClick(item)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      ${item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
                    </span>
                    {item.discount > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">
                          -{item.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                  {item.instagramUrl && (
                    <Badge variant="secondary" className="text-xs">
                      <Instagram className="h-3 w-3 mr-1" />
                      Reel
                    </Badge>
                  )}
                  {item.pinterestUrl && (
                    <Badge variant="secondary" className="text-xs">
                      <div className="h-3 w-3 bg-red-500 rounded-sm mr-1" />
                      Pin
                    </Badge>
                  )}
                  {item.youtubeUrl && (
                    <Badge variant="secondary" className="text-xs">
                      <Youtube className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Tap to explore
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};