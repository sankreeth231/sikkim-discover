import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Hotels from "./pages/Hotels";
import Places from "./pages/Places";
import ViewPoints from "./pages/ViewPoints";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "@/components/AppSidebar";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-lotus-bloom">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            } />
            <Route path="/hotels" element={
              <ProtectedRoute>
                <AppLayout>
                  <Hotels />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/places" element={
              <ProtectedRoute>
                <AppLayout>
                  <Places />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/viewpoints" element={
              <ProtectedRoute>
                <AppLayout>
                  <ViewPoints />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/tourist-spots" element={
              <ProtectedRoute>
                <AppLayout>
                  <Places />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/monasteries" element={
              <ProtectedRoute>
                <AppLayout>
                  <Places />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/nature" element={
              <ProtectedRoute>
                <AppLayout>
                  <Places />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/festivals" element={
              <ProtectedRoute>
                <AppLayout>
                  <Places />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-6">Favorites coming soon...</div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-6">Admin Panel coming soon...</div>
                </AppLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
