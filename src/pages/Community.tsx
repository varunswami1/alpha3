
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LearningResources from "@/components/community/LearningResources";
import EngagementPortal from "@/components/community/EngagementPortal";
import SavedPosts from "@/components/community/SavedPosts";

const Community = () => {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <DashboardLayout title="Community Hub">
      <div className="w-full">
        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="learn">Learning</TabsTrigger>
            <TabsTrigger value="engage">Engage</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="mt-0">
            <LearningResources />
          </TabsContent>
          
          <TabsContent value="engage" className="mt-0">
            <EngagementPortal />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            <SavedPosts />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Community;
