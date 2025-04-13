
import { useState } from "react";
import { 
  Languages, Globe, Clock, DollarSign, 
  Sun, Moon, Type, Zap, RotateCcw, 
  Bell, Droplets, Cloud, MessageSquare, ShoppingBag, Clock4, 
  Lock, MapPin, KeyRound, Download, BarChart4,
  User, Leaf, Heart, Mail, BrainCircuit,
  Smartphone, CloudUpload, Key, Share2, Mic,
  HelpCircle, MessageCircle, Flag, FlaskConical
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const SettingsSection = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-8 border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-primary">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const SettingItem = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("language");
  
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs 
          defaultValue="language" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full mb-6 flex flex-wrap h-auto p-1 bg-neutral-200">
            <TabsTrigger value="language" className="flex-1 py-2">Language & Regional</TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1 py-2">Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 py-2">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1 py-2">Privacy</TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 py-2">Profile</TabsTrigger>
            <TabsTrigger value="connectivity" className="flex-1 py-2">Connectivity</TabsTrigger>
            <TabsTrigger value="support" className="flex-1 py-2">Support</TabsTrigger>
          </TabsList>
          
          {/* Language & Regional Settings */}
          <TabsContent value="language">
            <SettingsSection title="Language & Regional Settings" icon={<Globe className="w-5 h-5" />}>
              <SettingItem 
                icon={<Languages className="w-4 h-4" />} 
                title="Language Selection"
                description="Choose your preferred language"
              >
                <Select defaultValue="english">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              
              <SettingItem 
                icon={<Clock className="w-4 h-4" />} 
                title="Date & Time Format"
                description="Choose your preferred time format"
              >
                <RadioGroup defaultValue="12hour" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12hour" id="12hour" />
                    <Label htmlFor="12hour">12-hour</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24hour" id="24hour" />
                    <Label htmlFor="24hour">24-hour</Label>
                  </div>
                </RadioGroup>
              </SettingItem>
              
              <SettingItem 
                icon={<Globe className="w-4 h-4" />} 
                title="Time Zone Auto-Detection"
                description="Let the app detect your timezone automatically"
              >
                <Switch id="timezone-auto" />
              </SettingItem>
              
              <SettingItem 
                icon={<DollarSign className="w-4 h-4" />} 
                title="Currency for Purchases"
                description="Select your preferred currency for transactions"
              >
                <Select defaultValue="inr">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="jpy">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* Appearance & Display */}
          <TabsContent value="appearance">
            <SettingsSection title="Appearance & Display" icon={<Sun className="w-5 h-5" />}>
              <SettingItem 
                icon={<Moon className="w-4 h-4" />} 
                title="Theme Mode"
                description="Choose your preferred app theme"
              >
                <Select defaultValue="light">
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              
              <SettingItem 
                icon={<Type className="w-4 h-4" />} 
                title="Font Size & Style"
                description="Adjust text size for better readability"
              >
                <Select defaultValue="medium">
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              
              <SettingItem 
                icon={<Zap className="w-4 h-4" />} 
                title="High Contrast Mode"
                description="Enable for better visibility and accessibility"
              >
                <Switch id="high-contrast" />
              </SettingItem>
              
              <SettingItem 
                icon={<RotateCcw className="w-4 h-4" />} 
                title="Animations & Transitions"
                description="Enable smooth animations throughout the app"
              >
                <Switch id="animations" defaultChecked />
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* Notifications & Alerts */}
          <TabsContent value="notifications">
            <SettingsSection title="Notifications & Alerts" icon={<Bell className="w-5 h-5" />}>
              <SettingItem 
                icon={<Bell className="w-4 h-4" />} 
                title="Notification Type"
                description="Choose how you want to receive notifications"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-notify" defaultChecked />
                    <Label htmlFor="push-notify">Push</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-notify" />
                    <Label htmlFor="email-notify">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms-notify" />
                    <Label htmlFor="sms-notify">SMS</Label>
                  </div>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<Droplets className="w-4 h-4" />} 
                title="Plant Care Reminders"
                description="Get reminded about your plant care schedule"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="watering-reminder" defaultChecked />
                    <Label htmlFor="watering-reminder">Watering</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fertilizing-reminder" defaultChecked />
                    <Label htmlFor="fertilizing-reminder">Fertilizing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pruning-reminder" defaultChecked />
                    <Label htmlFor="pruning-reminder">Pruning</Label>
                  </div>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<Cloud className="w-4 h-4" />} 
                title="Weather-Based Alerts"
                description="Receive alerts based on local weather conditions"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="frost-warning" defaultChecked />
                    <Label htmlFor="frost-warning">Frost warning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="heatwave-alert" defaultChecked />
                    <Label htmlFor="heatwave-alert">Heatwave</Label>
                  </div>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<MessageSquare className="w-4 h-4" />} 
                title="Community Updates"
                description="Get notified about community activity"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="forum-replies" defaultChecked />
                    <Label htmlFor="forum-replies">Forum replies</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-content" defaultChecked />
                    <Label htmlFor="new-content">New content</Label>
                  </div>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<ShoppingBag className="w-4 h-4" />} 
                title="Shopping & Deals"
                description="Receive notifications about sales and special offers"
              >
                <Switch id="shopping-deals" defaultChecked />
              </SettingItem>
              
              <SettingItem 
                icon={<Clock4 className="w-4 h-4" />} 
                title="Quiet Hours"
                description="Set times when you don't want to be disturbed"
              >
                <div className="flex space-x-2 items-center">
                  <Input type="time" className="w-24" defaultValue="22:00" />
                  <span>to</span>
                  <Input type="time" className="w-24" defaultValue="07:00" />
                </div>
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* Privacy & Security */}
          <TabsContent value="privacy">
            <SettingsSection title="Privacy & Security" icon={<Lock className="w-5 h-5" />}>
              <SettingItem 
                icon={<Lock className="w-4 h-4" />} 
                title="Account Privacy"
                description="Control who can see your garden and activity"
              >
                <Select defaultValue="friends">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              
              <SettingItem 
                icon={<MapPin className="w-4 h-4" />} 
                title="Location Services"
                description="Allow GPS for weather-based recommendations"
              >
                <Switch id="location-services" defaultChecked />
              </SettingItem>
              
              <SettingItem 
                icon={<KeyRound className="w-4 h-4" />} 
                title="Two-Factor Authentication (2FA)"
                description="Add extra security to your account"
              >
                <Switch id="two-factor" />
              </SettingItem>
              
              <SettingItem 
                icon={<Download className="w-4 h-4" />} 
                title="Download & Delete Data"
                description="Export or remove your plant care data"
              >
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Download</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<BarChart4 className="w-4 h-4" />} 
                title="Ad Preferences"
                description="Control personalized advertisements"
              >
                <Switch id="personalized-ads" defaultChecked />
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* User Profile & Personalization */}
          <TabsContent value="profile">
            <SettingsSection title="User Profile & Personalization" icon={<User className="w-5 h-5" />}>
              <SettingItem 
                icon={<User className="w-4 h-4" />} 
                title="Profile Picture & Name"
                description="Customize how others see you"
              >
                <Button variant="outline" size="sm">Edit Profile</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<Leaf className="w-4 h-4" />} 
                title="Gardening Level"
                description="Set your experience level"
              >
                <Select defaultValue="intermediate">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              
              <SettingItem 
                icon={<Heart className="w-4 h-4" />} 
                title="Favourite Plant Categories"
                description="Select your plant preferences"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="indoor-plants" defaultChecked />
                    <Label htmlFor="indoor-plants">Indoor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="outdoor-plants" defaultChecked />
                    <Label htmlFor="outdoor-plants">Outdoor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hydroponics" />
                    <Label htmlFor="hydroponics">Hydroponics</Label>
                  </div>
                </div>
              </SettingItem>
              
              <SettingItem 
                icon={<Mail className="w-4 h-4" />} 
                title="Daily Summary Emails"
                description="Receive daily plant care reports"
              >
                <Switch id="daily-summary" />
              </SettingItem>
              
              <SettingItem 
                icon={<BrainCircuit className="w-4 h-4" />} 
                title="Personalized AI Suggestions"
                description="Get tailored plant recommendations"
              >
                <Switch id="ai-suggestions" defaultChecked />
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* Connectivity & Integrations */}
          <TabsContent value="connectivity">
            <SettingsSection title="Connectivity & Integrations" icon={<Share2 className="w-5 h-5" />}>
              <SettingItem 
                icon={<Smartphone className="w-4 h-4" />} 
                title="Smart Device Integration"
                description="Connect to sensors and garden tech"
              >
                <Button variant="outline" size="sm">Connect Devices</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<CloudUpload className="w-4 h-4" />} 
                title="Cloud Sync"
                description="Back up your plant data to the cloud"
              >
                <Switch id="cloud-sync" defaultChecked />
              </SettingItem>
              
              <SettingItem 
                icon={<Key className="w-4 h-4" />} 
                title="API Access"
                description="For third-party integrations"
              >
                <Button variant="outline" size="sm">Manage Keys</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<Share2 className="w-4 h-4" />} 
                title="Social Media Sharing"
                description="Share your garden progress on social media"
              >
                <Switch id="social-sharing" defaultChecked />
              </SettingItem>
              
              <SettingItem 
                icon={<Mic className="w-4 h-4" />} 
                title="Voice Assistant Support"
                description="Connect to Google Assistant or Alexa"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="google-assistant" />
                    <Label htmlFor="google-assistant">Google Assistant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="alexa" />
                    <Label htmlFor="alexa">Alexa</Label>
                  </div>
                </div>
              </SettingItem>
            </SettingsSection>
          </TabsContent>
          
          {/* Support & Help */}
          <TabsContent value="support">
            <SettingsSection title="Support & Help" icon={<HelpCircle className="w-5 h-5" />}>
              <SettingItem 
                icon={<HelpCircle className="w-4 h-4" />} 
                title="FAQs & Tutorials"
                description="Get help with common questions"
              >
                <Button variant="outline" size="sm">View Help Center</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<MessageCircle className="w-4 h-4" />} 
                title="Live Chat Support"
                description="Connect with gardening experts"
              >
                <Button variant="outline" size="sm">Start Chat</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<Flag className="w-4 h-4" />} 
                title="Feedback & Bug Reporting"
                description="Help us improve the app"
              >
                <Button variant="outline" size="sm">Send Feedback</Button>
              </SettingItem>
              
              <SettingItem 
                icon={<FlaskConical className="w-4 h-4" />} 
                title="Beta Features"
                description="Try experimental features"
              >
                <Switch id="beta-features" />
              </SettingItem>
            </SettingsSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;