import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Edit, Trash2, Package, Search, Upload } from "lucide-react";
import { useFabricItems } from "@/hooks/useFabricItems";
import { toast } from "sonner";

interface CollectionManagementProps {
  onClose: () => void;
}

interface FabricItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  material: string | null;
  color: string | null;
  pattern: string | null;
  stock_quantity: number;
  featured: boolean;
  image_url: string;
  instagram_url: string | null;
  pinterest_url: string | null;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
}

export const CollectionManagement = ({ onClose }: CollectionManagementProps) => {
  const { fabricItems, loading, updateFabricItem, deleteFabricItem, categories, uploadImage } = useFabricItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<FabricItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const filteredItems = fabricItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: FabricItem) => {
    setEditingItem(item);
    setImagePreview(item.image_url);
    setImageFile(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsUpdating(true);
    try {
      let imageUrl = editingItem.image_url;
      
      // Upload new image if selected
      if (imageFile) {
        const newImageUrl = await uploadImage(imageFile);
        if (newImageUrl) {
          imageUrl = newImageUrl;
        }
      }

      const updated = await updateFabricItem(editingItem.id, {
        ...editingItem,
        image_url: imageUrl
      });

      if (updated) {
        toast.success('Fabric item updated successfully!');
        setEditingItem(null);
        setImageFile(null);
        setImagePreview("");
      }
    } catch (error) {
      console.error('Error updating fabric item:', error);
      toast.error('Failed to update fabric item');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const deleted = await deleteFabricItem(id);
      if (deleted) {
        toast.success('Fabric item deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting fabric item:', error);
      toast.error('Failed to delete fabric item');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-white">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] card-gradient flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 flex-shrink-0 p-4 sm:p-6">
          <div>
            <CardTitle className="font-serif text-xl sm:text-2xl font-bold gradient-text flex items-center gap-2">
              <Package className="h-6 w-6" />
              Manage Collections
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Edit and manage your fabric collection</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted/50 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6">
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No items found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or add new items</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="card-gradient overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.featured && (
                        <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <span className="font-bold text-primary">₹{item.price}</span>
                          {item.discount > 0 && (
                            <span className="text-xs text-green-600 ml-1">({item.discount}% off)</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id, item.name)}
                            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Stock: {item.stock_quantity} • {item.category}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-2">
            <Card className="w-full max-w-2xl max-h-[90vh] card-gradient flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 flex-shrink-0">
                <CardTitle className="font-serif text-lg font-bold gradient-text">Edit Fabric</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingItem(null)}
                  className="hover:bg-muted/50 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Fabric Name</Label>
                      <Input
                        id="edit-name"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <select
                        id="edit-category"
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="input-boutique w-full"
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        step="0.01"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-discount">Discount (%)</Label>
                      <Input
                        id="edit-discount"
                        type="number"
                        value={editingItem.discount}
                        onChange={(e) => setEditingItem({...editingItem, discount: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-material">Material</Label>
                      <Input
                        id="edit-material"
                        value={editingItem.material || ""}
                        onChange={(e) => setEditingItem({...editingItem, material: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-color">Color</Label>
                      <Input
                        id="edit-color"
                        value={editingItem.color || ""}
                        onChange={(e) => setEditingItem({...editingItem, color: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <textarea
                      id="edit-description"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      className="input-boutique min-h-[80px] resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Update Image</Label>
                    <div className="flex items-center gap-4">
                      <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                      <Input
                        id="edit-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="edit-featured"
                      checked={editingItem.featured}
                      onChange={(e) => setEditingItem({...editingItem, featured: e.target.checked})}
                    />
                    <Label htmlFor="edit-featured">Mark as Featured</Label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingItem(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 btn-hero" 
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};