import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, ExternalLink } from "lucide-react";

interface FabricItem {
  id: string;
  name: string;
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Fabric Collection</h2>
          <p className="text-muted-foreground text-lg mb-12">
            No fabric items uploaded yet. Start building your collection!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-gradient p-6 hover-lift opacity-50">
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-muted-foreground/20 rounded-full" />
                </div>
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Premium Fabric Collection</h2>
          <p className="text-muted-foreground text-lg">
            Click on any fabric to explore social media content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex flex-wrap gap-2">
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
                
                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Click to explore
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};