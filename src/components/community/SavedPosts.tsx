
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Heart, 
  Share, 
  Bookmark, 
  Trash2,
  Filter
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SavedItem = {
  id: number;
  type: 'post' | 'article';
  user: {
    name: string;
    avatar: string;
  };
  title?: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  saved: boolean;
};

const SavedPosts = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: 1,
      type: 'post',
      user: {
        name: "Sarah Williams",
        avatar: "https://placehold.co/100x100",
      },
      content: "Look at my beautiful sunflowers! They're finally blooming after weeks of care.",
      image: "/images/others/Sarah Williams.jpeg",
      timestamp: "3 days ago",
      likes: 45,
      comments: 8,
      saved: true,
    },
    {
      id: 2,
      type: 'article',
      user: {
        name: "Gardening Monthly",
        avatar: "https://placehold.co/100x100",
      },
      title: "10 Easy Vegetables for Beginners",
      content: "Starting a vegetable garden can be intimidating, but these ten vegetables are perfect for novice gardeners. They're relatively easy to grow, produce abundantly, and don't require specialized knowledge...",
      timestamp: "1 week ago",
      likes: 127,
      comments: 23,
      saved: true,
    },
    {
      id: 3,
      type: 'post',
      user: {
        name: "David Chen",
        avatar: "https://placehold.co/100x100",
      },
      content: "Just built this raised garden bed from recycled materials. Cost me less than $30 total!",
      image: "/images/others/David Chen.jpeg",
      timestamp: "2 weeks ago",
      likes: 89,
      comments: 14,
      saved: true,
    },
        {
      id: 4,
      type: 'post',
      user: {
       name: "Ananya Patel",
       avatar: "/images/others/photo-1524504388940-b1c1722653e1.jpg",
      },
      content: "My balcony herb garden is thriving! Basil, mint, and coriander all growing together ",
      image: "/images/others/herbGraden.jpg",
      timestamp: "5 days ago",
      likes: 62,
      comments: 11,
      saved: true,
    },
    {
      id: 5,
      type: 'post',
      user: {
       name: "Rohan Mehta",
       avatar: "/images/others/100%20(1).jpg",
      },
      content: "First time trying hydroponics and the lettuce growth is insane! No soil, just nutrients ",
      image: "/images/others/download.jpg",
      timestamp: "6 days ago",
      likes: 101,
      comments: 19,
      saved: true,
    },

    {
      id: 6,
      type: 'article',
      user: {
       name: "Urban Gardening Blog",
       avatar: "https://placehold.co/100x100",
      },
      title: "Composting at Home: A Complete Beginner’s Guide",
      content: "Composting is the easiest way to reduce kitchen waste while creating nutrient-rich soil for your plants. Here’s how you can start composting in small spaces...",
      timestamp: "4 days ago",
      likes: 210,
      comments: 34,
      saved: true,
    },
    {
      id: 7,
      type: 'post',
      user: {
       name: "Neha Sharma",
       avatar: "/images/others/100.jpg",
      },
     content: "My tomato plants finally started fruiting  After 2 months of patience!",
     image: "/images/others/dennis7dees-edible-gardening-tomatoes.jpeg",
     timestamp: "1 day ago",
     likes: 73,
     comments: 9,
     saved: true,
    },
    {
      id: 8,
      type: 'post',
      user: {
       name: "Arjun Verma",
       avatar: "/images/others/photo-1506794778202-cad84cf45f1d.jpg",
      },
      content: "DIY vertical garden using old plastic bottles. Super space efficient and eco-friendly!",
      image: "/images/others/maxresdefault.jpg",
      timestamp: "8 hours ago",
      likes: 55,
      comments: 7,
      saved: true,
    },
    {
      id: 9,
      type: 'article',
      user: {
       name: "Plant Care Weekly",
       avatar: "https://placehold.co/100x100",
      },
      title: "Why Your Indoor Plants Keep Dying (And How to Fix It)",
      content: "Most indoor plant deaths happen due to overwatering and lack of proper light. Understanding plant needs can save your greens...",
      timestamp: "2 days ago",
      likes: 180,
      comments: 26,
      saved: true,
    },
    {
      id: 10,
      type: 'post',
      user: {
       name: "Kavya Nair",
       avatar: "/images/others/photo-.jpg",
      },
      content: "Repotted all my succulents today. They look so cute in these tiny clay pots ",
      image: "/images/others/17.jpeg",
      timestamp: "12 hours ago",
      likes: 49,
      comments: 6,
      saved: true,
    },
    {
      id: 11,
      type: "post",
      user: {
       name: "Ishan Kapoor",
       avatar: "/images/others/photo-7.jpg",
      },
      content: "Trying out companion planting — basil next to my tomatoes to keep pests away.",
      image: "/images/others/images%20(1).jpg",
      timestamp: "3 hours ago",
      likes: 87,
      comments: 10,
      saved: true,
    },
    {
      id: 12,
      type: "article",
      user: {
       name: "Eco Growers Hub",
       avatar: "/images/avatars/ecogrowers.jpg",
      },
      title: "Seasonal Care Tips for Spring Gardens",
      content: "Spring is here! Learn how to prepare your garden beds, what to plant now, and how to manage pests naturally this season...",
      timestamp: "2 days ago",
      likes: 143,
      comments: 18,
      saved: true,
    },
    {
     id: 13,
     type: "post",
     user: {
       name: "Meera Joshi",
       avatar: "/images/others/photo-1520813792240-56fc4a3765a7.jpg",
      },
     content: "My lemon tree finally bloomed! Such a proud moment — anyone else growing citrus?",
     image: "/images/others/bhg-lemon-tree-in-pot-f61cbb71bf004b33b7b378da5c31b594.jpeg",
     timestamp: "1 day ago",
     likes: 66,
     comments: 8,
     saved: true
     }
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const removeItem = (itemId: number) => {
    setSavedItems(savedItems.filter(item => item.id !== itemId));
  };

  const filteredItems = activeTab === "all" 
    ? savedItems 
    : savedItems.filter(item => item.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Saved</TabsTrigger>
            <TabsTrigger value="post">Posts</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Newest First</DropdownMenuItem>
            <DropdownMenuItem>Oldest First</DropdownMenuItem>
            <DropdownMenuItem>Most Liked</DropdownMenuItem>
            <DropdownMenuItem>Most Commented</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />
      
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.user.avatar} 
                      alt={item.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{item.user.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                {item.title && <h3 className="font-semibold mb-2">{item.title}</h3>}
                <p className="text-sm mb-3">{item.content}</p>
                {item.image && (
                  <img 
                    src={item.image} 
                    alt="Post image" 
                    className="w-full h-auto rounded-md"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1" />
                    {item.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {item.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary"
                >
                  <Bookmark className="h-4 w-4" fill="currentColor" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved items</h3>
            <p className="text-muted-foreground mb-4">Items you save will appear here</p>
            <Button variant="outline">Explore Community</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
