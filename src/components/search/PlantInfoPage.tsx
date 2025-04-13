
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { 
  Droplets, 
  Sun, 
  ThermometerSun, 
  ArrowLeft, 
  Sprout, 
  Leaf,
  Ruler,
  Clock,
  Bug,
  ShieldAlert,
  Users,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Sample detailed plant data
const plantInfoData = {
  p1: {
    id: "p1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    type: "Vegetable",
    description: "Tomatoes are one of the most popular garden vegetables. They come in various sizes, colors, and flavors, from small cherry tomatoes to large beefsteak varieties. With proper care, tomato plants can produce abundant harvests throughout the growing season.",
    category: "Fruit (botanically) but used as a vegetable",
    varieties: [
      { name: "Roma", bestFor: "Sauce, paste", description: "Plum-shaped, meaty with few seeds" },
      { name: "Cherry", bestFor: "Salads, snacking", description: "Small, sweet, prolific producer" },
      { name: "Beefsteak", bestFor: "Slicing", description: "Large, meaty fruits ideal for sandwiches" }
    ],
    growingInfo: {
      difficulty: "Easy to Moderate",
      spacing: "24-36 inches",
      depth: "1/4 inch",
      sunlight: "Full sun (6-8 hours daily)",
      season: "Warm season (plant after last frost)",
      water: "1-2 inches per week",
      germination: "5-10 days",
      sprouting: "6-8 weeks to first harvest",
      harvestTime: "70-90 days from transplant",
      frostTolerance: "None (protect from frost)",
      heatTolerance: "Moderate to High",
    },
    growingCalendar: [
      { month: "January", task: "Start seeds indoors in warmer climates" },
      { month: "February", task: "Start seeds indoors in most regions" },
      { month: "March", task: "Continue starting seeds indoors" },
      { month: "April", task: "Harden off seedlings, prepare soil" },
      { month: "May", task: "Transplant outdoors after frost danger" },
      { month: "June", task: "Stake or cage plants, regular watering" },
      { month: "July", task: "Watch for pests, first harvests begin" },
      { month: "August", task: "Peak harvest season" },
      { month: "September", task: "Continue harvesting, save seeds" },
      { month: "October", task: "Final harvests, remove plants" },
      { month: "November", task: "Garden cleanup" },
      { month: "December", task: "Plan for next season" }
    ],
    companionPlants: [
      { name: "Basil", benefit: "Repels insects, improves flavor" },
      { name: "Marigolds", benefit: "Repel nematodes and other pests" },
      { name: "Carrots", benefit: "Break up soil, use different nutrients" }
    ],
    combativePlants: [
      { name: "Potatoes", reason: "Can spread blight to tomatoes" },
      { name: "Corn", reason: "Attracts same pests" },
      { name: "Fennel", reason: "Inhibits tomato growth" }
    ],
    pests: [
      { name: "Tomato Hornworm", description: "Large green caterpillars that devour foliage", control: "Handpick, use Bt spray" },
      { name: "Aphids", description: "Small insects that suck plant sap", control: "Insecticidal soap, natural predators" },
      { name: "Whiteflies", description: "Tiny white insects that damage leaves", control: "Yellow sticky traps, insecticidal soap" }
    ],
    diseases: [
      { name: "Early Blight", symptoms: "Dark spots with concentric rings on lower leaves", prevention: "Crop rotation, adequate spacing" },
      { name: "Late Blight", symptoms: "Water-soaked spots, white fuzzy growth", prevention: "Fungicides, remove infected plants" },
      { name: "Blossom End Rot", symptoms: "Dark, sunken areas at bottom of fruit", prevention: "Consistent watering, calcium supplements" }
    ],
    beneficialCritters: [
      { name: "Ladybugs", benefit: "Consume aphids and other soft-bodied insects" },
      { name: "Bees", benefit: "Pollinate flowers for better fruit set" },
      { name: "Praying Mantis", benefit: "General predator of many garden pests" }
    ],
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  // More plant data would go here in a real application
};

const PlantInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const plant = plantInfoData[id as keyof typeof plantInfoData];
  
  if (!plant) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Plant information not found. The requested plant may not exist.</p>
          <Button variant="outline" asChild className="mt-4">
            <Link to="/plant-search">Back to Plant Search</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/plant-search">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plant Search
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{plant.name}</CardTitle>
                    <CardDescription>{plant.scientificName}</CardDescription>
                  </div>
                  <Badge variant="outline">{plant.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="varieties">Varieties</TabsTrigger>
                    <TabsTrigger value="companions">Companions</TabsTrigger>
                    <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                    <TabsTrigger value="beneficial">Beneficial</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{plant.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Category</h3>
                        <p className="text-sm">{plant.category}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="growing" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Ruler className="h-5 w-5 text-gray-500" />
                            <CardTitle className="text-lg">Planting Specs</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Spacing:</span>
                              <span className="text-sm">{plant.growingInfo.spacing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Depth:</span>
                              <span className="text-sm">{plant.growingInfo.depth}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Difficulty:</span>
                              <span className="text-sm">{plant.growingInfo.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg">Light & Season</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Sunlight:</span>
                              <span className="text-sm">{plant.growingInfo.sunlight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Season:</span>
                              <span className="text-sm">{plant.growingInfo.season}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Timing</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Germination:</span>
                              <span className="text-sm">{plant.growingInfo.germination}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Time to Harvest:</span>
                              <span className="text-sm">{plant.growingInfo.harvestTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Water & Tolerance</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Water Needs:</span>
                              <span className="text-sm">{plant.growingInfo.water}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Frost Tolerance:</span>
                              <span className="text-sm">{plant.growingInfo.frostTolerance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Heat Tolerance:</span>
                              <span className="text-sm">{plant.growingInfo.heatTolerance}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="varieties" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Popular Varieties</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plant.varieties.map((variety, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-medium">{variety.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{variety.description}</p>
                              <div className="mt-2">
                                <span className="text-xs font-medium">Best for: </span>
                                <span className="text-xs">{variety.bestFor}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="companions" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Companion Plants</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.companionPlants.map((companion, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{companion.name}</h4>
                                <p className="text-sm text-muted-foreground">{companion.benefit}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldAlert className="h-5 w-5 text-red-500" />
                          <h3 className="font-medium">Plants to Avoid</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.combativePlants.map((enemy, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{enemy.name}</h4>
                                <p className="text-sm text-muted-foreground">{enemy.reason}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pests" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Bug className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Common Pests</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.pests.map((pest, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{pest.name}</h4>
                                <p className="text-sm text-muted-foreground">{pest.description}</p>
                                <p className="text-sm mt-1"><span className="font-medium">Control: </span>{pest.control}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldAlert className="h-5 w-5 text-red-500" />
                          <h3 className="font-medium">Common Diseases</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.diseases.map((disease, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{disease.name}</h4>
                                <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                                <p className="text-sm mt-1"><span className="font-medium">Prevention: </span>{disease.prevention}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="beneficial" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <h3 className="font-medium">Beneficial Critters</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plant.beneficialCritters.map((critter, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-medium">{critter.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{critter.benefit}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Growing Calendar</CardTitle>
                <CardDescription>Monthly activities for {plant.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {plant.growingCalendar.map((item, index) => (
                      <div key={index} className="flex gap-2 pb-2 border-b last:border-0">
                        <span className="font-medium text-sm w-24">{item.month}</span>
                        <span className="text-sm">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Climate</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.season}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Water Needs</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.water}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Sunlight</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.sunlight}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Time to Harvest</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.harvestTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlantInfoPage;
