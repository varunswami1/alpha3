import { useState } from "react";
import {
  Menu,
  Settings,
  HelpCircle,
  LogOut,
  UserPlus,
  Star,
  Crown,
  Bell,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";

const NotificationList = () => {
  const notifications = [
    {
      title: "Water your plants!",
      message: "Your tomato plants need watering today.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      title: "New article available",
      message: "Check out our latest guide on indoor plants.",
      time: "Yesterday",
      isRead: true,
    },
    {
      title: "Plant disease alert",
      message: "Possible pest detected in your garden.",
      time: "3 days ago",
      isRead: true,
    },
  ];

  return (
    <div className="w-full max-h-[400px] overflow-auto">
      <div className="flex justify-between items-center px-2 py-2 border-b">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </div>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`p-3 border-b hover:bg-neutral-50 transition-colors ${
            !notification.isRead ? "bg-neutral-50" : ""
          }`}
        >
          <div className="flex justify-between">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <span className="text-xs text-neutral-500">
              {notification.time}
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            {notification.message}
          </p>
        </div>
      ))}
      <div className="p-2 text-center">
        <Link
          to="/notifications"
          className="text-primary text-sm font-medium hover:underline"
        >
          See all notifications
        </Link>
      </div>
    </div>
  );
};

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between">
        {/* Mobile menu and Logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] sm:w-[300px] bg-white"
            >
              <div className="flex flex-col gap-4 py-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/community"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  Community & Learning
                </Link>
                <Link
                  to="/garden"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  My Garden
                </Link>
                <Link
                  to="/plant-search"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  Search Plant
                </Link>
                <Link
                  to="/plant-recommendation"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  Plant Recommendations
                </Link>
                <Link
                  to="/shop"
                  className="px-4 py-2 hover:bg-neutral-100 rounded-md"
                >
                  Shop
                </Link>

                <div className="border-t my-2 pt-2">
                  <div className="px-4 py-2 text-sm font-medium text-neutral-500">
                    Account
                  </div>
                  <Link
                    to="/profile"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Help</span>
                  </Link>
                  <Link
                    to="/invite"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Invite Gardeners</span>
                  </Link>
                  <Link
                    to="/rate"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <Star className="h-4 w-4" />
                    <span>Rate our App</span>
                  </Link>
                  <Link
                    to="/premium"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Upgrade to Premium</span>
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-2 flex items-center gap-2 hover:bg-neutral-100 rounded-md"
                    >
                      <User className="h-4 w-4" />
                      <span>Log In</span>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="text-2xl font-bold">
            Plantona
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/community"
            className="text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            Community & Learning
          </Link>
          <Link
            to="/garden"
            className="text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            My Garden
          </Link>
          <Link
            to="/plant-search"
            className="text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            Search Plant
          </Link>
          <Link
            to="/plant-recommendation"
            className="text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            Recommendations
          </Link>
        </div>

        {/* Right side elements */}
        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-80 p-0 bg-white shadow-lg border"
            >
              <NotificationList />
            </PopoverContent>
          </Popover>

          {/* Shopping Cart Link */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/shop">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shop</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            /* Profile Dropdown Menu when logged in */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white shadow-lg border"
              >
                <DropdownMenuLabel>
                  {user?.firstName ? `Hi, ${user.firstName}` : "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="flex items-center cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite Gardeners</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Rate our App</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Upgrade to Premium</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Login Button when logged out */
            <Button
              className="rounded-full bg-primary text-white hover:bg-primary/90"
              asChild
            >
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
