import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Image,
  Leaf,
  AlertTriangle,
  Info,
  Loader2,
  Upload,
  RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  initializeModels,
  identifyPlant,
  detectDisease,
} from "@/utils/ml-utils";
import {
  loadDiseaseModelDirectly,
  detectDiseaseWithDirectModel,
} from "@/utils/custom-model-utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DetectionResult = {
  name: string;
  confidence: number;
  image?: string;
  description?: string;
  id?: string;
};

const CameraPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plant-id");
  const [captureMode, setCaptureMode] = useState<"camera" | "upload" | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [diseaseModelLoaded, setDiseaseModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load default models (plant identification)
  useEffect(() => {
    const loadDefaultModels = async () => {
      setIsLoadingModels(true);
      try {
        const success = await initializeModels((message) =>
          toast({ description: message })
        );
        setModelsLoaded(success);
      } catch (error) {
        console.error("Failed to load models:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load ML models. Please try again later.",
        });
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadDefaultModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [toast]);

  // Load disease detection model directly
  useEffect(() => {
    const loadDiseaseModel = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        console.log("Loading disease detection model...");
        const { model, labels } = await loadDiseaseModelDirectly();
        
        if (model && labels.length > 0) {
          setDiseaseModelLoaded(true);
          toast({
            title: "Success",
            description: "Disease detection model loaded successfully",
          });
        } else {
          throw new Error("Model or labels not loaded properly");
        }
      } catch (error) {
        console.error("Error loading disease model:", error);
        setLoadError(error instanceof Error ? error.message : "Failed to load disease detection model");
        toast({
          title: "Error",
          description: "Error loading disease detection model. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDiseaseModel();
  }, [toast, isRetrying]);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
      });
      setCaptureMode(null);
    }
  };

  const handleCameraModeSelect = () => {
    setCaptureMode("camera");
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageUrl);

      const tracks = (video.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;

      processImage(canvas);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setCapturedImage(event.target.result);

          const img = document.createElement('img');
          img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                processImage(canvas);
              }
            } else {
              // If canvas is not available, process the image directly
              processImage(img);
            }
          };
          img.src = event.target.result as string;
          imageRef.current = img;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageElement: HTMLImageElement | HTMLCanvasElement) => {
    if (activeTab === "plant-id" && !modelsLoaded) {
      toast({
        title: "Error",
        description: "Plant identification model is not loaded",
        variant: "destructive",
      });
      return;
    }

    let dataUrl: string;
    try {
      setIsLoading(true);
      let result;
      
      // Convert canvas/image element to data URL
      if (imageElement instanceof HTMLCanvasElement) {
        dataUrl = imageElement.toDataURL("image/jpeg");
      } else {
        // For HTMLImageElement, we need to create a canvas to get a consistent data URL
        const canvas = document.createElement('canvas');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imageElement, 0, 0);
          dataUrl = canvas.toDataURL("image/jpeg");
        } else {
          // Fallback to using the image source directly
          dataUrl = imageElement.src;
        }
      }
      
      if (activeTab === "disease") {
        if (diseaseModelLoaded) {
          result = await detectDiseaseWithDirectModel(imageElement);
        } else {
          toast({
            title: "Error",
            description: "Disease detection model is not loaded",
            variant: "destructive",
          });
          return;
        }

        setDetectionResult({
          name: result?.name || "Unknown",
          confidence: result?.confidence || 0,
          image: result?.image || dataUrl,
          description:
            result?.name === "Healthy Plant"
              ? "Your plant appears to be healthy!"
              : `Your plant may have ${result?.name}. Please consult a plant expert for confirmation and treatment.`,
        });
      } else {
        result = await identifyPlant(dataUrl);

        setDetectionResult({
          name: result?.name || "Unknown Plant",
          confidence: result?.confidence || 0,
          image: result?.image || dataUrl,
          description: `${
            result?.name || "This plant"
          } has been identified with ${(result?.confidence * 100).toFixed(2)}% confidence.`,
        });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetection = () => {
    setDetectionResult(null);
    setCapturedImage(null);
    setCaptureMode(null);
  };

  const isDiseaseModelAvailable = activeTab === "disease" && diseaseModelLoaded;
  const isPlantModelAvailable = activeTab === "plant-id" && modelsLoaded;
  const isModelAvailable = isPlantModelAvailable || isDiseaseModelAvailable;

  const handleRetryLoading = () => {
    setIsRetrying(prev => !prev);
  };

  return (
    <DashboardLayout title="Plant Camera">
      <div className="container mx-auto max-w-4xl">
        {isLoadingModels && (
          <Alert className="mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertTitle>Loading ML Models</AlertTitle>
            <AlertDescription>
              Please wait while we load the machine learning models. This may
              take a moment.
            </AlertDescription>
          </Alert>
        )}

        {loadError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Model</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{loadError}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetryLoading}
                disabled={isLoading}
                className="ml-4"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Retry Loading
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plant-id">
              <Leaf className="mr-2 h-4 w-4" />
              Plant Identification
            </TabsTrigger>
            <TabsTrigger value="disease">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Disease Detection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plant-id" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identify Plants</CardTitle>
                <CardDescription>
                  Take a photo of any plant and our ML model will help you
                  identify what it is.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!detectionResult ? (
                  <>
                    {!captureMode ? (
                      <div className="flex flex-col gap-4 items-center justify-center py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                          <Button
                            onClick={handleCameraModeSelect}
                            className="flex-1 h-24 flex-col gap-2"
                            disabled={isLoadingModels || !modelsLoaded}
                          >
                            <Camera className="h-8 w-8" />
                            <span>Take Photo</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setCaptureMode("upload")}
                            className="flex-1 h-24 flex-col gap-2"
                            disabled={isLoadingModels || !modelsLoaded}
                          >
                            <Image className="h-8 w-8" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                        {!modelsLoaded && !isLoadingModels && (
                          <Alert variant="destructive" className="mt-4">
                            <AlertTitle>ML Models Not Loaded</AlertTitle>
                            <AlertDescription>
                              Failed to load machine learning models. Please
                              refresh the page and try again.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : captureMode === "camera" ? (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <canvas ref={canvasRef} className="hidden" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleCapture}>Capture</Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (
                                videoRef.current &&
                                videoRef.current.srcObject
                              ) {
                                const tracks = (
                                  videoRef.current.srcObject as MediaStream
                                ).getTracks();
                                tracks.forEach((track) => track.stop());
                                videoRef.current.srcObject = null;
                              }
                              setCaptureMode(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Image className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() =>
                              document
                                .getElementById("file-upload")
                                ?.click()
                            }
                          >
                            Select Image
                          </Button>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            onClick={() => setCaptureMode(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Analyzing your image with ML model...</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold mb-1">
                            Identified Plant
                          </h3>
                          <p className="text-muted-foreground">
                            With {Math.round(detectionResult.confidence * 100)}%
                            confidence
                          </p>
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
                              <h4 className="text-lg font-medium">
                                {detectionResult.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {detectionResult.description}
                              </p>
                            </div>

                            <div className="flex flex-col gap-2">
                              {detectionResult.id && (
                                <Button asChild>
                                  <a href={`/plant-info/${detectionResult.id}`}>
                                    View Plant Details
                                  </a>
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                onClick={resetDetection}
                              >
                                Try Another Photo
                              </Button>
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
                  Our identification system uses machine learning to recognize
                  thousands of plant species.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="disease" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detect Plant Diseases</CardTitle>
                <CardDescription>
                  Take a photo of your plant's leaves or stems to check for
                  diseases or pests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!detectionResult ? (
                  <>
                    {!captureMode ? (
                      <div className="flex flex-col gap-4 items-center justify-center py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                          <Button
                            onClick={handleCameraModeSelect}
                            className="flex-1 h-24 flex-col gap-2"
                            disabled={
                              isLoadingModels ||
                              (!modelsLoaded && !diseaseModelLoaded)
                            }
                          >
                            <Camera className="h-8 w-8" />
                            <span>Take Photo</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setCaptureMode("upload")}
                            className="flex-1 h-24 flex-col gap-2"
                            disabled={
                              isLoadingModels ||
                              (!modelsLoaded && !diseaseModelLoaded)
                            }
                          >
                            <Image className="h-8 w-8" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                        {!isModelAvailable && !isLoadingModels && (
                          <Alert variant="destructive" className="mt-4">
                            <AlertTitle>ML Models Not Loaded</AlertTitle>
                            <AlertDescription>
                              {diseaseModelLoaded ? (
                                "Using custom TensorFlow model for disease detection"
                              ) : "Failed to load machine learning models. Please refresh the page and try again."}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : captureMode === "camera" ? (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <canvas ref={canvasRef} className="hidden" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleCapture}>Capture</Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (
                                videoRef.current &&
                                videoRef.current.srcObject
                              ) {
                                const tracks = (
                                  videoRef.current.srcObject as MediaStream
                                ).getTracks();
                                tracks.forEach((track) => track.stop());
                                videoRef.current.srcObject = null;
                              }
                              setCaptureMode(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                          <Image className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() =>
                              document
                                .getElementById("file-upload")
                                ?.click()
                            }
                          >
                            Select Image
                          </Button>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            onClick={() => setCaptureMode(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Analyzing your image with ML model...</p>
                      </div>
                    ) : (
                      <>
                        {detectionResult.name === "Healthy Plant" ? (
                          <Alert className="bg-green-50 border-green-200">
                            <AlertTitle className="text-green-700">
                              Healthy Plant Detected
                            </AlertTitle>
                            <AlertDescription className="text-green-600">
                              We've detected a healthy plant with{" "}
                              {Math.round(detectionResult.confidence * 100)}%
                              confidence.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Problem Detected</AlertTitle>
                            <AlertDescription>
                              We've detected {detectionResult.name} with{" "}
                              {Math.round(detectionResult.confidence * 100)}%
                              confidence.
                            </AlertDescription>
                          </Alert>
                        )}

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
                              <h4 className="text-lg font-medium">
                                {detectionResult.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {detectionResult.description}
                              </p>
                            </div>

                            {detectionResult.name !== "Healthy Plant" && (
                              <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>
                                  Treatment Recommendation
                                </AlertTitle>
                                <AlertDescription>
                                  Remove affected leaves and apply copper-based
                                  fungicide. Ensure proper spacing between
                                  plants for better air circulation.
                                </AlertDescription>
                              </Alert>
                            )}

                            <Button variant="outline" onClick={resetDetection}>
                              Try Another Photo
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  {diseaseModelLoaded
                    ? "Using custom TensorFlow model for disease detection"
                    : "Our system uses machine learning to identify common diseases and pests affecting various plant types."}
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
