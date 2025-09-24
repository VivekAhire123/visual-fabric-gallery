import React, { useState } from "react";
import { FabricUpload } from "@/components/FabricUpload";
import { BannerManagement } from "@/components/BannerManagement";
import { CollectionManagement } from "@/components/CollectionManagement";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Settings, LogOut, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Admin = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBannerManagementOpen, setIsBannerManagementOpen] = useState(false);
  const [isCollectionManagementOpen, setIsCollectionManagementOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const handleUploadSubmit = () => {
    // Refresh will happen automatically through realtime updates
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild className="p-2 sm:px-4">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Shop</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-primary">Admin Panel</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Welcome, {profile?.display_name || 'Admin'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => setIsUploadOpen(true)}
                  className="btn-hero flex-1 sm:flex-none"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Upload Fabric</span>
                  <span className="sm:hidden">Upload</span>
                </Button>
                
                <Button 
                  onClick={() => setIsCollectionManagementOpen(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="sm"
                >
                  <Package className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Manage Collections</span>
                  <span className="sm:hidden">Collections</span>
                </Button>
                
                <Button 
                  onClick={() => setIsBannerManagementOpen(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Festival Banners</span>
                  <span className="sm:hidden">Banners</span>
                </Button>

                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid gap-4 sm:gap-8">
          <div className="bg-card rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="h-16 sm:h-24 text-sm sm:text-lg btn-hero"
                size="lg"
              >
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">
                  Upload New<br className="sm:hidden" /> 
                  <span className="sm:inline">Fabric Collection</span>
                  <span className="sm:hidden">Collection</span>
                </span>
              </Button>
              
              <Button 
                onClick={() => setIsCollectionManagementOpen(true)}
                variant="outline"
                className="h-16 sm:h-24 text-sm sm:text-lg"
                size="lg"
              >
                <Package className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">
                  Manage<br className="sm:hidden" />
                  Collections
                </span>
              </Button>
              
              <Button 
                onClick={() => setIsBannerManagementOpen(true)}
                variant="outline"
                className="h-16 sm:h-24 text-sm sm:text-lg sm:col-span-1 col-span-2"
                size="lg"
              >
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span className="text-center">
                  Manage Festival<br className="sm:hidden" />
                  <span className="sm:inline">Banners</span>
                </span>
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Admin Dashboard</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome to your fabric collection management system. Here you can upload new fabrics, 
              manage categories, and control festival banners displayed on the homepage.
            </p>
          </div>
        </div>
      </main>

        {/* Modals */}
        {isUploadOpen && (
          <FabricUpload
            onClose={() => setIsUploadOpen(false)}
            onSubmit={handleUploadSubmit}
          />
        )}

        {isBannerManagementOpen && (
          <BannerManagement
            onClose={() => setIsBannerManagementOpen(false)}
          />
        )}

        {isCollectionManagementOpen && (
          <CollectionManagement
            onClose={() => setIsCollectionManagementOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Admin;