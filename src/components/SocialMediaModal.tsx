import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Instagram, ExternalLink, Link } from "lucide-react";
import { FabricItem } from "@/hooks/useFabricItems";
import { PinterestImageModal } from "./PinterestImageModal";

interface SocialMediaModalProps {
  item: FabricItem;
  onClose: () => void;
}

const getYouTubeEmbedId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getInstagramEmbedCode = (url: string) => {
  // Extract Instagram post ID from URL
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/]+)/);
  return match ? match[1] : null;
};

export const SocialMediaModal = ({ item, onClose }: SocialMediaModalProps) => {
  const [pinterestModalOpen, setPinterestModalOpen] = useState(false);
  const instagramId = item.instagram_url ? getInstagramEmbedCode(item.instagram_url) : null;

  const openSocialMediaApp = (appUrl: string, webUrl: string) => {
    const link = document.createElement('a');
    link.href = appUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto card-gradient">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold truncate">{item.name}</CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">Social Media Content</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg sm:text-xl font-bold text-primary">
                ${item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
              </span>
              {item.discount > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.price.toFixed(2)}
                  </span>
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{item.discount}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Fabric Image and Description */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Product Image</h3>
                <div className="aspect-square rounded-xl overflow-hidden shadow-medium">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Content</h3>
                <div className="space-y-3 sm:space-y-4">
                  
                  {/* Instagram Reel */}
                  {item.instagram_url && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Instagram className="h-4 w-4 mr-1" />
                          Instagram Reel
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => {
                            const appUrl = `instagram://media?id=${getInstagramEmbedCode(item.instagram_url!)}`;
                            const webUrl = item.instagram_url!;
                            
                            // Try to open in Instagram app first
                            const link = document.createElement('a');
                            link.href = appUrl;
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            // Fallback to web version after a short delay
                            setTimeout(() => {
                              window.open(webUrl, '_blank', 'noopener,noreferrer');
                            }, 1000);
                          }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap to view the Instagram reel
                      </div>
                    </div>
                  )}

                  {/* Pinterest */}
                  {item.pinterest_url && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-red-600">
                          <div className="h-4 w-4 bg-white rounded-sm mr-1" />
                          Pinterest
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setPinterestModalOpen(true)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            View Image
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openSocialMediaApp(
                              `pinterest://pin/${item.pinterest_url!.split('/').pop()}`,
                              item.pinterest_url!
                            )}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        View this fabric on Pinterest for inspiration
                      </div>
                     </div>
                   )}

                   {/* Other Link */}
                  {item.other_link && (
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gray-600">
                          <Link className="h-4 w-4 mr-1" />
                          Other Link
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => window.open(item.other_link!, '_blank', 'noopener,noreferrer')}
                          className="bg-gray-600 hover:bg-gray-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Visit external link
                      </div>
                    </div>
                  )}

                  {!item.instagram_url && !item.pinterest_url && !item.other_link && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No social media content available for this fabric.</p>
                      <p className="text-sm mt-2">Add links when uploading to showcase your content!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pinterest Image Modal */}
      <PinterestImageModal
        isOpen={pinterestModalOpen}
        onClose={() => setPinterestModalOpen(false)}
        imageUrl={item.image_url}
        title={item.name}
        pinterestUrl={item.pinterest_url || ''}
      />
    </div>
  );
};