import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import SignupForm from "@/components/signup/SignupForm";
import type { SignupFormValues } from "@/components/signup/SignupForm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: SignupFormValues) => {
    // Store the new user in the localStorage
    const storedUsersString = localStorage.getItem("users");
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];

    // Check if email already exists
    const emailExists = storedUsers.some(
      (user: any) => user.email === data.email
    );

    if (emailExists) {
      toast({
        variant: "destructive",
        title: "Email already registered",
        description:
          "An account with this email already exists. Please log in instead.",
      });
      navigate("/login");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      addressLine: data.addressLine,
      state: data.state,
      district: data.district,
      city: data.city,
      pincode: data.pincode,
    };

    // Store with all data (including password) in users array
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // For current session, store user without sensitive data
    const userWithoutPassword = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    toast({
      title: "Account created",
      description: `Welcome, ${data.firstName}! Your account has been created.`,
    });

    // Redirect to dashboard after signup
    navigate("/dashboard");
  };

  const exportCredentialsToCSV = () => {
    const storedUsersString = localStorage.getItem("users");
    if (!storedUsersString) {
      toast({
        variant: "destructive",
        title: "No users found",
        description: "There are no users registered yet.",
      });
      return;
    }

    const users = JSON.parse(storedUsersString);

    // Create CSV content
    const headers = [
      "ID",
      "Email",
      "First Name",
      "Last Name",
      "Password",
      "Phone Number",
      "Address",
      "State",
      "District",
      "City",
      "Pincode",
    ];
    const rows = users.map((user: any) => [
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.password,
      user.phoneNumber || "",
      user.addressLine || "",
      user.state || "",
      user.district || "",
      user.city || "",
      user.pincode || "",
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row: any) => {
      csvContent += row.join(",") + "\n";
    });

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "user_credentials.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Credentials exported",
      description: "User credentials have been exported to CSV successfully.",
    });
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
          <p className="text-neutral-600 mt-2">
            Fill in your details to get started
          </p>
        </div>

        <SignupForm onSubmit={onSubmit} />

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <Button
            variant="outline"
            className="mt-4 flex items-center gap-2"
            onClick={exportCredentialsToCSV}
          >
            <Download className="h-4 w-4" />
            Export Credentials to CSV
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
