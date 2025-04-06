
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image, Leaf, AlertTriangle, Info } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define detection result types
type DetectionResult = {
  name: string;
  confidence: number;
  image?: string;
  description?: string;
  id?: string;
};

const CameraPage = () => {
  const [activeTab, setActiveTab] = useState("plant-id");
  const [captureMode, setCaptureMode] = useState<"camera" | "upload" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);

  // Simulated detection function - in a real app, this would connect to an API
  const simulateDetection = (mode: "disease" | "plant") => {
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (mode === "disease") {
        setDetectionResult({
          name: "Early Blight",
          confidence: 0.89,
          image: "https://images.unsplash.com/photo-1588105783094-56cee2cc45e1",
          description: "Early blight is a common fungal disease that affects tomato plants. It's characterized by brown spots with concentric rings that appear on lower leaves first."
        });
      } else {
        setDetectionResult({
          name: "Tomato Plant",
          confidence: 0.95,
          image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
          description: "The tomato plant (Solanum lycopersicum) is a member of the nightshade family, native to South America.",
          id: "1" // ID to link to the plant info page
        });
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handleCapture = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll just simulate a successful capture
    simulateDetection(activeTab === "disease-detect" ? "disease" : "plant");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would send this file to your API
      // For now, we'll just simulate processing
      simulateDetection(activeTab === "disease-detect" ? "disease" : "plant");
    }
  };

  const resetDetection = () => {
    setDetectionResult(null);
    setCaptureMode(null);
  };

  return (
    <DashboardLayout title="Plant Camera">
      <div className="container mx-auto max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plant-id">
              <Leaf className="mr-2 h-4 w-4" />
              Plant Identification
            </TabsTrigger>
            <TabsTrigger value="disease-detect">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Disease Detection
            </TabsTrigger>
          </TabsList>

          {/* Plant Identification Tab */}
          <TabsContent value="plant-id" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identify Plants</CardTitle>
                <CardDescription>
                  Take a photo of any plant and we'll help you identify what it is.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!detectionResult ? (
                  <>
                    {!captureMode ? (
                      <div className="flex flex-col gap-4 items-center justify-center py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                          <Button onClick={() => setCaptureMode("camera")} className="flex-1 h-24 flex-col gap-2">
                            <Camera className="h-8 w-8" />
                            <span>Take Photo</span>
                          </Button>
                          <Button variant="outline" onClick={() => setCaptureMode("upload")} className="flex-1 h-24 flex-col gap-2">
                            <Image className="h-8 w-8" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                      </div>
                    ) : captureMode === "camera" ? (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Camera className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleCapture}>Capture</Button>
                          <Button variant="outline" onClick={() => setCaptureMode(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Image className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={() => document.getElementById('file-upload')?.click()}>
                            Select Image
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button variant="outline" onClick={() => setCaptureMode(null)}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Analyzing your image...</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold mb-1">Identified Plant</h3>
                          <p className="text-muted-foreground">With {Math.round(detectionResult.confidence * 100)}% confidence</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="aspect-video rounded-md overflow-hidden">
                            <img 
                              src={detectionResult.image} 
                              alt={detectionResult.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-medium">{detectionResult.name}</h4>
                              <p className="text-sm text-muted-foreground">{detectionResult.description}</p>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              {detectionResult.id && (
                                <Button asChild>
                                  <a href={`/plant-info/${detectionResult.id}`}>View Plant Details</a>
                                </Button>
                              )}
                              <Button variant="outline" onClick={resetDetection}>Try Another Photo</Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Our identification system uses AI to recognize thousands of plant species.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Disease Detection Tab */}
          <TabsContent value="disease-detect" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detect Plant Diseases</CardTitle>
                <CardDescription>
                  Take a photo of your plant's leaves or stems to check for diseases or pests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!detectionResult ? (
                  <>
                    {!captureMode ? (
                      <div className="flex flex-col gap-4 items-center justify-center py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                          <Button onClick={() => setCaptureMode("camera")} className="flex-1 h-24 flex-col gap-2">
                            <Camera className="h-8 w-8" />
                            <span>Take Photo</span>
                          </Button>
                          <Button variant="outline" onClick={() => setCaptureMode("upload")} className="flex-1 h-24 flex-col gap-2">
                            <Image className="h-8 w-8" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                      </div>
                    ) : captureMode === "camera" ? (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Camera className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleCapture}>Capture</Button>
                          <Button variant="outline" onClick={() => setCaptureMode(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Image className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={() => document.getElementById('disease-file-upload')?.click()}>
                            Select Image
                          </Button>
                          <input
                            id="disease-file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button variant="outline" onClick={() => setCaptureMode(null)}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Analyzing your image...</p>
                      </div>
                    ) : (
                      <>
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Problem Detected</AlertTitle>
                          <AlertDescription>
                            We've detected a disease with {Math.round(detectionResult.confidence * 100)}% confidence.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="aspect-video rounded-md overflow-hidden">
                            <img 
                              src={detectionResult.image} 
                              alt={detectionResult.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-medium">{detectionResult.name}</h4>
                              <p className="text-sm text-muted-foreground">{detectionResult.description}</p>
                            </div>
                            
                            <Alert>
                              <Info className="h-4 w-4" />
                              <AlertTitle>Treatment Recommendation</AlertTitle>
                              <AlertDescription>
                                Remove affected leaves and apply copper-based fungicide. Ensure proper spacing between plants for better air circulation.
                              </AlertDescription>
                            </Alert>
                            
                            <Button variant="outline" onClick={resetDetection}>Try Another Photo</Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Our system can identify common diseases and pests affecting various plant types.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CameraPage;
