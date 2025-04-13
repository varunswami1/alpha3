import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phoneNumber: string;
  addressLine: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
}

const UserProfile = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [profile, setProfile] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "A short bio about the user.",
    phoneNumber: "",
    addressLine: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
  });

  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user data from localStorage
  useEffect(() => {
    if (user) {
      // Get all users from localStorage
      const storedUsersString = localStorage.getItem("users");
      if (storedUsersString) {
        const storedUsers = JSON.parse(storedUsersString);

        // Find the current user by email
        const currentUser = storedUsers.find(
          (u: any) => u.email === user.email
        );

        if (currentUser) {
          // Update profile state with user data
          setProfile({
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            email: currentUser.email || "",
            bio: "A short bio about the user.", // Default bio
            phoneNumber: currentUser.phoneNumber || "",
            addressLine: currentUser.addressLine || "",
            state: currentUser.state || "",
            district: currentUser.district || "",
            city: currentUser.city || "",
            pincode: currentUser.pincode || "",
          });
        }
      }
    }
  }, [user]);

  const handleNotificationChange = (type: string, checked: CheckedState) => {
    // Use the proper type for checked state
    if (checked === true || checked === false) {
      setNotifications((prev) => ({
        ...prev,
        [type]: checked,
      }));
    }
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to update your profile.",
      });
      return;
    }

    // Get all users from localStorage
    const storedUsersString = localStorage.getItem("users");
    if (storedUsersString) {
      const storedUsers = JSON.parse(storedUsersString);

      // Find and update the current user
      const updatedUsers = storedUsers.map((u: any) => {
        if (u.email === user.email) {
          return {
            ...u,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phoneNumber: profile.phoneNumber,
            addressLine: profile.addressLine,
            state: profile.state,
            district: profile.district,
            city: profile.city,
            pincode: profile.pincode,
          };
        }
        return u;
      });

      // Update localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Also update the current user session
      const updatedUser = {
        ...user,
        firstName: profile.firstName,
        lastName: profile.lastName,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 pt-20">
      <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile Avatar"
                />
                <AvatarFallback>
                  {profile.firstName && profile.lastName
                    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(
                        0
                      )}`
                    : "UK"}
                </AvatarFallback>
              </Avatar>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  placeholder="Write a short bio about yourself"
                />
              </div>

              <div className="space-y-4 mt-4">
                <h3 className="text-md font-medium">Address Information</h3>
                <div>
                  <Label htmlFor="addressLine">Address Line</Label>
                  <Input
                    type="text"
                    id="addressLine"
                    name="addressLine"
                    value={profile.addressLine}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      value={profile.state}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      type="text"
                      id="district"
                      name="district"
                      value={profile.district}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={profile.city}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={profile.pincode}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Side: Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Checkbox
                id="emailNotifications"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  handleNotificationChange("email", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <Checkbox
                id="pushNotifications"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  handleNotificationChange("push", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Checkbox
                id="smsNotifications"
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  handleNotificationChange("sms", checked)
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
