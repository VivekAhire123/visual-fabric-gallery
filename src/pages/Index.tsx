import { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricUpload } from "@/components/FabricUpload";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";

interface FabricItem {
  id: string;
  name: string;
  image: string;
  instagramUrl: string;
  pinterestUrl: string;
  youtubeUrl: string;
}

const Index = () => {
  const [fabricItems, setFabricItems] = useState<FabricItem[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);

  const handleUploadSubmit = (item: FabricItem) => {
    setFabricItems(prev => [...prev, item]);
  };

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onUploadClick={() => setIsUploadOpen(true)} />
      
      <FabricGallery 
        items={fabricItems}
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
