
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { plantDatabase } from "@/data/plantDatabase";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Droplets,
  Sun,
  ThermometerSnowflake,
  ThermometerSun,
  Info,
} from "lucide-react";
import type { RecommendationFormData } from "@/components/garden/PlantRecommendationForm";

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  image: string;
  description: string;
  care: {
    water: string;
    light: string;
    temperature: string;
  };
  climate: ("hot" | "moderate" | "cold")[];
  sunlight: ("full" | "partial" | "shade")[];
  humidityRange: [number, number];
  size: {
    width: number;
    height: number;
  };
}

interface PlantVisualizationProps {
  data: RecommendationFormData;
  id?: string;
}

// Location-specific background images
const locationBackgrounds = {
  garden: {
    full: "/images/locations/garden-soil.jpeg",
    blur: "/images/locations/garden-soil.jpeg" // Using same image for now since we have the blur effect in CSS
  },
  balcony: {
    full: "/images/locations/balcony-floor.jpeg",
    blur: "/images/locations/balcony-floor.jpeg"
  },
  terrace: {
    full: "/images/locations/terrace-floor.jpg",
    blur: "/images/locations/terrace-floor.jpg"
  },
  indoor: {
    full: "/images/locations/indoor-floor.jpg",
    blur: "/images/locations/indoor-floor.jpg"
  },
  windowsill: {
    full: "/images/locations/windowsill.jpeg",
    blur: "/images/locations/windowsill.jpeg"
  }
};

// Location-specific background colors
const locationColors = {
  garden: "bg-gradient-to-br from-soft-green to-accent-green/30",
  balcony: "bg-gradient-to-br from-neutral-200 to-neutral-300/50",
  terrace: "bg-gradient-to-br from-neutral-200 to-neutral-300/50",
  indoor: "bg-gradient-to-br from-neutral-100 to-neutral-200/50",
  windowsill: "bg-gradient-to-br from-neutral-100 to-neutral-200/50",
};

const PlantVisualization = ({ data, id }: PlantVisualizationProps) => {
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [gardenWidth, setGardenWidth] = useState(10);
  const [gardenHeight, setGardenHeight] = useState(10);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: boolean }>({});
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (data.area) {
      const sqrtArea = Math.sqrt(data.area);
      setGardenWidth(Math.ceil(sqrtArea));
      setGardenHeight(Math.ceil(data.area / Math.ceil(sqrtArea)));
    }
  }, [data.area]);

  useEffect(() => {
    const filteredPlants = plantDatabase.filter((plant) => {
      const typedPlant = plant as unknown as Plant;

      const climateMatch = typedPlant.climate.includes(
        data.climate as "hot" | "moderate" | "cold"
      );
      if (
        !typedPlant.sunlight.includes(
          data.sunlight as "full" | "partial" | "shade"
        )
      )
        return false;
      const [minHumidity, maxHumidity] = typedPlant.humidityRange;
      if (data.humidity < minHumidity || data.humidity > maxHumidity)
        return false;
      if (
        data.plantCategory !== "mixed" &&
        typedPlant.category !== data.plantCategory
      )
        return false;
      return climateMatch;
    });

    setRecommendedPlants(filteredPlants.slice(0, 10) as unknown as Plant[]);
  }, [data]);

  // Preload all background images on component mount
  useEffect(() => {
    Object.entries(locationBackgrounds).forEach(([location, urls]) => {
      const img = new Image();
      img.src = urls.full;
      img.onload = () => {
        setPreloadedImages(prev => ({
          ...prev,
          [location]: true
        }));
      };
    });
  }, []);

  // Update background loaded state when location changes
  useEffect(() => {
    setIsBackgroundLoaded(!!preloadedImages[data.location]);
  }, [data.location, preloadedImages]);

  // const getPlantPositions = () => {
  //   // const gridCells = gardenWidth * gardenHeight;
  //   // const cellsPerPlant = Math.max(
  //   //   1,
  //   //   Math.floor(gridCells / recommendedPlants.length)
  //   // );

  //     // Define regions for plant placement
  //    const regions = [
  //     // Corners - moved slightly inward
  //      { x: 15, y: 15 },       // Top-left
  //      { x: 85, y: 15 },       // Top-right
  //      { x: 15, y: 85 },       // Bottom-left
  //      { x: 85, y: 85 },       // Bottom-right
  //      // Edges - adjusted to stay within visible area
  //      { x: 50, y: 15 },       // Top-middle
  //      { x: 85, y: 50 },       // Right-middle
  //      { x: 50, y: 85 },       // Bottom-middle
  //      { x: 15, y: 50 },       // Left-middle
  //      // Center
  //      { x: 50, y: 50 },       // Center
  //     // Additional regions - adjusted to avoid edges
  //      { x: 33, y: 33 },       // Upper-left quadrant
  //      { x: 67, y: 33 },       // Upper-right quadrant
  //      { x: 33, y: 67 },       // Lower-left quadrant
  //      { x: 67, y: 67 },       // Lower-right quadrant
  //      { x: 33, y: 50 },       // Middle-left
  //      { x: 67, y: 50 },       // Middle-right
  //      { x: 50, y: 33 },       // Middle-top
  //      { x: 50, y: 67 },       // Middle-bottom
  //    ];
    
  //   return recommendedPlants.map((plant, index) => {
  //       // Cycle through regions based on plant index
  //      const regionIndex = index % regions.length;
  //      const basePosition = regions[regionIndex];
       
  //      // Add a small random offset for natural positioning
  //      const randomOffset = 5;
  //      const xRandom = Math.random() * randomOffset * 2 - randomOffset;
  //      const yRandom = Math.random() * randomOffset * 2 - randomOffset;
       
  //      const xPosition = basePosition.x + xRandom;
  //      const yPosition = basePosition.y + yRandom;
       
  //      // Scale based on plant size, but within reasonable bounds
  //     const heightFactor = plant.size.height / 10;
  //     // const cellIndex = index * cellsPerPlant;
  //     // const row = Math.floor(cellIndex / gardenWidth);
  //     // const col = cellIndex % gardenWidth;
  //     // const xRandom = Math.random() * 0.8 - 0.4;
  //     // const yRandom = Math.random() * 0.8 - 0.4;
  //     // const xPosition = 10 + ((col + xRandom) / gardenWidth) * 80;
  //     // const yPosition = 10 + ((row + yRandom) / gardenHeight) * 80;
  //     // const widthPercent = (plant.size.width / gardenWidth) * 70;
  //     // const heightPercent = (plant.size.height / gardenHeight) * 70;
  //     // const scaleFactor = Math.min(
  //     //   Math.max(widthPercent, heightPercent, 15),
  //     //   45
  //     // );

  //     const widthFactor = plant.size.width / 10;
       
  //      // Calculate scale factor based on plant dimensions
  //      const baseFactor = Math.min(Math.max((heightFactor + widthFactor) * 4, 10), 22); 
       
  //      // For smaller gardens, scale plants accordingly
  //      const densityFactor = Math.min(1, Math.sqrt(gardenWidth * gardenHeight) / 10);
  //      const scaleFactor = baseFactor * densityFactor;
      
  //     return {
  //       ...plant,
  //       position: {
  //         x: xPosition,
  //         y: yPosition,
  //       },
  //       scale: scaleFactor,
  //     };
  //   });
  // };

const getPlantPositions = () => {
  const totalPlants = recommendedPlants.length;

  // Calculate grid dimensions (as square as possible)
  const columns = Math.ceil(Math.sqrt(totalPlants));
  const rows = Math.ceil(totalPlants / columns);

  // Define spacing for each cell in percentage (assuming 100x100 area)
  const xSpacing = 100 / (columns + 1);
  const ySpacing = 100 / (rows + 1);

  return recommendedPlants.map((plant, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    // Calculate position within the grid
    const xPosition = (col + 1) * xSpacing;
    const yPosition = (row + 1) * ySpacing;

    // Scale based on plant size
    const heightFactor = plant.size.height / 10;
    const widthFactor = plant.size.width / 10;
    const baseFactor = Math.min(Math.max((heightFactor + widthFactor) * 4, 10), 22);

    // Density factor depending on garden size
    const densityFactor = Math.min(1, Math.sqrt(gardenWidth * gardenHeight) / 10);
    const scaleFactor = baseFactor * densityFactor;

    return {
      ...plant,
      position: {
        x: xPosition,
        y: yPosition,
      },
      scale: scaleFactor,
    };
  });
};

  
  const plantPositions = getPlantPositions();

  const getClimateIcon = () => {
    switch (data.climate) {
      case "hot":
        return <ThermometerSun className="h-5 w-5 text-orange-500" />;
      case "cold":
        return <ThermometerSnowflake className="h-5 w-5 text-blue-500" />;
      default:
        return <ThermometerSun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getSunlightVariant = () => {
    switch (data.sunlight) {
      case "full":
        return "default";
      case "partial":
        return "secondary";
      case "shade":
        return "outline";
      default:
        return "default";
    }
  };

  const getLocationLabel = () => {
    switch (data.location) {
      case "garden":
        return "Garden/Yard";
      case "balcony":
        return "Balcony";
      case "terrace":
        return "Terrace/Rooftop";
      case "indoor":
        return "Indoor";
      case "windowsill":
        return "Windowsill";
      default:
        return data.location;
    }
  };

  return (
    <div className="space-y-4">
      {/* Preload images in the background */}
      <div className="hidden">
        {Object.entries(locationBackgrounds).map(([location, urls]) => (
          <img key={location} src={urls.full} alt="" />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Sprout className="h-4 w-4" />
          {data.area} sq ft
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {getClimateIcon()}
          {data.climate.charAt(0).toUpperCase() + data.climate.slice(1)} Climate
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Droplets className="h-4 w-4" />
          {data.humidity}% Humidity
        </Badge>
        <Badge
          variant={getSunlightVariant()}
          className="flex items-center gap-1"
        >
          <Sun className="h-4 w-4" />
          {data.sunlight.charAt(0).toUpperCase() + data.sunlight.slice(1)} Sun
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Sprout className="h-4 w-4" />
          {getLocationLabel()}
        </Badge>
      </div>

      <div
        id={id}
        className={`relative ${
          locationColors[data.location as keyof typeof locationColors]
        } rounded-lg border border-neutral-200 shadow-lg overflow-hidden transition-all duration-300`}
      >
        {/* Blur background */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 backdrop-blur-xl"
          style={{
            backgroundImage: `url(${
              locationBackgrounds[data.location as keyof typeof locationBackgrounds].blur
            })`,
            backgroundSize: data.location === "garden" ? "200px 200px" : "cover",
            backgroundPosition: "center",
            backgroundRepeat: data.location === "garden" ? "repeat" : "no-repeat",
            filter: 'blur(8px) brightness(0.9)',
            transform: 'scale(1.1)', // Prevent blur edges
            opacity: isBackgroundLoaded ? 0 : 1,
          }}
        />

        {/* Full quality background */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            height: "500px",
            backgroundImage: `url(${
              locationBackgrounds[data.location as keyof typeof locationBackgrounds].full
            })`,
            backgroundSize: data.location === "garden" ? "200px 200px" : "cover",
            backgroundPosition: "center",
            backgroundRepeat: data.location === "garden" ? "repeat" : "no-repeat",
            opacity: isBackgroundLoaded ? 1 : 0,
          }}
        />

        {/* Loading spinner */}
        {!isBackgroundLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 ${
            data.location === 'garden' 
              ? 'bg-gradient-to-b from-transparent to-black/5' 
              : data.location === 'indoor' || data.location === 'windowsill'
              ? 'bg-gradient-to-b from-transparent to-black/10'
              : 'bg-gradient-to-b from-transparent to-black/15'
          }`}
        />

        {/* Plant positions */}
        <div className="relative" style={{ height: "500px" }}>
          {plantPositions.map((plant, index) => (
            <motion.div
              key={plant.id}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${plant.position.x}%`,
                top: `${plant.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedPlant(plant)}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="rounded-full overflow-hidden bg-white border-4 border-primary shadow-lg relative"
                style={{
                  width: `${plant.scale * 1.5}px`,
                  height: `${plant.scale * 1.5}px`,
                  minWidth: "60px",
                  minHeight: "60px",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
              >
                <img
                  src={failedImages[plant.id] ? "/images/plants/placeholder-plant.png" : plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setFailedImages(prev => ({
                      ...prev,
                      [plant.id]: true
                    }));
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {recommendedPlants.length === 0 && (
        <div className="p-4 text-center bg-neutral-100 rounded-lg">
          <p className="text-neutral-600">
            No plants match your criteria. Try adjusting your preferences.
          </p>
        </div>
      )}

      <Dialog
        open={!!selectedPlant}
        onOpenChange={() => setSelectedPlant(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          {selectedPlant && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPlant.name}</DialogTitle>
                <DialogDescription className="italic">
                  {selectedPlant.scientificName}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="rounded-lg overflow-hidden h-48 bg-neutral-100">
                  <img
                    src={selectedPlant.image}
                    alt={selectedPlant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ScrollArea className="h-48">
                  <div className="pr-4">
                    <p className="text-sm text-neutral-600">
                      {selectedPlant.description}
                    </p>
                  </div>
                </ScrollArea>
              </div>

              <div className="mt-2 space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Plant Care
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Droplets className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">Water</p>
                      <p className="text-xs text-neutral-500">
                        {selectedPlant.care.water}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Sun className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">Light</p>
                      <p className="text-xs text-neutral-500">
                        {selectedPlant.care.light}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <ThermometerSun className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">Temp</p>
                      <p className="text-xs text-neutral-500">
                        {selectedPlant.care.temperature}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlantVisualization;
