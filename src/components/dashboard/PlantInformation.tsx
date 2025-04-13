
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flower, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface PlantInfo {
  id: string;
  name: string;
  image: string;
  type: string;
  plantedDate: string;
  nextWatering: string;
}

const plants: PlantInfo[] = [
  {
    id: "1",
    name: "Tomato Plant",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "Vegetable",
    plantedDate: "2023-04-15",
    nextWatering: "Today",
  },
  {
    id: "2",
    name: "Rose Bush",
    image: "https://images.unsplash.com/photo-1496861083958-175bb1bd5702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "Flower",
    plantedDate: "2023-03-10",
    nextWatering: "Tomorrow",
  },
  {
    id: "3",
    name: "Basil",
    image: "https://images.unsplash.com/photo-1627848837484-a2751fc4c474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "Herb",
    plantedDate: "2023-05-02",
    nextWatering: "In 2 days",
  },
];

const PlantInformation = () => {
  return (
    <Card className="h-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Plants</CardTitle>
          <Link to="/my-garden">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <CardDescription>Quick overview of your garden plants</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="flowers">Flowers</TabsTrigger>
            <TabsTrigger value="herbs">Herbs</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {plants.map((plant) => (
              <div key={plant.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                <div className="w-16 h-16 rounded-md overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{plant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flower className="h-3 w-3" />
                    <span>{plant.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Next watering: {plant.nextWatering}
                  </div>
                </div>
                <Link to={`/plant/${plant.id}`}>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="vegetables" className="space-y-4">
            {plants
              .filter((plant) => plant.type === "Vegetable")
              .map((plant) => (
                <div key={plant.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Flower className="h-3 w-3" />
                      <span>{plant.type}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Next watering: {plant.nextWatering}
                    </div>
                  </div>
                  <Link to={`/plant/${plant.id}`}>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="flowers" className="space-y-4">
            {plants
              .filter((plant) => plant.type === "Flower")
              .map((plant) => (
                <div key={plant.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Flower className="h-3 w-3" />
                      <span>{plant.type}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Next watering: {plant.nextWatering}
                    </div>
                  </div>
                  <Link to={`/plant/${plant.id}`}>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="herbs" className="space-y-4">
            {plants
              .filter((plant) => plant.type === "Herb")
              .map((plant) => (
                <div key={plant.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Flower className="h-3 w-3" />
                      <span>{plant.type}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Next watering: {plant.nextWatering}
                    </div>
                  </div>
                  <Link to={`/plant/${plant.id}`}>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlantInformation;
