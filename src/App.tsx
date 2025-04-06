
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Garden from "./pages/Garden";
import PlantProfile from "./components/garden/PlantProfile";
import PlantSearch from "./pages/PlantSearch";
import PlantInfoPage from "./components/search/PlantInfoPage";
import Camera from "./pages/Camera";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/plant/:id" element={<PlantProfile />} />
          <Route path="/plant-search" element={<PlantSearch />} />
          <Route path="/plant-info/:id" element={<PlantInfoPage />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
