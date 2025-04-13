import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface UserCredential extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    const checkLocalAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          // Only store non-sensitive user info in the current session
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user data", e);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    // Small timeout to simulate checking auth status
    const timer = setTimeout(checkLocalAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simple validation
      if (!email || !email.includes("@") || password.length < 6) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description:
            "Please enter a valid email and password (min 6 characters).",
        });
        return false;
      }

      // Simulate network request with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get all stored users
      const storedUsersString = localStorage.getItem("users");
      const storedUsers: UserCredential[] = storedUsersString
        ? JSON.parse(storedUsersString)
        : [];

      // Check if user exists
      const existingUser = storedUsers.find((u) => u.email === email);

      if (existingUser) {
        // User exists, verify password
        if (existingUser.password !== password) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Incorrect password. Please try again.",
          });
          setIsLoading(false);
          return false;
        }

        // Password is correct, log in user
        const userWithoutPassword: User = {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
        };

        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));

        toast({
          title: "Login successful",
          description: `Welcome back, ${
            existingUser.firstName || email.split("@")[0]
          }!`,
        });

        setIsLoading(false);
        return true;
      } else {
        // User doesn't exist, redirect to signup
        toast({
          variant: "destructive",
          title: "Account not found",
          description:
            "No account found with this email. Please sign up first.",
        });

        setIsLoading(false);
        navigate("/signup");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
