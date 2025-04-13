
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Droplets, Sun, ThermometerSun, AlertTriangle, ArrowLeft, Camera, SprayCan, Sprout, Leaf } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface PlantPhoto {
  id: string;
  url: string;
  date: string;
  caption?: string;
}

const plantData = {
  id: "1",
  name: "Tomato Plant",
  type: "Vegetable",
  scientificName: "Solanum lycopersicum",
  description: "A healthy tomato plant with vibrant green foliage and developing fruit. This variety produces medium-sized, juicy red tomatoes ideal for salads and cooking.",
  images: [
    "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596120236172-231999844ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ],
  health: 85,
  lifeCycleStage: "Fruiting",
  lifeCycleProgress: 65,
  plantedDate: "2023-04-15",
  germinationDate: "2023-04-22",
  floweringDate: "2023-05-20",
  fruitingDate: "2023-06-15",
  harvestDate: "2023-07-30",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2-3 days",
  wateringAmount: "1 inch per week",
  sunlightNeeds: "full",
  sunlightDescription: "6-8 hours of direct sunlight daily",
  soilType: "Well-draining, loamy soil",
  soilpH: "6.0-6.8",
  fertilizingSchedule: "Every 2 weeks during growing season",
  photos: [
    { 
      id: "p1", 
      url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
      date: "2023-04-30",
      caption: "Seedling stage"
    },
    { 
      id: "p2", 
      url: "https://images.unsplash.com/photo-1596120236172-231999844ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
      date: "2023-05-25",
      caption: "First flowers appearing"
    },
    { 
      id: "p3", 
      url: "https://images.unsplash.com/photo-1588105783094-56cee2cc45e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
      date: "2023-06-20",
      caption: "Developing fruits"
    },
  ],
  alerts: [
    {
      id: "a1",
      type: "weather",
      title: "Frost Warning",
      description: "Temperatures expected to drop below freezing tonight. Consider covering or moving your plants indoors.",
      date: "2023-06-02"
    },
    {
      id: "a2",
      type: "disease",
      title: "Powdery Mildew Alert",
      description: "Cases of powdery mildew reported in your area. Inspect leaves regularly and treat preventatively.",
      date: "2023-06-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Removed suckers and lower branches to improve air circulation.",
      date: "2023-05-10"
    },
    {
      id: "n2",
      title: "Fertilizing",
      content: "Applied organic tomato fertilizer.",
      date: "2023-05-25"
    }
  ]
};

// Sample growing calendar data
const growingData = [
  { month: "January", activity: "Plan and purchase seeds" },
  { month: "February", activity: "Start seeds indoors" },
  { month: "March", activity: "Continue indoor growth" },
  { month: "April", activity: "Harden off seedlings, prepare soil" },
  { month: "May", activity: "Transplant outdoors, stake plants" },
  { month: "June", activity: "Regular watering, watch for pests" },
  { month: "July", activity: "Harvest early fruits, continue care" },
  { month: "August", activity: "Peak harvest season" },
  { month: "September", activity: "Continued harvest, prepare for end of season" },
  { month: "October", activity: "Final harvest, remove plants" },
  { month: "November", activity: "Clean up garden beds" },
  { month: "December", activity: "Plan for next season" },
];

const PlantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // In a real app, you would fetch the plant data based on the ID
  // For now, we'll use the sample data
  const plant = plantData;
  
  const getLifecycleProgress = () => {
    const stages = [
      { label: "Germination", date: plant.germinationDate, icon: Sprout },
      { label: "Growth", date: null, icon: Leaf },
      { label: "Flowering", date: plant.floweringDate, icon: Flower },
      { label: "Fruiting", date: plant.fruitingDate, icon: Fruit },
      { label: "Harvest", date: plant.harvestDate, icon: Harvest },
    ];
    
    return (
      <div className="space-y-6 mt-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Lifecycle Progress</span>
            <span className="text-sm font-medium">{plant.lifeCycleProgress}%</span>
          </div>
          <Progress value={plant.lifeCycleProgress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`rounded-full p-2 ${plant.lifeCycleStage === stage.label ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <stage.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{stage.label}</h4>
                  {stage.date && (
                    <span className="text-sm text-muted-foreground">
                      {new Date(stage.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {plant.lifeCycleStage === stage.label && (
                  <p className="text-sm text-muted-foreground">Current stage</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // We'll define these component functions to solve "No Flower export" and similar problems
  const Flower = () => <Leaf className="h-4 w-4" />;
  const Fruit = () => <Droplets className="h-4 w-4" />;
  const Harvest = () => <Sprout className="h-4 w-4" />;
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/garden">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Garden
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
                <Tabs defaultValue="details">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                    <TabsTrigger value="care">Care</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img 
                        src={plant.images[0]} 
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
                        <h3 className="font-medium mb-2">Plant Health</h3>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.health} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{plant.health}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Key Dates</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Planted:</span>
                            <span>{new Date(plant.plantedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Germination:</span>
                            <span>{new Date(plant.germinationDate).toLocaleDateString()}</span>
                          </div>
                          {plant.harvestDate && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expected Harvest:</span>
                              <span>{new Date(plant.harvestDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lifecycle" className="mt-4">
                    {getLifecycleProgress()}
                  </TabsContent>
                  
                  <TabsContent value="care" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Watering</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Frequency:</span>
                              <span className="text-sm">{plant.wateringFrequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Amount:</span>
                              <span className="text-sm">{plant.wateringAmount}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg">Sunlight</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Needs:</span>
                              <span className="text-sm capitalize">{plant.sunlightNeeds} sun</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Description:</span>
                              <span className="text-sm">{plant.sunlightDescription}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sprout className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Soil</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Type:</span>
                              <span className="text-sm">{plant.soilType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">pH:</span>
                              <span className="text-sm">{plant.soilpH}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <SprayCan className="h-5 w-5 text-green-600" />
                            <CardTitle className="text-lg">Fertilizing</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Schedule:</span>
                              <span className="text-sm">{plant.fertilizingSchedule}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="photos" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Plant Journey Photos</h3>
                      <Button size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Add Photo
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {plant.photos.map((photo: PlantPhoto) => (
                        <Card key={photo.id} className="overflow-hidden">
                          <div className="aspect-square">
                            <img 
                              src={photo.url} 
                              alt={`Photo from ${photo.date}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardFooter className="p-2">
                            <div className="w-full">
                              <p className="text-sm truncate">{photo.caption}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(photo.date).toLocaleDateString()}
                              </p>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alerts" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Alerts</h3>
                      
                      {plant.alerts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No active alerts for this plant.</p>
                      ) : (
                        <div className="space-y-2">
                          {plant.alerts.map(alert => (
                            <Card key={alert.id} className="border-l-4 border-l-amber-500">
                              <CardContent className="p-4">
                                <div className="flex gap-2">
                                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                  <div>
                                    <h4 className="font-medium">{alert.title}</h4>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(alert.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Plant Notes</h3>
                        {plant.notes.map(note => (
                          <Card key={note.id} className="mb-2">
                            <CardContent className="p-3">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{note.title}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(note.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{note.content}</p>
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
                <div className="mb-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>
                
                <h4 className="font-medium mb-2">Annual Growing Guide</h4>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {growingData.map((item, index) => (
                      <div key={index} className="flex gap-2 pb-2 border-b last:border-0">
                        <span className="font-medium text-sm w-24">{item.month}</span>
                        <span className="text-sm">{item.activity}</span>
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
                      <p className="text-sm font-medium">Best Temperature</p>
                      <p className="text-sm text-muted-foreground">65-85°F (18-29°C)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Water Needs</p>
                      <p className="text-sm text-muted-foreground">{plant.wateringAmount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Sunlight</p>
                      <p className="text-sm text-muted-foreground">{plant.sunlightDescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Time to Harvest</p>
                      <p className="text-sm text-muted-foreground">70-85 days from transplant</p>
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

export default PlantProfile;
