import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricFilterSection } from "@/components/FabricFilters";
import { FabricItem } from "@/hooks/useFabricItems";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <FestivalBanners />
      
      <FabricFilterSection />
      
      <FabricGallery 
        onItemClick={handleItemClick}
      />

      {selectedItem && (
        <SocialMediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Index;
