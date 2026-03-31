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
      thumbnail: "https://i.ytimg.com/vi/BO8yuSTc3fo/maxresdefault.jpg",
      duration: "11 min",
      description: "Learn the basics of setting up your first garden.",
      videoId: "BO8yuSTc3fo"
    },
    {
      id: 2,
      title: "Seasonal Planting Guide",
      thumbnail: "https://i.ytimg.com/vi/1HtBMfbJ_nY/maxresdefault.jpg",
      duration: "21 min",
      description: "Understand what to plant during different seasons.",
      videoId: "1HtBMfbJ_nY"
    },
    {
      id: 3,
      title: "Organic Pest Control",
      thumbnail: "https://i.ytimg.com/vi/_1BdRzoN-50/maxresdefault.jpg",
      duration: "30 min",
      description: "Natural ways to keep pests away from your garden.",
      videoId: "_1BdRzoN-50"
    },
    {
      id: 4,
      title: "Plant Propagation for Beginners",
      thumbnail: "https://i.ytimg.com/vi/WHiv1OvXGcI/maxresdefault.jpg",
      duration: "12 min",
      description: "Learn 4 simple methods to propagate plants and multiply your garden easily.",
      videoId: "WHiv1OvXGcI"
    },
    {
      id: 5,
      title: "Indoor Plant Care Basics",
      thumbnail: "https://i.ytimg.com/vi/IbWCleprbkU/maxresdefault.jpg",
      duration: "15 min",
      description: "Essential tips for watering, lighting and maintaining healthy indoor plants.",
      videoId: "IbWCleprbkU"
    },
    {
      id: 6,
      title: "How to Repot Plants Correctly",
      thumbnail: "https://i.ytimg.com/vi/fqF7dYpqU28/maxresdefault.jpg",
      duration: "8 min",
      description: "Step-by-step guide to repotting plants without damaging roots.",
      videoId: "fqF7dYpqU28"
    },
    {
      id: 7,
      title: "Gardening for Beginners: Plants, Soil and Pro Tips",
      thumbnail: "https://i.ytimg.com/vi/H1yh2euwhBc/hqdefault.jpg",
      duration: "14 min",
      description: "An easy guide to plant care basics, choosing soil, and practical gardening tips for beginners.",
      videoId: "H1yh2euwhBc"
    },
    {
      id: 8,
      title: "Pruning Plants is 10x Easier When You Know This",
      thumbnail: "https://i.ytimg.com/vi/ypuVwJN33Vk/hqdefault.jpg",
      duration: "9 min",
      description: "Learn smart pruning tips to keep your plants healthy, encourage growth, and prevent disease.",
      videoId: "ypuVwJN33Vk"
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
    },
    {
  id: 3,
  title: "Herb Garden Guide",
  image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2940&auto=format&fit=crop",
  steps: [
    "Choose easy herbs like basil, mint, coriander",
    "Ensure 4-6 hours of sunlight",
    "Use well-draining soil",
    "Trim regularly to promote growth",
    "Harvest leaves correctly"
  ]
  },
 {
  id: 4,
  title: "Balcony Gardening Guide",
  image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2940&auto=format&fit=crop",
  steps: [
    "Use vertical space with shelves and hangers",
    "Select pots with proper drainage",
    "Choose compact plants",
    "Water carefully to avoid overflow",
    "Rotate plants for even sunlight"
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

  const openYoutubeVideo = (videoId?: string) => {
     if (videoId) {
       window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
     }
   };
  
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
                  <Button 
                     className="w-full"
                     onClick={() => openYoutubeVideo(video.videoId)}
                   >
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
