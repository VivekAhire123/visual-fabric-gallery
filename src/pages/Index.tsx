import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { FabricGallery } from "@/components/FabricGallery";
import { SocialMediaModal } from "@/components/SocialMediaModal";
import { FestivalBanners } from "@/components/FestivalBanners";
import { FabricFilterSection } from "@/components/FabricFilters";
import { FabricItem } from "@/hooks/useFabricItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<FabricItem | null>(null);
  const { isAdmin } = useAuth();

  const handleItemClick = (item: FabricItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-40">
        {isAdmin ? (
          <Button asChild className="btn-hero">
            <Link to="/admin">
              <Settings className="h-4 w-4 mr-2" />
              Admin Panel
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/auth">
              <Settings className="h-4 w-4 mr-2" />
              Admin Login
            </Link>
          </Button>
        )}
      </div>

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
