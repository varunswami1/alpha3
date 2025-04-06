
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Heart, 
  Share, 
  Bookmark, 
  Send,
  Image,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

type Post = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  saved: boolean;
};

const EngagementPortal = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: "Jane Smith",
        avatar: "https://placehold.co/100x100",
      },
      content: "Just planted some tomatoes in my garden! Can't wait to see them grow. Any tips for keeping them healthy?",
      image: "https://placehold.co/600x400",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      saved: false,
    },
    {
      id: 2,
      user: {
        name: "Michael Johnson",
        avatar: "https://placehold.co/100x100",
      },
      content: "Having trouble with aphids on my roses. Any natural remedies that won't harm beneficial insects?",
      timestamp: "Yesterday",
      likes: 18,
      comments: 12,
      saved: false,
    },
    {
      id: 3,
      user: {
        name: "Sarah Williams",
        avatar: "https://placehold.co/100x100",
      },
      content: "Look at my beautiful sunflowers! They're finally blooming after weeks of care.",
      image: "https://placehold.co/600x400",
      timestamp: "3 days ago",
      likes: 45,
      comments: 8,
      saved: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("posts");
  
  const toggleSaved = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, saved: !post.saved} : post
    ));
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const newPostObj: Post = {
      id: posts.length + 1,
      user: {
        name: "You",
        avatar: "https://placehold.co/100x100",
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      saved: false,
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-6">
          {/* Create new post */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share with the community</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="What's happening in your garden?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </CardFooter>
          </Card>
          
          {/* Posts feed */}
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{post.user.name}</h3>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm mb-3">{post.content}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post image" 
                      className="w-full h-auto rounded-md"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleSaved(post.id)}
                    className={post.saved ? "text-primary" : "text-muted-foreground"}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-4">
          <div className="relative mb-6">
            <Input placeholder="Search questions..." className="pl-10" />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Popular Questions</CardTitle>
                <Button variant="outline" size="sm">Ask a Question</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-1">When is the best time to plant tomatoes?</h3>
                <p className="text-sm text-muted-foreground mb-2">Asked by Sarah • 3 days ago</p>
                <p className="text-sm">Plant tomatoes after the last frost date in your area, when soil temperatures reach at least 60°F (16°C).</p>
                <div className="flex items-center mt-2 text-sm">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    12 answers
                  </Button>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-1">How do I get rid of powdery mildew naturally?</h3>
                <p className="text-sm text-muted-foreground mb-2">Asked by Michael • 1 week ago</p>
                <p className="text-sm">I have some zucchini plants with white powder on the leaves. How can I treat this without chemicals?</p>
                <div className="flex items-center mt-2 text-sm">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    8 answers
                  </Button>
                </div>
              </div>
              
              <div className="pb-2">
                <h3 className="font-medium mb-1">What vegetables grow well in partial shade?</h3>
                <p className="text-sm text-muted-foreground mb-2">Asked by John • 2 weeks ago</p>
                <p className="text-sm">My garden only gets about 4 hours of direct sunlight. What can I grow successfully?</p>
                <div className="flex items-center mt-2 text-sm">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    15 answers
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Questions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="p-4 flex items-center space-x-4">
                <img src="https://placehold.co/100x100" alt="User" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-medium">Garden Expert</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">I'd recommend using neem oil for those aphids. It's organic and effective!</p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="p-4 flex items-center space-x-4">
                <img src="https://placehold.co/100x100" alt="User" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-medium">Local Garden Club</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">Our next meeting is on Saturday at 10am. We'll be discussing fall planting strategies.</p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="p-4 flex items-center space-x-4">
                <img src="https://placehold.co/100x100" alt="User" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-medium">Plant Swap Group</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">Thanks for offering those tomato seedlings! Can we arrange a pickup time?</p>
                </div>
                <div className="text-xs text-muted-foreground">3d ago</div>
              </CardContent>
            </Card>
          </div>
          
          <Button className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementPortal;
