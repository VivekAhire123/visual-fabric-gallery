import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";

interface FabricItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  instagramUrl: string;
  pinterestUrl: string;
  youtubeUrl: string;
}

interface FabricUploadProps {
  onClose: () => void;
  onSubmit: (item: FabricItem) => void;
}

export const FabricUpload = ({ onClose, onSubmit }: FabricUploadProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    image: "",
    instagramUrl: "",
    pinterestUrl: "",
    youtubeUrl: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields (name, description, price, and image)");
      return;
    }

    const newItem: FabricItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount) || 0,
      image: formData.image,
      instagramUrl: formData.instagramUrl,
      pinterestUrl: formData.pinterestUrl,
      youtubeUrl: formData.youtubeUrl,
    };

    onSubmit(newItem);
    toast.success("Fabric item uploaded successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg card-gradient">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Upload Fabric Item</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Fabric Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter fabric name"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount" className="text-sm font-medium">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description *
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the fabric material, texture, and use cases..."
                className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-sm font-medium">
                Fabric Image *
              </Label>
              <div className="mt-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </div>
                  )}
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Media Links</h3>
              
              <div>
                <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram Reel URL
                </Label>
                <Input
                  id="instagram"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                  placeholder="https://instagram.com/reel/..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="pinterest" className="text-sm font-medium flex items-center gap-2">
                  <div className="h-4 w-4 bg-red-500 rounded-sm" />
                  Pinterest URL
                </Label>
                <Input
                  id="pinterest"
                  value={formData.pinterestUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, pinterestUrl: e.target.value }))}
                  placeholder="https://pinterest.com/pin/..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="youtube" className="text-sm font-medium flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube Video URL
                </Label>
                <Input
                  id="youtube"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                Upload Fabric
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};