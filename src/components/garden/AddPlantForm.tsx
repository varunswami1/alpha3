
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddPlantFormProps {
  onSuccess: () => void;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      image: "",
      description: "",
      plantedDate: new Date().toISOString().split('T')[0],
      wateringNeeds: "",
      sunlightNeeds: "",
      soilType: "",
    },
  });

  const onSubmit = (data: any) => {
    // In a real app, you would save this data to your backend
    console.log("Form submitted:", data);
    
    toast({
      title: "Plant added",
      description: `${data.name} has been added to your garden!`,
    });
    
    // Reset form and close dialog
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Tomato Plant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plant type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Vegetable">Vegetable</SelectItem>
                    <SelectItem value="Flower">Flower</SelectItem>
                    <SelectItem value="Herb">Herb</SelectItem>
                    <SelectItem value="Fruit">Fruit</SelectItem>
                    <SelectItem value="Tree">Tree</SelectItem>
                    <SelectItem value="Houseplant">Houseplant</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormDescription>
                  URL to an image of your plant
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="plantedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Planting Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="wateringNeeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Watering Needs</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select watering needs" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sunlightNeeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sunlight Needs</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sunlight needs" />
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
            name="soilType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soil Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                    <SelectItem value="peaty">Peaty</SelectItem>
                    <SelectItem value="chalky">Chalky</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional details about your plant..." 
                  {...field} 
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Add Plant</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPlantForm;
