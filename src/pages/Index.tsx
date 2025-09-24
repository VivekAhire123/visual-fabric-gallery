import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricUpload } from "@/components/FabricUpload";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricFilterSection } from "@/components/FabricFilters";
import { AdminPanel } from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { FabricItem } from "@/hooks/useFabricItems";

const Index = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);

  const handleUploadSubmit = () => {
    // Refresh will happen automatically through realtime updates
  };

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Button - Fixed position */}
      <Button
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-4 right-4 z-40 btn-hero"
        size="sm"
      >
        <Settings className="h-4 w-4 mr-2" />
        Admin
      </Button>

      <Hero onUploadClick={() => setIsUploadOpen(true)} />
      
      <FestivalBanners />
      
      <FabricFilterSection />
      
      <FabricGallery 
        onItemClick={handleItemClick}
      />

      {isUploadOpen && (
        <FabricUpload
          onClose={() => setIsUploadOpen(false)}
          onSubmit={handleUploadSubmit}
        />
      )}

      {isAdminOpen && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
        />
      )}

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
