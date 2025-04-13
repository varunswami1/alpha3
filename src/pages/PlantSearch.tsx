
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  Droplets, 
  Sun, 
  Clock,
  DollarSign,
  Sprout,
  Leaf 
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import SearchPlantsList from "@/components/search/SearchPlantsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PlantFilterDialog from "@/components/search/PlantFilterDialog";

const PlantSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");

  return (
    <DashboardLayout title="Search Plants">
      <div className="w-full space-y-6">
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Recommendations are personalized based on your location, climate conditions, garden space, and available time.
          </p>
        </Card>

        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for plants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Filter Plants</DialogTitle>
                </DialogHeader>
                <PlantFilterDialog onClose={() => setIsFilterOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] h-10">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-3 w-3" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="low-cost">Cost: Low to High</SelectItem>
                <SelectItem value="high-cost">Cost: High to Low</SelectItem>
                <SelectItem value="easy-grow">Easiest to Grow</SelectItem>
                <SelectItem value="fast-grow">Fastest Growing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Plants</TabsTrigger>
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="flowers">Flowers</TabsTrigger>
            <TabsTrigger value="herbs">Herbs</TabsTrigger>
            <TabsTrigger value="fruits">Fruits</TabsTrigger>
            <TabsTrigger value="root">Root</TabsTrigger>
            <TabsTrigger value="stem">Stem</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <SearchPlantsList category="all" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="vegetables" className="mt-0">
            <SearchPlantsList category="Vegetable" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="flowers" className="mt-0">
            <SearchPlantsList category="Flower" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="herbs" className="mt-0">
            <SearchPlantsList category="Herb" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="fruits" className="mt-0">
            <SearchPlantsList category="Fruit" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="root" className="mt-0">
            <SearchPlantsList category="Root" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
          
          <TabsContent value="stem" className="mt-0">
            <SearchPlantsList category="Stem" searchQuery={searchQuery} sortOption={sortOption} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PlantSearch;
