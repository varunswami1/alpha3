
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import SignupForm from "@/components/signup/SignupForm";
import type { SignupFormValues } from "@/components/signup/SignupForm";
import GardeningPoll from "@/components/landing/GardeningPoll";

const Signup = () => {
  const { toast } = useToast();
  const [showPoll, setShowPoll] = useState(false);
  const [formData, setFormData] = useState<SignupFormValues | null>(null);
  const navigate = useNavigate();

  const onSubmit = (data: SignupFormValues) => {
    setFormData(data);
    setShowPoll(true);
    
    toast({
      title: "Account created",
      description: `Welcome, ${data.firstName}! Your account has been created.`,
    });
    console.log("Form submitted:", data);
    // In a real app, this would register the user and redirect
  };

  const onPollComplete = () => {
    // In a real app, we would save the user's preferences to their profile
    // and redirect them to the dashboard
    navigate("/");
  };

  const onPollSkip = () => {
    // In a real app, we would just redirect the user to the dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-4">
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-semibold">Lovely</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Create Your Account</h1>
          <p className="text-neutral-600 mt-2">Fill in your details to get started</p>
        </div>

        <SignupForm onSubmit={onSubmit} />

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      {showPoll && formData && (
        <GardeningPoll 
          isOpen={showPoll} 
          onComplete={onPollComplete} 
          onSkip={onPollSkip}
          userName={formData.firstName}
        />
      )}
    </div>
  );
};

export default Signup;
