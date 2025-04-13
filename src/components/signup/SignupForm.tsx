
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PersonalInfoFields from "./PersonalInfoFields";
import AddressFields from "./AddressFields";
import TermsAndConditions from "./TermsAndConditions";

// Define the signup schema
const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  addressLine: z.string().min(5, { message: "Address must be at least 5 characters." }),
  state: z.string().min(1, { message: "Please select a state." }),
  district: z.string().min(1, { message: "Please select a district." }),
  city: z.string().min(1, { message: "Please select a city." }),
  pincode: z.string().min(6, { message: "Please enter a valid 6-digit pincode." }),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  })
});

export type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      addressLine: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
      agreedToTerms: false,
    },
  });

  const handleSubmit = (data: SignupFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <PersonalInfoFields control={form.control} />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Address Information</h2>
          <AddressFields control={form.control} />
        </div>
        
        <TermsAndConditions control={form.control} />
        
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
