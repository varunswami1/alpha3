import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, Clock, DollarSign, Sprout } from "lucide-react";

// Sample plant data
const plantsData = [
  {
    id: "1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    description: "A popular garden vegetable that produces juicy red fruits.",
    category: "Vegetable",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "full",
    growthTime: "70-85 days",
    cost: "low",
    companionPlants: ["Basil", "Marigold", "Onion"]
  },
  {
    id: "2",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    description: "An aromatic herb used in cooking, especially in Italian dishes.",
    category: "Herb",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "40-60 days",
    cost: "very low",
    companionPlants: ["Tomato", "Pepper", "Oregano"]
  },
  {
    id: "3",
    name: "Carrot",
    scientificName: "Daucus carota",
    description: "A root vegetable, usually orange in color, though other colors exist.",
    category: "Root",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "60-80 days",
    cost: "very low",
    companionPlants: ["Tomato", "Onion", "Chives"]
  },
  {
    id: "4",
    name: "Sunflower",
    scientificName: "Helianthus annuus",
    description: "Tall plants known for their large, bright yellow flowers and edible seeds.",
    category: "Flower",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "80-120 days",
    cost: "low",
    companionPlants: ["Cucumber", "Corn", "Zucchini"]
  },
  {
    id: "5",
    name: "Blueberry",
    scientificName: "Vaccinium corymbosum",
    description: "A perennial flowering plant that produces berries of a blue color.",
    category: "Fruit",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "2-3 years for full production",
    cost: "high",
    companionPlants: ["Strawberry", "Thyme", "Clover"]
  },
  {
    id: "6",
    name: "Rosemary",
    scientificName: "Salvia rosmarinus",
    description: "An evergreen herb with fragrant, needle-like leaves used in cooking.",
    category: "Herb",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "12-24 months to mature",
    cost: "low",
    companionPlants: ["Sage", "Thyme", "Lavender"]
  },
  {
    id: "7",
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    description: "Sweet peppers that come in various colors like green, red, yellow, and orange.",
    category: "Vegetable",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "full",
    growthTime: "60-90 days",
    cost: "medium",
    companionPlants: ["Tomato", "Basil", "Parsley"]
  },
  {
    id: "8",
    name: "Lavender",
    scientificName: "Lavandula",
    description: "An aromatic perennial plant known for its beautiful purple flowers and calming scent.",
    category: "Flower",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1523379037331-82cbcda55050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "1-3 years to mature",
    cost: "medium",
    companionPlants: ["Rosemary", "Thyme", "Oregano"]
  }
];

interface SearchPlantsListProps {
  category: string;
  searchQuery: string;
  sortOption: string;
}

const SearchPlantsList: React.FC<SearchPlantsListProps> = ({ 
  category, 
  searchQuery,
  sortOption
}) => {
  // Filter plants based on category
  let filteredPlants = category === "all" 
    ? plantsData 
    : plantsData.filter(plant => 
        plant.category.toLowerCase() === category.toLowerCase()
      );
  
  // Filter based on search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPlants = filteredPlants.filter(plant => 
      plant.name.toLowerCase().includes(query) || 
      plant.scientificName.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query)
    );
  }
  
  // Sort plants based on the selected option
  switch (sortOption) {
    case "low-cost":
      filteredPlants = [...filteredPlants].sort((a, b) => {
        const costMap: Record<string, number> = {
          "very low": 1, "low": 2, "medium": 3, "high": 4, "very high": 5
        };
        return (costMap[a.cost] || 3) - (costMap[b.cost] || 3);
      });
      break;
    case "high-cost":
      filteredPlants = [...filteredPlants].sort((a, b) => {
        const costMap: Record<string, number> = {
          "very low": 1, "low": 2, "medium": 3, "high": 4, "very high": 5
        };
        return (costMap[b.cost] || 3) - (costMap[a.cost] || 3);
      });
      break;
    case "easy-grow":
      filteredPlants = [...filteredPlants].sort((a, b) => {
        const difficultyMap: Record<string, number> = {
          "Very Easy": 1, "Easy": 2, "Medium": 3, "Difficult": 4, "Very Difficult": 5
        };
        return (difficultyMap[a.difficulty] || 3) - (difficultyMap[b.difficulty] || 3);
      });
      break;
    // Add other sort options as needed
    default:
      // Keep default order (most relevant)
      break;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlants.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No plants found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        filteredPlants.map(plant => (
          <Link to={`/plant-info/${plant.id}`} key={plant.id}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{plant.name}</h3>
                    <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                  </div>
                  <Badge variant="outline">{plant.category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plant.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs capitalize">{plant.waterNeeds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs capitalize">{plant.sunlightNeeds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-xs">{plant.growthTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-xs capitalize">{plant.cost}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">{plant.difficulty}</Badge>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchPlantsList;
