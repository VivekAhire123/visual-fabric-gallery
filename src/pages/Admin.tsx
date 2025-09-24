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
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Shop
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">Welcome, {profile?.display_name || 'Admin'}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => setIsUploadOpen(true)}
                  className="btn-hero"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Fabric
                </Button>
                
                <Button 
                  onClick={() => setIsCollectionManagementOpen(true)}
                  variant="outline"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Manage Collections
                </Button>
                
                <Button 
                  onClick={() => setIsBannerManagementOpen(true)}
                  variant="outline"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Festival Banners
                </Button>

                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="h-24 text-lg btn-hero"
                size="lg"
              >
                <Upload className="h-6 w-6 mr-3" />
                Upload New Fabric Collection
              </Button>
              
              <Button 
                onClick={() => setIsCollectionManagementOpen(true)}
                variant="outline"
                className="h-24 text-lg"
                size="lg"
              >
                <Package className="h-6 w-6 mr-3" />
                Manage Collections
              </Button>
              
              <Button 
                onClick={() => setIsBannerManagementOpen(true)}
                variant="outline"
                className="h-24 text-lg"
                size="lg"
              >
                <Settings className="h-6 w-6 mr-3" />
                Manage Festival Banners
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
            <p className="text-muted-foreground">
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