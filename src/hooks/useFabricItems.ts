import React, { useState, useEffect } from "react";
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
  other_link: string | null;
  category: string;
  featured: boolean;
  stock_quantity: number;
  fabric_type: string | null;
  color: string | null;
  pattern: string | null;
  material: string | null;
  created_at: string;
  updated_at: string;
}

export interface FabricCategory {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface FestivalBanner {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  sort_order: number;
}

export interface FabricFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  material?: string;
  featured?: boolean;
  searchQuery?: string;
}

export const useFabricItems = () => {
  const [fabricItems, setFabricItems] = useState<FabricItem[]>([]);
  const [categories, setCategories] = useState<FabricCategory[]>([]);
  const [festivalBanners, setFestivalBanners] = useState<FestivalBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FabricFilters>({});

  useEffect(() => {
    fetchData();
    setupRealtimeSubscriptions();
  }, []);

  useEffect(() => {
    fetchFabricItems();
  }, [filters]);

  const setupRealtimeSubscriptions = () => {
    const channel = supabase
      .channel('fabric-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fabric_items'
        },
        () => fetchFabricItems()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fabric_categories'
        },
        () => fetchCategories()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'festival_banners'
        },
        () => fetchFestivalBanners()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchData = async () => {
    await Promise.all([
      fetchFabricItems(),
      fetchCategories(),
      fetchFestivalBanners()
    ]);
  };

  const fetchFabricItems = async () => {
    try {
      let query = supabase
        .from('fabric_items')
        .select('*');

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters.color) {
        query = query.ilike('color', `%${filters.color}%`);
      }
      
      if (filters.material) {
        query = query.ilike('material', `%${filters.material}%`);
      }
      
      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }
      
      if (filters.searchQuery) {
        query = query.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
      }

      // Order by: featured first, then by discount (top offers), then by creation date
      query = query.order('featured', { ascending: false })
                   .order('discount', { ascending: false })
                   .order('created_at', { ascending: false });

      const { data, error } = await query;

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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('fabric_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFestivalBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('festival_banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching festival banners:', error);
        return;
      }

      setFestivalBanners(data || []);
    } catch (error) {
      console.error('Error fetching festival banners:', error);
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

      toast.success('Fabric item added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding fabric item:', error);
      toast.error('Failed to add fabric item');
      return null;
    }
  };

  const addFestivalBanner = async (banner: Omit<FestivalBanner, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('festival_banners')
        .insert([banner])
        .select()
        .single();

      if (error) {
        console.error('Error adding festival banner:', error);
        toast.error('Failed to add festival banner');
        return null;
      }

      toast.success('Festival banner added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding festival banner:', error);
      toast.error('Failed to add festival banner');
      return null;
    }
  };

  const updateFabricItem = async (id: string, updates: Partial<FabricItem>) => {
    try {
      const { data, error } = await supabase
        .from('fabric_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating fabric item:', error);
        toast.error('Failed to update fabric item');
        return null;
      }

      toast.success('Fabric item updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating fabric item:', error);
      toast.error('Failed to update fabric item');
      return null;
    }
  };

  const deleteFabricItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('fabric_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting fabric item:', error);
        toast.error('Failed to delete fabric item');
        return false;
      }

      toast.success('Fabric item deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting fabric item:', error);
      toast.error('Failed to delete fabric item');
      return false;
    }
  };

  const updateFestivalBanner = async (id: string, updates: Partial<FestivalBanner>) => {
    try {
      const { data, error } = await supabase
        .from('festival_banners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating festival banner:', error);
        toast.error('Failed to update festival banner');
        return null;
      }

      toast.success('Festival banner updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating festival banner:', error);
      toast.error('Failed to update festival banner');
      return null;
    }
  };

  const deleteFestivalBanner = async (id: string) => {
    try {
      const { error } = await supabase
        .from('festival_banners')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting festival banner:', error);
        toast.error('Failed to delete festival banner');
        return false;
      }

      toast.success('Festival banner deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting festival banner:', error);
      toast.error('Failed to delete festival banner');
      return false;
    }
  };

  const updateFilters = (newFilters: Partial<FabricFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    fabricItems,
    categories,
    festivalBanners,
    loading,
    filters,
    addFabricItem,
    addFestivalBanner,
    updateFabricItem,
    deleteFabricItem,
    updateFestivalBanner,
    deleteFestivalBanner,
    uploadImage,
    updateFilters,
    clearFilters,
    refetch: fetchData,
  };
};