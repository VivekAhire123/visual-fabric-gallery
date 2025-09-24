import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FabricItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
  instagram_url: string | null;
  pinterest_url: string | null;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useFabricItems = () => {
  const [fabricItems, setFabricItems] = useState<FabricItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFabricItems();
  }, []);

  const fetchFabricItems = async () => {
    try {
      const { data, error } = await supabase
        .from('fabric_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching fabric items:', error);
        toast.error('Failed to load fabric items');
        return;
      }

      setFabricItems(data || []);
    } catch (error) {
      console.error('Error fetching fabric items:', error);
      toast.error('Failed to load fabric items');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('fabric-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast.error('Failed to upload image');
        return null;
      }

      const { data } = supabase.storage
        .from('fabric-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const addFabricItem = async (item: Omit<FabricItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('fabric_items')
        .insert([item])
        .select()
        .single();

      if (error) {
        console.error('Error adding fabric item:', error);
        toast.error('Failed to add fabric item');
        return null;
      }

      setFabricItems(prev => [data, ...prev]);
      toast.success('Fabric item added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding fabric item:', error);
      toast.error('Failed to add fabric item');
      return null;
    }
  };

  return {
    fabricItems,
    loading,
    addFabricItem,
    uploadImage,
    refetch: fetchFabricItems
  };
};