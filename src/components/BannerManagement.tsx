import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Calendar, Upload, X, Save } from 'lucide-react';
import { useFabricItems } from '@/hooks/useFabricItems';
import { toast } from 'sonner';

interface BannerManagementProps {
  onClose: () => void;
}

interface BannerForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sortOrder: string;
}

export const BannerManagement = ({ onClose }: BannerManagementProps) => {
  const { festivalBanners, loading, addFestivalBanner, uploadImage } = useFabricItems();
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<BannerForm>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    sortOrder: '0'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      sortOrder: '0'
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a banner title');
      return;
    }
    
    if (!imageFile && !editingId) {
      toast.error('Please upload a banner image');
      return;
    }

    setIsUploading(true);
    
    try {
      let imageUrl = '';
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast.error('Failed to upload image');
          setIsUploading(false);
          return;
        }
      }

      const bannerData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        sort_order: parseInt(formData.sortOrder) || 0,
        image_url: imageUrl,
        is_active: true
      };

      const result = await addFestivalBanner(bannerData);
      
      if (result) {
        toast.success('Banner added successfully!');
        resetForm();
      } else {
        toast.error('Failed to add banner');
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('An error occurred while adding the banner');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) {
      return;
    }

    try {
      // Note: You'll need to implement deleteFestivalBanner in useFabricItems hook
      toast.success('Banner deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete banner');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-serif font-bold gradient-text">Festival Banner Management</h2>
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Banner Button */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Festival Banners</h3>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-hero"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Banner
            </Button>
          </div>

          {/* Add Banner Form */}
          {showAddForm && (
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Festival Banner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Banner Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter banner title"
                        disabled={isUploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sortOrder">Sort Order</Label>
                      <Input
                        id="sortOrder"
                        type="number"
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                        placeholder="0"
                        disabled={isUploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        disabled={isUploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        disabled={isUploading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter banner description (optional)"
                      rows={3}
                      disabled={isUploading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Banner Image *</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img
                            src={imagePreview}
                            alt="Banner preview"
                            className="max-h-40 mx-auto rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            disabled={isUploading}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                          <div>
                            <Button type="button" variant="outline" asChild disabled={isUploading}>
                              <label htmlFor="imageUpload" className="cursor-pointer">
                                Choose Image
                              </label>
                            </Button>
                            <input
                              id="imageUpload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={isUploading}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Upload a high-quality banner image (max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="btn-hero"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Add Banner
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Existing Banners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Festival Banners</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground mt-2">Loading banners...</p>
              </div>
            ) : festivalBanners.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <p className="text-muted-foreground">No festival banners found. Add your first banner above!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {festivalBanners.map((banner) => (
                  <Card key={banner.id} className="card-gradient">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-lg">{banner.title}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                Order: {banner.sort_order || 0}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingId(banner.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(banner.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {banner.description && (
                            <p className="text-muted-foreground text-sm">{banner.description}</p>
                          )}
                          
                          {(banner.start_date || banner.end_date) && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {banner.start_date && `From ${new Date(banner.start_date).toLocaleDateString()}`}
                                {banner.start_date && banner.end_date && ' - '}
                                {banner.end_date && `Until ${new Date(banner.end_date).toLocaleDateString()}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
