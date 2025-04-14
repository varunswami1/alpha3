import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Loader, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showTerms, setShowTerms] = useState(false); 

  // Get the redirect path if any
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Terms & Conditions",
        description: "You must agree to the terms and conditions to proceed.",
      });
      return;
    }

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please enter both email and password.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Navigate to the page the user was trying to access, or dashboard
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Terms & Conditions",
        description: "You must agree to the terms and conditions to proceed.",
      });
      return;
    }

    toast({
      title: "Google Login",
      description:
        "Redirecting to Google for authentication... (Not implemented yet)",
    });
    // In a real app, this would trigger Google OAuth
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
      user.firstName || "",
      user.lastName || "",
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
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-semibold">Plantona</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none"
              >
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-primary hover:underline"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>    
            {showTerms && (
              <div className="text-sm bg-gray-100 rounded-md p-3 max-h-60 overflow-auto border">
                <h3 className="font-semibold mb-2">Terms & Conditions</h3>
                <p className="mb-2">
                  By using this application, you agree to provide accurate information and not misuse the platform.
                  We are not liable for data loss, unauthorized access, or technical disruptions.
                </p>
                <p className="mb-2">
                  You must comply with all applicable laws while using the app. All user data is handled according to
                  our privacy policy. You consent to allow us to store and process your data as described.
                </p>
                <p className="mb-2">
                  Violation of these terms may result in suspension or permanent ban from the service.
                </p>
                <p>
                  These terms may be updated from time to time. It is your responsibility to check for changes.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Signing In
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full"
              disabled={isSubmitting}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </Button>

            <Button
              type="button"
              onClick={exportCredentialsToCSV}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export User Credentials
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
