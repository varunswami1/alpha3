import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, List } from "lucide-react";

const LearningResources = () => {
  const [activeTab, setActiveTab] = useState("videos");

  const videos = [
    {
      id: 1,
      title: "Getting Started with Gardening",
      thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2942&auto=format&fit=crop",
      duration: "15 min",
      description: "Learn the basics of setting up your first garden."
    },
    {
      id: 2,
      title: "Seasonal Planting Guide",
      thumbnail: "https://images.unsplash.com/photo-1557844352-761f2565b576?q=80&w=2940&auto=format&fit=crop",
      duration: "12 min",
      description: "Understand what to plant during different seasons."
    },
    {
      id: 3,
      title: "Organic Pest Control",
      thumbnail: "https://images.unsplash.com/photo-1599685315640-9ceec5d4f0cf?q=80&w=2942&auto=format&fit=crop",
      duration: "18 min",
      description: "Natural ways to keep pests away from your garden."
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Complete Beginner's Guide",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2940&auto=format&fit=crop",
      steps: [
        "Choose the right location",
        "Prepare your soil",
        "Select appropriate plants",
        "Establish a watering routine",
        "Learn basic maintenance"
      ]
    },
    {
      id: 2,
      title: "Vegetable Garden Guide",
      image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2940&auto=format&fit=crop",
      steps: [
        "Plan your vegetable layout",
        "Understand companion planting",
        "Implement crop rotation",
        "Learn to harvest correctly",
        "Extend your growing season"
      ]
    }
  ];

  const essentials = [
    "Garden gloves",
    "Pruning shears",
    "Garden trowel",
    "Watering can",
    "Garden fork",
    "Wheelbarrow",
    "Garden hose with adjustable nozzle",
    "Garden rake",
    "Compost bin",
    "Plant labels"
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Guides</span>
          </TabsTrigger>
          <TabsTrigger value="essentials" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Essentials</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => (
              <Card key={video.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative group">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription className="mt-2">{video.description}</CardDescription>
                  <div className="text-sm text-muted-foreground mt-2">Duration: {video.duration}</div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" /> Watch Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(guide => (
              <Card key={guide.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription className="mt-2">Follow these steps to get started</CardDescription>
                  <ol className="list-decimal list-inside space-y-2 mt-4">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" /> Read Full Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="essentials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gardening Essentials</CardTitle>
              <CardDescription>Basic tools and materials every gardener should have</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {essentials.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Printable Checklist
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningResources;
