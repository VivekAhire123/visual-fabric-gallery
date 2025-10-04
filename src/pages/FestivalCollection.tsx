import React, { useState } from "react";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FabricFilterSection } from "@/components/FabricFilters";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { EnhancedFilters } from "@/components/EnhancedFilters";
import { SEOContent } from "@/components/SEOContent";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricItem } from "@/hooks/useFabricItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageSEO } from "@/components/PageSEO";

const FestivalCollection = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites] = useState(new Set<string>());
  const isMobile = useIsMobile();

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'mobile-content' : ''}`}>
      <PageSEO 
        title="Festival Collection | Surat Kapad Festival Fabrics"
        description="Discover our exclusive festival collection of Surat Kapad fabrics. Perfect materials for Navratri, Diwali, and all Gujarati festivals."
        keywords="festival fabrics, Surat Kapad festival, Navratri fabrics, Diwali fabrics, Gujarati festival textiles, celebration fabrics"
        canonicalUrl="https://tata-matching-center.vercel.app/festival-collection"
      />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Festival Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive festival collection of Surat Kapad fabrics. 
            Perfect materials for Navratri, Diwali, and all Gujarati festivals.
          </p>
        </div>
      </div>

      {/* Festival Banners */}
      <div className="py-8">
        <FestivalBanners />
      </div>

      {/* Fabric Filters - Pre-filtered for Festival */}
      <div className="py-8">
        <FabricFilterSection 
          defaultFilter="festival"
        />
      </div>
      
      {/* Fabric Gallery */}
      <div className="py-8">
        <FabricGallery 
          onItemClick={handleItemClick}
          filterType="festival"
        />
      </div>

      {/* SEO Content Section */}
      <SEOContent />

      {/* Social Media Modal */}
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
          defaultFilter="festival"
        />
      )}
    </div>
  );
};

export default FestivalCollection;
