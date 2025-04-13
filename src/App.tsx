import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Garden from "./pages/Garden";
import PlantProfile from "./components/garden/PlantProfile";
import PlantSearch from "./pages/PlantSearch";
import PlantInfoPage from "./components/search/PlantInfoPage";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Shop from "./pages/Shop";
import PlantRecommendation from "./pages/PlantRecommendation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /> </ProtectedRoute>} />
            <Route path="/garden" element={<ProtectedRoute><Garden /> </ProtectedRoute>} />
            <Route path="/plant/:id" element={<ProtectedRoute><PlantProfile /> </ProtectedRoute>} />
            <Route path="/plant-search" element={<ProtectedRoute><PlantSearch /> </ProtectedRoute>} />
            <Route path="/plant-info/:id" element={<ProtectedRoute><PlantInfoPage /> </ProtectedRoute>} />
            <Route path="/plant-recommendation" element={<ProtectedRoute><PlantRecommendation /> </ProtectedRoute>}/>
            <Route path="/settings" element={<ProtectedRoute><Settings /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /> </ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Shop /> </ProtectedRoute>} />
            <Route path="/shop/:id" element={<ProtectedRoute><Shop /> </ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
