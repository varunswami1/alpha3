
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Droplets, Sun, DollarSign, Clock, Sprout, Thermometer } from "lucide-react";

interface PlantFilterDialogProps {
  onClose: () => void;
}

const PlantFilterDialog: React.FC<PlantFilterDialogProps> = ({ onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [waterNeeds, setWaterNeeds] = useState<string[]>([]);
  const [sunNeeds, setSunNeeds] = useState<string[]>([]);
  const [growingSpace, setGrowingSpace] = useState([10]); // in sq ft
  const [growingTime, setGrowingTime] = useState([3]); // in months
  const [frostTolerance, setFrostTolerance] = useState<string[]>([]);
  const [heatTolerance, setHeatTolerance] = useState<string[]>([]);
  
  const categories = [
    { id: "vegetables", label: "Vegetables" },
    { id: "flowers", label: "Flowers" },
    { id: "herbs", label: "Herbs" },
    { id: "fruits", label: "Fruits" },
    { id: "root", label: "Root Plants" },
    { id: "stem", label: "Stem Plants" },
  ];
  
  const waterLevels = [
    { id: "low", label: "Low", icon: Droplets },
    { id: "medium", label: "Medium", icon: Droplets },
    { id: "high", label: "High", icon: Droplets },
  ];
  
  const sunLevels = [
    { id: "full", label: "Full Sun", icon: Sun },
    { id: "partial", label: "Partial Sun", icon: Sun },
    { id: "shade", label: "Shade", icon: Sun },
  ];
  
  const costLevels = [
    { id: "low", label: "Low Cost", icon: DollarSign },
    { id: "medium", label: "Medium Cost", icon: DollarSign },
    { id: "high", label: "High Cost", icon: DollarSign },
  ];
  
  const toleranceLevels = [
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleWaterChange = (level: string) => {
    setWaterNeeds(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const handleSunChange = (level: string) => {
    setSunNeeds(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const handleFrostToleranceChange = (level: string) => {
    setFrostTolerance(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const handleHeatToleranceChange = (level: string) => {
    setHeatTolerance(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const handleApplyFilters = () => {
    // In a real app, you'd pass these filter states to a parent component or a state manager
    console.log({
      selectedCategories,
      waterNeeds,
      sunNeeds,
      growingSpace,
      growingTime,
      frostTolerance,
      heatTolerance
    });
    onClose();
  };
  
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setWaterNeeds([]);
    setSunNeeds([]);
    setGrowingSpace([10]);
    setGrowingTime([3]);
    setFrostTolerance([]);
    setHeatTolerance([]);
  };
  
  return (
    <div className="space-y-4 my-2">
      <Accordion type="multiple" defaultValue={["categories", "water-sun"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Plant Categories</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="water-sun">
          <AccordionTrigger>Water & Sunlight Needs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                  Water Needs
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {waterLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`water-${level.id}`} 
                        checked={waterNeeds.includes(level.id)}
                        onCheckedChange={() => handleWaterChange(level.id)}
                      />
                      <Label 
                        htmlFor={`water-${level.id}`}
                        className="cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                  Sunlight Needs
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {sunLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sun-${level.id}`} 
                        checked={sunNeeds.includes(level.id)}
                        onCheckedChange={() => handleSunChange(level.id)}
                      />
                      <Label 
                        htmlFor={`sun-${level.id}`}
                        className="cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="growing-requirements">
          <AccordionTrigger>Growing Requirements</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Sprout className="h-4 w-4 mr-1 text-green-500" />
                    Growing Space
                  </h4>
                  <span className="text-sm">{growingSpace[0]} sq ft</span>
                </div>
                <Slider 
                  value={growingSpace} 
                  min={1} 
                  max={50} 
                  step={1} 
                  onValueChange={setGrowingSpace} 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    Growing Time
                  </h4>
                  <span className="text-sm">Up to {growingTime[0]} months</span>
                </div>
                <Slider 
                  value={growingTime} 
                  min={1} 
                  max={12} 
                  step={1} 
                  onValueChange={setGrowingTime} 
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="tolerance">
          <AccordionTrigger>Climate Tolerance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                  Frost Tolerance
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {toleranceLevels.map((level) => (
                    <div key={`frost-${level.id}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`frost-${level.id}`} 
                        checked={frostTolerance.includes(level.id)}
                        onCheckedChange={() => handleFrostToleranceChange(level.id)}
                      />
                      <Label 
                        htmlFor={`frost-${level.id}`}
                        className="cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                  Heat Tolerance
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {toleranceLevels.map((level) => (
                    <div key={`heat-${level.id}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`heat-${level.id}`} 
                        checked={heatTolerance.includes(level.id)}
                        onCheckedChange={() => handleHeatToleranceChange(level.id)}
                      />
                      <Label 
                        htmlFor={`heat-${level.id}`}
                        className="cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default PlantFilterDialog;
