import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, ZoomOut, RotateCcw, Share2, Heart, ExternalLink } from "lucide-react";
import { FabricItem } from "@/hooks/useFabricItems";

interface MobileImageGalleryProps {
  item: FabricItem;
  onClose: () => void;
  onShare?: (item: FabricItem) => void;
  onFavorite?: (item: FabricItem) => void;
  isFavorite?: boolean;
}

export const MobileImageGallery = ({ 
  item, 
  onClose, 
  onShare, 
  onFavorite, 
  isFavorite = false 
}: MobileImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Mock multiple images for demonstration
  const images = [
    item.image_url,
    // You can add more images here when you have multiple angles
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isZoomed) {
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const isLeftSwipe = deltaX > 50;
    const isRightSwipe = deltaX < -50;
    const isUpSwipe = deltaY > 50;
    const isDownSwipe = deltaY < -50;

    if (isLeftSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe left - next image
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe right - previous image
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (isUpSwipe && Math.abs(deltaY) > Math.abs(deltaX)) {
      // Swipe up - zoom in
      handleZoomIn();
    } else if (isDownSwipe && Math.abs(deltaY) > Math.abs(deltaX)) {
      // Swipe down - zoom out
      handleZoomOut();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setIsZoomed(false);
      }
      return newZoom;
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
    setIsZoomed(false);
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleImageClick = () => {
    if (zoomLevel === 1) {
      handleZoomIn();
    } else {
      handleReset();
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(item);
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href,
        });
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
      }
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(item);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-semibold text-lg truncate">{item.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-accent font-bold text-lg">
                ₹{item.discount > 0 ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price.toFixed(2)}
              </span>
              {item.discount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  -{item.discount}%
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex items-center justify-center h-full pt-20 pb-24">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            ref={imageRef}
            src={images[currentImageIndex]}
            alt={item.name}
            className={`max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer ${
              isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
            }`}
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              touchAction: isZoomed ? 'none' : 'pan-x pan-y',
            }}
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            draggable={false}
          />
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="p-4">
          {/* Zoom Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRotate}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="h-5 w-5 rotate-180" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={`text-white hover:bg-white/20 ${
                isFavorite ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-white hover:bg-white/20"
            >
              <Share2 className="h-6 w-6" />
            </Button>
            
            {item.instagram_url && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(item.instagram_url, '_blank')}
                className="text-white hover:bg-white/20"
              >
                <ExternalLink className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Swipe Instructions */}
          <div className="text-center mt-4">
            <p className="text-white/70 text-xs">
              Swipe left/right to navigate • Swipe up to zoom • Tap to zoom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
