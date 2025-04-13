import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export interface RecommendationFormData {
  area: number;
  climate: string;
  humidity: number;
  sunlight: string;
  plantCategory: string;
  location: string; // Added location field
}

const formSchema = z.object({
  area: z
    .number()
    .min(1, "Area must be at least 1 sq ft")
    .max(1000, "Area must be less than 1000 sq ft"),
  climate: z.string().min(1, "Please select a climate"),
  humidity: z.number().min(0).max(100),
  sunlight: z.string().min(1, "Please select sunlight exposure"),
  plantCategory: z.string().min(1, "Please select a plant category"),
  location: z.string().min(1, "Please select a location"), // Added location validation
});

interface PlantRecommendationFormProps {
  onSubmit: (data: RecommendationFormData) => void;
}

const PlantRecommendationForm = ({
  onSubmit,
}: PlantRecommendationFormProps) => {
  const [sliderValue, setSliderValue] = useState(50);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 100,
      climate: "moderate",
      humidity: 50,
      sunlight: "partial",
      plantCategory: "succulents",
      location: "garden", // Default location
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as RecommendationFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Garden Area (sq ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  placeholder="Garden area in square feet"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="climate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Climate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your climate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="humidity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Humidity: {sliderValue}%</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[sliderValue]}
                  onValueChange={(values) => {
                    setSliderValue(values[0]);
                    field.onChange(values[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sunlight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sunlight Exposure</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sunlight exposure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full">Full Sun</SelectItem>
                  <SelectItem value="partial">Partial Sun</SelectItem>
                  <SelectItem value="shade">Shade</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plantCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plant category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="succulents">Succulents</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                  <SelectItem value="flowers">Flowers</SelectItem>
                  <SelectItem value="palms">Palms</SelectItem>
                  <SelectItem value="trees">Trees</SelectItem>
                  <SelectItem value="shrubs">Shrubs</SelectItem>
                  <SelectItem value="foliage">Foliage</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Growing Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="garden">Garden/Yard</SelectItem>
                  <SelectItem value="balcony">Balcony</SelectItem>
                  <SelectItem value="terrace">Terrace/Rooftop</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="windowsill">Windowsill</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Generate Recommendations
        </Button>
      </form>
    </Form>
  );
};

export default PlantRecommendationForm;
