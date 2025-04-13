
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PlantsList from "@/components/garden/PlantsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddPlantForm from "@/components/garden/AddPlantForm";

const Garden = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);

  return (
    <DashboardLayout title="My Garden">
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <Dialog open={isAddPlantOpen} onOpenChange={setIsAddPlantOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-10">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Plant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Plant</DialogTitle>
                </DialogHeader>
                <AddPlantForm onSuccess={() => setIsAddPlantOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Plants</TabsTrigger>
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="flowers">Flowers</TabsTrigger>
            <TabsTrigger value="herbs">Herbs</TabsTrigger>
            <TabsTrigger value="fruits">Fruits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <PlantsList category="all" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="vegetables" className="mt-0">
            <PlantsList category="Vegetable" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="flowers" className="mt-0">
            <PlantsList category="Flower" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="herbs" className="mt-0">
            <PlantsList category="Herb" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="fruits" className="mt-0">
            <PlantsList category="Fruit" searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Garden;
