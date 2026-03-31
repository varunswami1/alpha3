
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Sun, Thermometer } from "lucide-react";

interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  health: number;
  lifeCycleStage: string;
  plantedDate: string;
  harvestDate?: string;
  wateringNeeds: "low" | "medium" | "high";
  sunlightNeeds: "full" | "partial" | "shade";
}

// Sample plant data (in a real app, this would come from an API or database)
const plantsData: Plant[] = [
  {
    id: "1",
    name: "Tomato Plant",
    type: "Vegetable",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    health: 85,
    lifeCycleStage: "Fruiting",
    plantedDate: "2024-04-15",
    harvestDate: "2024-07-30",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "2",
    name: "Rose Bush",
    type: "Flower",
    image: "https://images.unsplash.com/photo-1496861083958-175bb1bd5702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    health: 92,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-03-10",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "3",
    name: "Basil",
    type: "Herb",
    image: "/images/others/basil.jpeg",
    health: 70,
    lifeCycleStage: "Mature",
    plantedDate: "2024-05-02",
    wateringNeeds: "high",
    sunlightNeeds: "partial",
  },
  {
    id: "4",
    name: "Apple Tree",
    type: "Fruit",
    image: "/images/others/apple tree.jpeg",
    health: 95,
    lifeCycleStage: "Fruiting",
    plantedDate: "2024-10-15",
    harvestDate: "2025-09-20",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "5",
    name: "Aloe Vera",
    type: "Succulent",
    image: "/images/searchimages/aloe.jpeg",
    health: 95,
    lifeCycleStage: "Growth",
    plantedDate: "2024-01-10",
    wateringNeeds: "low",
    sunlightNeeds: "partial",
  },
  {
    id: "6",
    name: "Money Plant",
    type: "Indoor",
    image: "/images/searchimages/money-plant.jpeg",
    health: 90,
    lifeCycleStage: "Growth",
    plantedDate: "2024-02-05",
    wateringNeeds: "low",
    sunlightNeeds: "partial",
  },
  {
    id: "7",
    name: "Tulsi",
    type: "Medicinal",
    image: "/images/searchimages/tulsi.jpeg",
    health: 92,
    lifeCycleStage: "Growth",
    plantedDate: "2024-03-01",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "8",
    name: "Neem Tree",
    type: "Medicinal",
    image: "/images/searchimages/neem.jpeg",
    health: 94,
    lifeCycleStage: "Growth",
    plantedDate: "2023-06-15",
    wateringNeeds: "low",
    sunlightNeeds: "full",
  },
  {
    id: "9",
    name: "Orchid",
    type: "Flower",
    image: "/images/searchimages/orchid.jpeg",
    health: 87,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-01-20",
    wateringNeeds: "low",
    sunlightNeeds: "partial",
  },
  {
    id: "10",
    name: "Lavender",
    type: "Flower",
    image: "/images/searchimages/lavender.jpeg",
    health: 91,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-02-15",
    wateringNeeds: "low",
    sunlightNeeds: "full",
  },
  {
    id: "11",
    name: "Sunflower",
    type: "Flower",
    image: "/images/searchimages/sunflower.jpeg",
    health: 93,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-03-10",
    harvestDate: "2024-07-10",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "12",
    name: "Cactus",
    type: "Succulent",
    image: "/images/searchimages/cactus.jpeg",
    health: 97,
    lifeCycleStage: "Growth",
    plantedDate: "2024-01-05",
    wateringNeeds: "low",
    sunlightNeeds: "full",
  },
  {
    id: "13",
    name: "Snake Plant",
    type: "Indoor",
    image: "/images/searchimages/snake-plant.jpeg",
    health: 96,
    lifeCycleStage: "Growth",
    plantedDate: "2024-01-12",
    wateringNeeds: "low",
    sunlightNeeds: "partial",
  },
  {
    id: "14",
    name: "Strawberry",
    type: "Fruit",
    image: "/images/searchimages/strawberry.jpeg",
    health: 89,
    lifeCycleStage: "Fruiting",
    plantedDate: "2024-02-20",
    harvestDate: "2024-06-01",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "15",
    name: "Hibiscus",
    type: "Flower",
    image: "/images/searchimages/hibiscus.jpeg",
    health: 91,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-02-01",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "16",
    name: "Banana Plant",
    type: "Fruit",
    image: "/images/searchimages/banana.jpeg",
    health: 93,
    lifeCycleStage: "Growth",
    plantedDate: "2023-07-10",
    harvestDate: "2024-08-20",
    wateringNeeds: "high",
    sunlightNeeds: "full",
  },
  {
    id: "17",
    name: "Mango Tree",
    type: "Fruit",
    image: "/images/searchimages/mango.jpeg",
    health: 94,
    lifeCycleStage: "Fruiting",
    plantedDate: "2022-06-15",
    harvestDate: "2024-06-25",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "18",
    name: "Coriander",
    type: "Herb",
    image: "/images/searchimages/coriander.jpeg",
    health: 89,
    lifeCycleStage: "Growth",
    plantedDate: "2024-03-10",
    wateringNeeds: "medium",
    sunlightNeeds: "partial",
  },
  {
    id: "19",
    name: "Marigold",
    type: "Flower",
    image: "/images/searchimages/marigold.jpeg",
    health: 92,
    lifeCycleStage: "Flowering",
    plantedDate: "2024-02-25",
    wateringNeeds: "medium",
    sunlightNeeds: "full",
  },
  {
    id: "20",
    name: "Spinach",
    type: "Vegetable",
    image: "/images/searchimages/spinach.jpeg",
    health: 90,
    lifeCycleStage: "Growth",
    plantedDate: "2024-03-01",
    harvestDate: "2024-04-10",
    wateringNeeds: "medium",
    sunlightNeeds: "partial",
  }
];

interface PlantsListProps {
  category: string;
  searchQuery: string;
}

const PlantsList: React.FC<PlantsListProps> = ({ category, searchQuery }) => {
  // Filter plants based on category and search query
  const filteredPlants = plantsData.filter((plant) => {
    const matchesCategory = category === "all" || plant.type.toLowerCase() === category.toLowerCase();
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getHealthColor = (health: number) => {
    if (health >= 80) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getWateringIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Droplets className="h-4 w-4 text-blue-400" />;
      case "medium":
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case "high":
        return <Droplets className="h-4 w-4 text-blue-600" />;
      default:
        return <Droplets className="h-4 w-4" />;
    }
  };

  const getSunlightIcon = (level: string) => {
    switch (level) {
      case "full":
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case "partial":
        return <Sun className="h-4 w-4 text-yellow-400" />;
      case "shade":
        return <Sun className="h-4 w-4 text-gray-400" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  if (filteredPlants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No plants found. Try adjusting your search or add a new plant.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlants.map((plant) => (
        <Link to={`/plant/${plant.id}`} key={plant.id} className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="h-full w-full object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 right-2">{plant.type}</Badge>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{plant.name}</h3>
                <Badge variant="outline">{plant.lifeCycleStage}</Badge>
              </div>
              
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Plant Health</span>
                    <span className="text-sm font-medium">{plant.health}%</span>
                  </div>
                  <Progress value={plant.health} className="h-2" />
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1" title="Watering needs">
                    {getWateringIcon(plant.wateringNeeds)}
                  </div>
                  <div className="flex items-center gap-1" title="Sunlight needs">
                    {getSunlightIcon(plant.sunlightNeeds)}
                  </div>
                  <div className="flex items-center gap-1" title="Plant health">
                    <Thermometer className={`h-4 w-4 ${plant.health >= 80 ? 'text-green-500' : plant.health >= 60 ? 'text-yellow-500' : 'text-red-500'}`} />
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Planted: {new Date(plant.plantedDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PlantsList;
