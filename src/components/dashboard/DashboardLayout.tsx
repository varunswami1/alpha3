
import { ReactNode, useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "My Garden Dashboard" }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="flex relative pt-16"> {/* Added padding for the fixed navbar */}
        {/* Mobile sidebar toggle */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden fixed bottom-4 right-4 z-40 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <div
          className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-white shadow-md transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64 opacity-100" : "w-0 md:w-64 opacity-0 md:opacity-100"
          } overflow-hidden`}
        >
          <div className="p-6 w-64">
            <h2 className="text-xl font-bold mb-6">Garden App</h2>
            <SidebarNav />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
