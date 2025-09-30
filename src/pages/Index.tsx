import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { FeaturedSlideshow } from "@/components/FeaturedSlideshow";
import { FabricItem } from "@/hooks/useFabricItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { isAdmin } = useAuth();
  const isMobile = useIsMobile();

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  const handleFavorite = (item: FabricItem) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item.id)) {
        newFavorites.delete(item.id);
      } else {
        newFavorites.add(item.id);
      }
      return newFavorites;
    });
  };

  const handleShare = (item: FabricItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content' : ''}`}>
      <Hero />
      
      <FeaturedSlideshow 
        onItemClick={handleItemClick}
      />
      
      <FestivalBanners />
      
      <FabricFilterSection />
      
      <FabricGallery 
        onItemClick={handleItemClick}
      />

      {/* Social Media Modal - Both Desktop and Mobile */}
      {selectedItem && (
        <SocialMediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          onSearchClick={() => setShowFilters(true)}
          onFilterClick={() => setShowFilters(true)}
          onWishlistClick={() => setShowFilters(true)}
          wishlistCount={favorites.size}
        />
      )}

      {/* Mobile Filters Modal */}
      {isMobile && showFilters && (
        <EnhancedFilters
          isMobile={true}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Index;
