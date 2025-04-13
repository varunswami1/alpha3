import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout, Shovel, TreeDeciduous, MapPin, Clock, LandPlot } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const pollFormSchema = z.object({
  experience: z.enum(["beginner", "skilled", "master"], {
    required_error: "Please select your gardening experience level.",
  }),
  location: z.string().min(1, "Please select your location."),
  timeSpent: z.enum(["less-than-1", "1-to-3", "3-to-5", "more-than-5"], {
    required_error: "Please select how much time you can spend gardening.",
  }),
  gardenSpace: z.enum(["small", "medium", "large"], {
    required_error: "Please select your garden space size.",
  }),
});

type PollFormValues = z.infer<typeof pollFormSchema>;

interface GardeningPollProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
  userName?: string;
}

const GardeningPoll = ({ isOpen, onComplete, onSkip, userName }: GardeningPollProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<PollFormValues>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      experience: undefined,
      location: "",
      timeSpent: undefined,
      gardenSpace: undefined,
    },
  });

  const handleSkip = () => {
    onSkip();
    toast({
      title: "Poll skipped",
      description: "You can always take the poll later from your profile.",
    });
  };

  const handleSubmit = (data: PollFormValues) => {
    console.log("Poll submitted:", data);
    
    toast({
      title: "Thanks for your feedback!",
      description: "We'll use this to customize your gardening experience.",
    });
    
    onComplete();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const locations = [
    "Urban", "Suburban", "Rural", "Coastal", "Mountain", "Desert", "Tropical"
  ];

  const personalizedTitle = userName ? `Help Us Customize Your Gardening Journey, ${userName}` : "Help Us Customize Your Gardening Journey";

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{personalizedTitle}</DialogTitle>
          <DialogDescription>
            Tell us a bit about your gardening goals and situation so we can provide you with the most relevant content.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What's your gardening experience level?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                        >
                          <Card className={`cursor-pointer border-2 ${field.value === 'beginner' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <Sprout className="mx-auto h-8 w-8 mb-2" />
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="beginner" className="sr-only" /> 
                                Beginner
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === 'skilled' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <Shovel className="mx-auto h-8 w-8 mb-2" />
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="skilled" className="sr-only" /> 
                                Skilled
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === 'master' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <TreeDeciduous className="mx-auto h-8 w-8 mb-2" />
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="master" className="sr-only" /> 
                                Master
                              </FormLabel>
                            </CardContent>
                          </Card>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What type of location do you garden in?</FormLabel>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your location type" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location.toLowerCase()}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="timeSpent"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How many hours per week can you spend gardening?</FormLabel>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          <Card className={`cursor-pointer border-2 ${field.value === 'less-than-1' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="less-than-1" className="sr-only" /> 
                                Less than 1 hour
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === '1-to-3' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="1-to-3" className="sr-only" /> 
                                1-3 hours
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === '3-to-5' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="3-to-5" className="sr-only" /> 
                                3-5 hours
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === 'more-than-5' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="more-than-5" className="sr-only" /> 
                                More than 5 hours
                              </FormLabel>
                            </CardContent>
                          </Card>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="gardenSpace"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What size is your gardening space?</FormLabel>
                      <div className="flex items-center gap-2 mb-2">
                        <LandPlot className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-3 gap-3"
                        >
                          <Card className={`cursor-pointer border-2 ${field.value === 'small' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="small" className="sr-only" /> 
                                Small
                                <p className="text-xs text-muted-foreground">Balcony/Windowsill</p>
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === 'medium' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="medium" className="sr-only" /> 
                                Medium
                                <p className="text-xs text-muted-foreground">Small Yard/Patio</p>
                              </FormLabel>
                            </CardContent>
                          </Card>
                          <Card className={`cursor-pointer border-2 ${field.value === 'large' ? 'border-primary' : 'border-muted'}`}>
                            <CardContent className="pt-4 text-center">
                              <FormLabel className="cursor-pointer font-medium">
                                <RadioGroupItem value="large" className="sr-only" /> 
                                Large
                                <p className="text-xs text-muted-foreground">Garden/Land Plot</p>
                              </FormLabel>
                            </CardContent>
                          </Card>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            <DialogFooter className="flex justify-between items-center mt-6">
              <div>
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
                {step < 4 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={
                      (step === 1 && !form.getValues().experience) ||
                      (step === 2 && !form.getValues().location) ||
                      (step === 3 && !form.getValues().timeSpent)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GardeningPoll;
