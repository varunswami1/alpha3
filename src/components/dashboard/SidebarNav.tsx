import { Link, useLocation } from "react-router-dom";
import {
  Book,
  Calendar,
  Home,
  MessageCircle,
  Flower,
  Search,
  ShoppingBag,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "My Garden",
    icon: Flower,
    href: "/garden",
  },
  {
    label: "Plant Search",
    icon: Search,
    href: "/plant-search",
  },
  {
    label: "Recommendations",
    icon: Sprout,
    href: "/plant-recommendation",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    label: "Community",
    icon: MessageCircle,
    href: "/community",
  },
  {
    label: "Shop",
    icon: ShoppingBag,
    href: "/shop",
  },
];

const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col gap-2 w-full">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md",
            currentPath === item.href ||
              (item.href === "/garden" && currentPath.startsWith("/plant/")) ||
              (item.href === "/plant-search" &&
                currentPath.startsWith("/plant-info/")) ||
              (item.href === "/shop" && currentPath.startsWith("/shop/"))
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNav;
