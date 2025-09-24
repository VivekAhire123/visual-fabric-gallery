import { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricUpload } from "@/components/FabricUpload";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FabricItem } from "@/hooks/useFabricItems";

const Index = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);

  const handleUploadSubmit = () => {
    // Refresh will happen automatically through the hook
  };

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onUploadClick={() => setIsUploadOpen(true)} />
      
      <FabricGallery 
        onItemClick={handleItemClick}
      />

      {isUploadOpen && (
        <FabricUpload
          onClose={() => setIsUploadOpen(false)}
          onSubmit={handleUploadSubmit}
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
