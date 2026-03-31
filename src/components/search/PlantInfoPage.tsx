
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { 
  Droplets, 
  Sun, 
  ThermometerSun, 
  ArrowLeft, 
  Sprout, 
  Leaf,
  Ruler,
  Clock,
  Bug,
  ShieldAlert,
  Users,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Sample detailed plant data
const plantInfoData = {
  p1: {
    id: "p1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    type: "Vegetable",
    description: "Tomatoes are one of the most popular garden vegetables. They come in various sizes, colors, and flavors, from small cherry tomatoes to large beefsteak varieties. With proper care, tomato plants can produce abundant harvests throughout the growing season.",
    category: "Fruit (botanically) but used as a vegetable",
    varieties: [
      { name: "Roma", bestFor: "Sauce, paste", description: "Plum-shaped, meaty with few seeds" },
      { name: "Cherry", bestFor: "Salads, snacking", description: "Small, sweet, prolific producer" },
      { name: "Beefsteak", bestFor: "Slicing", description: "Large, meaty fruits ideal for sandwiches" }
    ],
    growingInfo: {
      difficulty: "Easy to Moderate",
      spacing: "24-36 inches",
      depth: "1/4 inch",
      sunlight: "Full sun (6-8 hours daily)",
      season: "Warm season (plant after last frost)",
      water: "1-2 inches per week",
      germination: "5-10 days",
      sprouting: "6-8 weeks to first harvest",
      harvestTime: "70-90 days from transplant",
      frostTolerance: "None (protect from frost)",
      heatTolerance: "Moderate to High",
    },
    growingCalendar: [
      { month: "January", task: "Start seeds indoors in warmer climates" },
      { month: "February", task: "Start seeds indoors in most regions" },
      { month: "March", task: "Continue starting seeds indoors" },
      { month: "April", task: "Harden off seedlings, prepare soil" },
      { month: "May", task: "Transplant outdoors after frost danger" },
      { month: "June", task: "Stake or cage plants, regular watering" },
      { month: "July", task: "Watch for pests, first harvests begin" },
      { month: "August", task: "Peak harvest season" },
      { month: "September", task: "Continue harvesting, save seeds" },
      { month: "October", task: "Final harvests, remove plants" },
      { month: "November", task: "Garden cleanup" },
      { month: "December", task: "Plan for next season" }
    ],
    companionPlants: [
      { name: "Basil", benefit: "Repels insects, improves flavor" },
      { name: "Marigolds", benefit: "Repel nematodes and other pests" },
      { name: "Carrots", benefit: "Break up soil, use different nutrients" }
    ],
    combativePlants: [
      { name: "Potatoes", reason: "Can spread blight to tomatoes" },
      { name: "Corn", reason: "Attracts same pests" },
      { name: "Fennel", reason: "Inhibits tomato growth" }
    ],
    pests: [
      { name: "Tomato Hornworm", description: "Large green caterpillars that devour foliage", control: "Handpick, use Bt spray" },
      { name: "Aphids", description: "Small insects that suck plant sap", control: "Insecticidal soap, natural predators" },
      { name: "Whiteflies", description: "Tiny white insects that damage leaves", control: "Yellow sticky traps, insecticidal soap" }
    ],
    diseases: [
      { name: "Early Blight", symptoms: "Dark spots with concentric rings on lower leaves", prevention: "Crop rotation, adequate spacing" },
      { name: "Late Blight", symptoms: "Water-soaked spots, white fuzzy growth", prevention: "Fungicides, remove infected plants" },
      { name: "Blossom End Rot", symptoms: "Dark, sunken areas at bottom of fruit", prevention: "Consistent watering, calcium supplements" }
    ],
    beneficialCritters: [
      { name: "Ladybugs", benefit: "Consume aphids and other soft-bodied insects" },
      { name: "Bees", benefit: "Pollinate flowers for better fruit set" },
      { name: "Praying Mantis", benefit: "General predator of many garden pests" }
    ],
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  p2: {
  id: "p2",
  name: "Basil",
  scientificName: "Ocimum basilicum",
  type: "Herb",
  description: "Basil is a fragrant herb widely used in cooking. It grows quickly and produces fresh, aromatic leaves ideal for garnishing and flavoring dishes.",
  category: "Herb",
  varieties: [
    { name: "Sweet Basil", bestFor: "Cooking", description: "Classic Italian basil" },
    { name: "Thai Basil", bestFor: "Asian cuisine", description: "Spicy and aromatic" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-18 inches",
    depth: "1/4 inch",
    sunlight: "Partial to full sun",
    season: "Warm season",
    water: "Keep soil moist",
    germination: "5-7 days",
    sprouting: "2-3 weeks",
    harvestTime: "40-60 days",
    frostTolerance: "None",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Start seeds indoors" },
    { month: "April", task: "Transplant outdoors" },
    { month: "May", task: "Regular watering" },
    { month: "June", task: "Harvest leaves" }
  ],
  companionPlants: [
    { name: "Tomato", benefit: "Improves growth and flavor" },
    { name: "Pepper", benefit: "Enhances yield" }
  ],
  combativePlants: [
    { name: "Rue", reason: "Inhibits basil growth" }
  ],
  pests: [
    { name: "Aphids", description: "Sap-sucking insects", control: "Neem oil spray" }
  ],
  diseases: [
    { name: "Downy Mildew", symptoms: "Yellowing leaves", prevention: "Good airflow" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Help pollination" }
  ],
  image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80",
},

p3: {
  id: "p3",
  name: "Carrot",
  scientificName: "Daucus carota",
  type: "Root Vegetable",
  description: "Carrots are nutritious root vegetables that grow underground and are rich in vitamins, especially beta-carotene.",
  category: "Root",
  varieties: [
    { name: "Nantes", bestFor: "Fresh eating", description: "Sweet and cylindrical" },
    { name: "Danvers", bestFor: "Storage", description: "Hardy and adaptable" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-4 inches",
    depth: "1/4 inch",
    sunlight: "Partial sun",
    season: "Cool season",
    water: "Keep soil moist",
    germination: "10-20 days",
    sprouting: "2-3 weeks",
    harvestTime: "60-80 days",
    frostTolerance: "Moderate",
    heatTolerance: "Low",
  },
  growingCalendar: [
    { month: "October", task: "Sow seeds" },
    { month: "November", task: "Thin seedlings" },
    { month: "December", task: "Maintain moisture" },
    { month: "January", task: "Harvest" }
  ],
  companionPlants: [
    { name: "Onion", benefit: "Repels pests" },
    { name: "Tomato", benefit: "Improves soil" }
  ],
  combativePlants: [
    { name: "Dill", reason: "Affects growth" }
  ],
  pests: [
    { name: "Carrot Fly", description: "Damages roots", control: "Use netting" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft roots", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Earthworms", benefit: "Improve soil quality" }
  ],
  image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80",
},

p4: {
  id: "p4",
  name: "Sunflower",
  scientificName: "Helianthus annuus",
  type: "Flower",
  description: "Sunflowers are tall plants with large yellow blooms that follow the sun. They are easy to grow and brighten any garden.",
  category: "Flower",
  varieties: [
    { name: "Giant Sunflower", bestFor: "Decoration", description: "Very tall with big flowers" },
    { name: "Dwarf Sunflower", bestFor: "Pots", description: "Compact variety" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-24 inches",
    depth: "1 inch",
    sunlight: "Full sun",
    season: "Summer",
    water: "Moderate",
    germination: "7-10 days",
    sprouting: "2 weeks",
    harvestTime: "80-120 days",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Sow seeds" },
    { month: "April", task: "Thin plants" },
    { month: "May", task: "Water regularly" },
    { month: "June", task: "Flowering begins" }
  ],
  companionPlants: [
    { name: "Corn", benefit: "Supports growth" },
    { name: "Cucumber", benefit: "Provides shade" }
  ],
  combativePlants: [
    { name: "Potatoes", reason: "Compete for nutrients" }
  ],
  pests: [
    { name: "Birds", description: "Eat seeds", control: "Use netting" }
  ],
  diseases: [
    { name: "Rust", symptoms: "Brown spots", prevention: "Good airflow" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
},
  p5: {
  id: "p5",
  name: "Blueberry",
  scientificName: "Vaccinium corymbosum",
  type: "Fruit Plant",
  description: "Blueberries are perennial shrubs that produce small, sweet, and nutritious berries. They require acidic soil and are ideal for long-term gardening.",
  category: "Fruit",
  varieties: [
    { name: "Highbush", bestFor: "Home gardens", description: "Common and high-yield variety" },
    { name: "Lowbush", bestFor: "Ground cover", description: "Short plants with smaller berries" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "4-5 feet",
    depth: "Shallow roots",
    sunlight: "Partial to full sun",
    season: "Spring planting",
    water: "Consistent moisture",
    germination: "2-3 weeks",
    sprouting: "Slow growth",
    harvestTime: "2-3 years",
    frostTolerance: "High",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Pruning dormant plants" },
    { month: "March", task: "Fertilize and prepare soil" },
    { month: "April", task: "New growth begins" },
    { month: "June", task: "Fruit development" },
    { month: "July", task: "Harvest berries" }
  ],
  companionPlants: [
    { name: "Strawberry", benefit: "Ground cover and soil protection" },
    { name: "Thyme", benefit: "Repels pests" }
  ],
  combativePlants: [
    { name: "Cabbage", reason: "Different soil requirements" }
  ],
  pests: [
    { name: "Birds", description: "Eat berries", control: "Use netting" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Wilting plant", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination for fruit production" }
  ],
  image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80",
},

p6: {
  id: "p6",
  name: "Rosemary",
  scientificName: "Salvia rosmarinus",
  type: "Herb",
  description: "Rosemary is a hardy evergreen herb with needle-like leaves. It is widely used in cooking and thrives in dry, sunny environments.",
  category: "Herb",
  varieties: [
    { name: "Upright Rosemary", bestFor: "Cooking", description: "Common garden variety" },
    { name: "Creeping Rosemary", bestFor: "Decoration", description: "Spreads along ground" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "24-36 inches",
    depth: "Shallow",
    sunlight: "Full sun",
    season: "Year-round (warm climates)",
    water: "Low",
    germination: "2-3 weeks",
    sprouting: "Slow",
    harvestTime: "3-6 months",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "February", task: "Plant cuttings" },
    { month: "April", task: "Establish plant" },
    { month: "June", task: "Light pruning" },
    { month: "August", task: "Harvest leaves" }
  ],
  companionPlants: [
    { name: "Sage", benefit: "Similar care needs" },
    { name: "Lavender", benefit: "Repels insects" }
  ],
  combativePlants: [
    { name: "Basil", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Spider mites", description: "Damage leaves", control: "Water spray" }
  ],
  diseases: [
    { name: "Powdery Mildew", symptoms: "White coating", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=800&q=80",
},

p7: {
  id: "p7",
  name: "Bell Pepper",
  scientificName: "Capsicum annuum",
  type: "Vegetable",
  description: "Bell peppers are colorful vegetables rich in vitamins. They grow in warm climates and produce fruits in green, red, yellow, and orange colors.",
  category: "Vegetable",
  varieties: [
    { name: "Green Pepper", bestFor: "Cooking", description: "Harvested early" },
    { name: "Red Pepper", bestFor: "Sweet flavor", description: "Fully ripened" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "18-24 inches",
    depth: "1/4 inch",
    sunlight: "Full sun",
    season: "Warm season",
    water: "Moderate",
    germination: "7-14 days",
    sprouting: "2-3 weeks",
    harvestTime: "60-90 days",
    frostTolerance: "None",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Start seeds indoors" },
    { month: "April", task: "Transplant outdoors" },
    { month: "May", task: "Water regularly" },
    { month: "June", task: "Fruit development" },
    { month: "July", task: "Harvest begins" }
  ],
  companionPlants: [
    { name: "Basil", benefit: "Improves growth" },
    { name: "Tomato", benefit: "Shared care needs" }
  ],
  combativePlants: [
    { name: "Fennel", reason: "Inhibits growth" }
  ],
  pests: [
    { name: "Aphids", description: "Sap-sucking insects", control: "Neem oil" }
  ],
  diseases: [
    { name: "Blossom End Rot", symptoms: "Dark spots", prevention: "Consistent watering" }
  ],
  beneficialCritters: [
    { name: "Ladybugs", benefit: "Control pests" }
  ],
  image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
},
  p8: {
  id: "p8",
  name: "Lavender",
  scientificName: "Lavandula",
  type: "Flowering Herb",
  description: "Lavender is a fragrant plant known for its purple flowers and calming aroma. It is widely used in aromatherapy, decoration, and herbal products.",
  category: "Flower",
  varieties: [
    { name: "English Lavender", bestFor: "Aromatherapy", description: "Highly fragrant and compact" },
    { name: "French Lavender", bestFor: "Decoration", description: "Tall with unique flower shape" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "18-24 inches",
    depth: "1/4 inch",
    sunlight: "Full sun",
    season: "Spring",
    water: "Low",
    germination: "14-21 days",
    sprouting: "Slow",
    harvestTime: "1-3 years",
    frostTolerance: "Moderate",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Plant seeds" },
    { month: "April", task: "Transplant seedlings" },
    { month: "June", task: "Prune lightly" },
    { month: "July", task: "Harvest flowers" }
  ],
  companionPlants: [
    { name: "Rosemary", benefit: "Repels pests" },
    { name: "Thyme", benefit: "Improves soil health" }
  ],
  combativePlants: [
    { name: "Mint", reason: "Competes aggressively" }
  ],
  pests: [
    { name: "Aphids", description: "Small insects on stems", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Wilting plant", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/others/lavender.jpeg",
},

p9: {
  id: "p9",
  name: "Aloe Vera",
  scientificName: "Aloe barbadensis miller",
  type: "Succulent",
  description: "Aloe Vera is a medicinal plant known for its soothing gel used for skin care and healing. It is easy to grow and requires minimal maintenance.",
  category: "Medicinal",
  varieties: [
    { name: "Aloe Barbadensis", bestFor: "Medicinal use", description: "Most common variety" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-24 inches",
    depth: "Shallow planting",
    sunlight: "Partial sunlight",
    season: "Year-round",
    water: "Low",
    germination: "Rarely grown from seeds",
    sprouting: "Offsets grow easily",
    harvestTime: "6-12 months",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "January", task: "Minimal watering" },
    { month: "March", task: "Repot if needed" },
    { month: "June", task: "Ensure drainage" },
    { month: "September", task: "Monitor growth" }
  ],
  companionPlants: [
    { name: "Cactus", benefit: "Similar care needs" },
    { name: "Snake Plant", benefit: "Low maintenance pairing" }
  ],
  combativePlants: [
    { name: "Overwatered plants", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Mealybugs", description: "White insects on leaves", control: "Alcohol wipe" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft roots", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None significant", benefit: "Naturally resistant plant" }
  ],
  image: "/images/searchimages/aloe.jpeg",
},

p10: {
  id: "p10",
  name: "Snake Plant",
  scientificName: "Sansevieria trifasciata",
  type: "Indoor Plant",
  description: "Snake Plant is a hardy indoor plant known for its air-purifying qualities and ability to survive in low light conditions.",
  category: "Indoor",
  varieties: [
    { name: "Laurentii", bestFor: "Indoor decor", description: "Yellow-edged leaves" },
    { name: "Hahnii", bestFor: "Small pots", description: "Compact rosette form" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-18 inches",
    depth: "Shallow",
    sunlight: "Shade to partial sunlight",
    season: "Year-round",
    water: "Low",
    germination: "Propagation via cuttings",
    sprouting: "Slow",
    harvestTime: "Not applicable",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "January", task: "Minimal watering" },
    { month: "April", task: "Repot if needed" },
    { month: "July", task: "Clean leaves" },
    { month: "October", task: "Check root health" }
  ],
  companionPlants: [
    { name: "Aloe Vera", benefit: "Similar care needs" },
    { name: "Money Plant", benefit: "Indoor pairing" }
  ],
  combativePlants: [
    { name: "High water plants", reason: "Different requirements" }
  ],
  pests: [
    { name: "Spider mites", description: "Damage leaves", control: "Wipe leaves" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft base", prevention: "Avoid excess watering" }
  ],
  beneficialCritters: [
    { name: "None significant", benefit: "Low pest issues" }
  ],
  image: "/images/searchimages/snake-plant.jpeg",
},
  p11: {
  id: "p11",
  name: "Money Plant",
  scientificName: "Epipremnum aureum",
  type: "Indoor Plant",
  description: "Money Plant is a popular indoor plant known for its easy growth and air-purifying qualities. It is believed to bring prosperity and good luck.",
  category: "Indoor",
  varieties: [
    { name: "Golden Pothos", bestFor: "Indoor decor", description: "Green leaves with yellow variegation" },
    { name: "Marble Queen", bestFor: "Decoration", description: "White and green patterned leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "10-12 inches",
    depth: "Shallow",
    sunlight: "Partial sunlight",
    season: "Year-round",
    water: "Low to moderate",
    germination: "Propagation via cuttings",
    sprouting: "Fast",
    harvestTime: "Not applicable",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Minimal watering" },
    { month: "March", task: "Trim and propagate" },
    { month: "June", task: "Ensure indirect sunlight" },
    { month: "September", task: "Check growth" }
  ],
  companionPlants: [
    { name: "Snake Plant", benefit: "Indoor compatibility" },
    { name: "Peace Lily", benefit: "Air purification" }
  ],
  combativePlants: [
    { name: "Direct sun plants", reason: "Different light needs" }
  ],
  pests: [
    { name: "Mealybugs", description: "White insects", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Yellow leaves", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None significant", benefit: "Low pest issues" }
  ],
  image: "/images/searchimages/money-plant.jpeg",
},

p12: {
  id: "p12",
  name: "Neem Tree",
  scientificName: "Azadirachta indica",
  type: "Tree",
  description: "Neem is a medicinal tree known for its antibacterial and antifungal properties. It is widely used in traditional medicine and agriculture.",
  category: "Tree",
  varieties: [
    { name: "Indian Neem", bestFor: "Medicinal use", description: "Most common variety" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "15-20 feet",
    depth: "1 inch",
    sunlight: "Full sun",
    season: "Summer planting",
    water: "Low",
    germination: "7-14 days",
    sprouting: "Moderate",
    harvestTime: "3-5 years",
    frostTolerance: "Low",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "June", task: "Plant seeds" },
    { month: "July", task: "Water regularly" },
    { month: "August", task: "Growth monitoring" },
    { month: "December", task: "Minimal care" }
  ],
  companionPlants: [
    { name: "Tulsi", benefit: "Medicinal synergy" },
    { name: "Moringa", benefit: "Similar growth conditions" }
  ],
  combativePlants: [
    { name: "Water-heavy plants", reason: "Different water needs" }
  ],
  pests: [
    { name: "Leaf miners", description: "Damage leaves", control: "Neem spray" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Brown patches", prevention: "Proper spacing" }
  ],
  beneficialCritters: [
    { name: "Birds", benefit: "Natural pest control" }
  ],
  image: "/images/searchimages/neem.jpeg",
},

p13: {
  id: "p13",
  name: "Tulsi",
  scientificName: "Ocimum tenuiflorum",
  type: "Medicinal Herb",
  description: "Tulsi, also known as Holy Basil, is a sacred plant in India valued for its medicinal and spiritual benefits.",
  category: "Medicinal",
  varieties: [
    { name: "Rama Tulsi", bestFor: "Medicinal use", description: "Green leaves" },
    { name: "Krishna Tulsi", bestFor: "Ayurveda", description: "Purple leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-18 inches",
    depth: "1/4 inch",
    sunlight: "Full sun",
    season: "Warm season",
    water: "Moderate",
    germination: "5-7 days",
    sprouting: "Fast",
    harvestTime: "30-60 days",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Sow seeds" },
    { month: "April", task: "Transplant seedlings" },
    { month: "May", task: "Water regularly" },
    { month: "June", task: "Harvest leaves" }
  ],
  companionPlants: [
    { name: "Neem", benefit: "Medicinal combination" },
    { name: "Aloe Vera", benefit: "Low maintenance pairing" }
  ],
  combativePlants: [
    { name: "Fennel", reason: "Inhibits growth" }
  ],
  pests: [
    { name: "Aphids", description: "Sap-sucking insects", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Dark spots", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/tulsi.jpeg",
},
  p14: {
  id: "p14",
  name: "Orchid",
  scientificName: "Orchidaceae",
  type: "Flowering Plant",
  description: "Orchids are elegant and exotic flowering plants known for their beautiful, long-lasting blooms. They are popular indoor decorative plants.",
  category: "Flower",
  varieties: [
    { name: "Phalaenopsis", bestFor: "Indoor decor", description: "Most common orchid with large blooms" },
    { name: "Dendrobium", bestFor: "Tropical gardens", description: "Long stems with multiple flowers" }
  ],
  growingInfo: {
    difficulty: "Hard",
    spacing: "8-12 inches",
    depth: "Shallow (bark mix)",
    sunlight: "Indirect sunlight",
    season: "Year-round (indoor)",
    water: "Low to moderate",
    germination: "Difficult (lab propagation)",
    sprouting: "Slow",
    harvestTime: "1-2 years",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain humidity" },
    { month: "March", task: "Fertilize lightly" },
    { month: "June", task: "Ensure airflow" },
    { month: "September", task: "Check roots" }
  ],
  companionPlants: [
    { name: "Fern", benefit: "Humidity balance" },
    { name: "Bamboo", benefit: "Aesthetic pairing" }
  ],
  combativePlants: [
    { name: "Direct sun plants", reason: "Different light needs" }
  ],
  pests: [
    { name: "Scale insects", description: "Sticky residue on leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft roots", prevention: "Proper drainage" }
  ],
  beneficialCritters: [
    { name: "None significant", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/orchid.jpeg",
},

p15: {
  id: "p15",
  name: "Hibiscus",
  scientificName: "Hibiscus rosa-sinensis",
  type: "Flowering Plant",
  description: "Hibiscus is a tropical plant with large, vibrant flowers. It is commonly used in gardens and for herbal purposes.",
  category: "Flower",
  varieties: [
    { name: "Red Hibiscus", bestFor: "Decoration", description: "Bright red flowers" },
    { name: "Yellow Hibiscus", bestFor: "Gardens", description: "Soft yellow blooms" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-3 feet",
    depth: "1/2 inch",
    sunlight: "Full sun",
    season: "Warm season",
    water: "Moderate",
    germination: "7-14 days",
    sprouting: "Fast",
    harvestTime: "3-6 months",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Plant saplings" },
    { month: "April", task: "Water regularly" },
    { month: "June", task: "Fertilize" },
    { month: "July", task: "Flowering begins" }
  ],
  companionPlants: [
    { name: "Rose", benefit: "Garden beauty" },
    { name: "Jasmine", benefit: "Fragrance pairing" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Aphids", description: "Damage buds", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Brown spots", prevention: "Proper care" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/hibiscus.jpeg",
},

p16: {
  id: "p16",
  name: "Rose",
  scientificName: "Rosa",
  type: "Flowering Plant",
  description: "Roses are one of the most popular ornamental plants known for their beautiful and fragrant flowers.",
  category: "Flower",
  varieties: [
    { name: "Hybrid Tea", bestFor: "Cut flowers", description: "Large, elegant blooms" },
    { name: "Floribunda", bestFor: "Gardens", description: "Clusters of flowers" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "2-3 feet",
    depth: "1 inch",
    sunlight: "Full sun",
    season: "Spring planting",
    water: "Moderate",
    germination: "2-3 weeks",
    sprouting: "Moderate",
    harvestTime: "2-3 months",
    frostTolerance: "Moderate",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Pruning" },
    { month: "March", task: "Fertilize" },
    { month: "May", task: "Flowering begins" },
    { month: "June", task: "Regular care" }
  ],
  companionPlants: [
    { name: "Lavender", benefit: "Repels pests" },
    { name: "Marigold", benefit: "Protects from insects" }
  ],
  combativePlants: [
    { name: "Fennel", reason: "Inhibits growth" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Black Spot", symptoms: "Dark spots on leaves", prevention: "Fungicide" }
  ],
  beneficialCritters: [
    { name: "Ladybugs", benefit: "Control aphids" }
  ],
  image: "/images/searchimages/rose.jpeg",
},
  p17: {
  id: "p17",
  name: "Mango Tree",
  scientificName: "Mangifera indica",
  type: "Fruit Tree",
  description: "Mango is a tropical fruit tree known for producing sweet and juicy fruits. It requires warm climate and proper seasonal care.",
  category: "Fruit",
  varieties: [
    { name: "Alphonso", bestFor: "Premium fruit", description: "Sweet, rich flavor" },
    { name: "Kesar", bestFor: "Juice and desserts", description: "Aromatic and juicy" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "20-30 feet",
    depth: "2-3 inches",
    sunlight: "Full sun",
    season: "Summer planting",
    water: "Moderate",
    germination: "2-4 weeks",
    sprouting: "Slow",
    harvestTime: "3-6 years",
    frostTolerance: "Low",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "June", task: "Plant sapling" },
    { month: "July", task: "Water regularly" },
    { month: "December", task: "Pruning" },
    { month: "March", task: "Flowering begins" }
  ],
  companionPlants: [
    { name: "Banana", benefit: "Moisture retention" },
    { name: "Neem", benefit: "Natural pest control" }
  ],
  combativePlants: [
    { name: "Waterlogged plants", reason: "Different soil needs" }
  ],
  pests: [
    { name: "Fruit Fly", description: "Damages fruits", control: "Traps" }
  ],
  diseases: [
    { name: "Powdery Mildew", symptoms: "White coating", prevention: "Fungicide" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/mango.jpeg",
},

p18: {
  id: "p18",
  name: "Banana Plant",
  scientificName: "Musa",
  type: "Fruit Plant",
  description: "Banana plants are fast-growing tropical plants that produce nutritious fruits. They require high water and warm conditions.",
  category: "Fruit",
  varieties: [
    { name: "Cavendish", bestFor: "Commercial use", description: "Most common variety" },
    { name: "Red Banana", bestFor: "Sweet flavor", description: "Reddish peel and soft pulp" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "6-10 feet",
    depth: "2-3 inches",
    sunlight: "Full sun",
    season: "Year-round (tropical)",
    water: "High",
    germination: "Rare (grown from suckers)",
    sprouting: "Fast",
    harvestTime: "9-12 months",
    frostTolerance: "Very Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "January", task: "Maintain watering" },
    { month: "March", task: "Fertilize" },
    { month: "June", task: "Growth peak" },
    { month: "August", task: "Fruit formation" }
  ],
  companionPlants: [
    { name: "Papaya", benefit: "Similar growth conditions" },
    { name: "Mango", benefit: "Soil improvement" }
  ],
  combativePlants: [
    { name: "Dry soil plants", reason: "Different water needs" }
  ],
  pests: [
    { name: "Banana Weevil", description: "Damages stem", control: "Organic pesticides" }
  ],
  diseases: [
    { name: "Panama Disease", symptoms: "Yellowing leaves", prevention: "Disease-resistant varieties" }
  ],
  beneficialCritters: [
    { name: "Earthworms", benefit: "Improve soil fertility" }
  ],
  image: "/images/searchimages/banana.jpeg",
},

p19: {
  id: "p19",
  name: "Guava Tree",
  scientificName: "Psidium guajava",
  type: "Fruit Tree",
  description: "Guava is a tropical fruit tree producing sweet and nutritious fruits rich in vitamin C.",
  category: "Fruit",
  varieties: [
    { name: "Allahabad Safeda", bestFor: "Sweet fruit", description: "White pulp, high yield" },
    { name: "Red Guava", bestFor: "Juice", description: "Pink pulp, rich taste" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "10-15 feet",
    depth: "1-2 inches",
    sunlight: "Full sun",
    season: "Spring planting",
    water: "Moderate",
    germination: "2-3 weeks",
    sprouting: "Moderate",
    harvestTime: "2-3 years",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "February", task: "Plant saplings" },
    { month: "April", task: "Water regularly" },
    { month: "July", task: "Fruit development" },
    { month: "September", task: "Harvest" }
  ],
  companionPlants: [
    { name: "Papaya", benefit: "Similar conditions" },
    { name: "Banana", benefit: "Moisture retention" }
  ],
  combativePlants: [
    { name: "Waterlogged plants", reason: "Poor root health" }
  ],
  pests: [
    { name: "Fruit Fly", description: "Damages fruits", control: "Traps" }
  ],
  diseases: [
    { name: "Anthracnose", symptoms: "Dark spots", prevention: "Fungicide" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/guava.jpeg",
},
  p20: {
  id: "p20",
  name: "Coconut Tree",
  scientificName: "Cocos nucifera",
  type: "Tree",
  description: "Coconut trees are tall tropical plants known for producing coconuts used for food, oil, and water. They thrive in coastal and warm climates.",
  category: "Tree",
  varieties: [
    { name: "Tall Coconut", bestFor: "Long lifespan", description: "Takes longer to bear fruit but lives longer" },
    { name: "Dwarf Coconut", bestFor: "Early yield", description: "Shorter tree, faster fruiting" }
  ],
  growingInfo: {
    difficulty: "Hard",
    spacing: "20-25 feet",
    depth: "2-3 inches",
    sunlight: "Full sun",
    season: "Tropical year-round",
    water: "High",
    germination: "2-3 months",
    sprouting: "Slow",
    harvestTime: "5-10 years",
    frostTolerance: "None",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "January", task: "Maintain watering" },
    { month: "April", task: "Fertilize soil" },
    { month: "July", task: "Growth period" },
    { month: "October", task: "Fruit development" }
  ],
  companionPlants: [
    { name: "Banana", benefit: "Soil moisture retention" },
    { name: "Papaya", benefit: "Compatible growth" }
  ],
  combativePlants: [
    { name: "Shade plants", reason: "Requires full sunlight" }
  ],
  pests: [
    { name: "Rhinoceros Beetle", description: "Damages crown", control: "Biological control" }
  ],
  diseases: [
    { name: "Bud Rot", symptoms: "Rotting center", prevention: "Fungicide treatment" }
  ],
  beneficialCritters: [
    { name: "Birds", benefit: "Natural pest control" }
  ],
  image: "/images/searchimages/coconut.jpeg",
},

p21: {
  id: "p21",
  name: "Bamboo",
  scientificName: "Bambusoideae",
  type: "Tree",
  description: "Bamboo is a fast-growing plant widely used for construction, decoration, and environmental benefits.",
  category: "Tree",
  varieties: [
    { name: "Clumping Bamboo", bestFor: "Gardens", description: "Non-invasive growth" },
    { name: "Running Bamboo", bestFor: "Large areas", description: "Spreads quickly" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "3-5 feet",
    depth: "1-2 inches",
    sunlight: "Full sun",
    season: "Year-round",
    water: "Medium",
    germination: "2-4 weeks",
    sprouting: "Fast",
    harvestTime: "1-3 years",
    frostTolerance: "Moderate",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Plant bamboo" },
    { month: "May", task: "Rapid growth begins" },
    { month: "July", task: "Maintain watering" },
    { month: "September", task: "Trim growth" }
  ],
  companionPlants: [
    { name: "Fern", benefit: "Shade compatibility" },
    { name: "Orchid", benefit: "Humidity balance" }
  ],
  combativePlants: [
    { name: "Small crops", reason: "Competes for nutrients" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Weak growth", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Pandas (wild)", benefit: "Natural ecosystem role" }
  ],
  image: "/images/searchimages/bamboo.jpeg",
},

p22: {
  id: "p22",
  name: "Fern",
  scientificName: "Polypodiopsida",
  type: "Indoor Plant",
  description: "Ferns are shade-loving plants known for their lush green foliage. They are commonly used as decorative indoor plants.",
  category: "Indoor",
  varieties: [
    { name: "Boston Fern", bestFor: "Indoor decor", description: "Soft, feathery leaves" },
    { name: "Maidenhair Fern", bestFor: "Aesthetic appeal", description: "Delicate, fine leaves" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Shade or indirect light",
    season: "Year-round",
    water: "High",
    germination: "Difficult",
    sprouting: "Slow",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain humidity" },
    { month: "April", task: "Repot if needed" },
    { month: "July", task: "Regular watering" },
    { month: "October", task: "Trim dead leaves" }
  ],
  companionPlants: [
    { name: "Orchid", benefit: "Humidity compatibility" },
    { name: "Peace Lily", benefit: "Indoor pairing" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different water needs" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Water spray" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Brown patches", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/fern.jpeg",
},
  p23: {
  id: "p23",
  name: "Peace Lily",
  scientificName: "Spathiphyllum",
  type: "Indoor Plant",
  description: "Peace Lily is a popular indoor plant known for its elegant white flowers and air-purifying qualities.",
  category: "Indoor",
  varieties: [
    { name: "Mauna Loa", bestFor: "Indoor decor", description: "Large leaves and flowers" },
    { name: "Petite", bestFor: "Small spaces", description: "Compact size" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Shade to partial light",
    season: "Year-round",
    water: "Medium",
    germination: "Rare (propagation by division)",
    sprouting: "Moderate",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain moisture" },
    { month: "April", task: "Fertilize lightly" },
    { month: "July", task: "Monitor growth" },
    { month: "October", task: "Clean leaves" }
  ],
  companionPlants: [
    { name: "Snake Plant", benefit: "Air purification combo" },
    { name: "Fern", benefit: "Humidity balance" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Wipe leaves" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Yellow leaves", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/peace-lily.jpeg",
},

p24: {
  id: "p24",
  name: "Spider Plant",
  scientificName: "Chlorophytum comosum",
  type: "Indoor Plant",
  description: "Spider Plant is an easy-to-grow indoor plant known for its air-purifying ability and arching leaves.",
  category: "Indoor",
  varieties: [
    { name: "Variegatum", bestFor: "Decoration", description: "Green leaves with white stripes" },
    { name: "Bonnie", bestFor: "Compact spaces", description: "Curly leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Partial light",
    season: "Year-round",
    water: "Medium",
    germination: "Propagation via plantlets",
    sprouting: "Fast",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Repot plant" },
    { month: "May", task: "Fertilize" },
    { month: "August", task: "Trim plantlets" },
    { month: "November", task: "Indoor care" }
  ],
  companionPlants: [
    { name: "Money Plant", benefit: "Indoor compatibility" },
    { name: "Peace Lily", benefit: "Air purification" }
  ],
  combativePlants: [
    { name: "Succulents", reason: "Different water needs" }
  ],
  pests: [
    { name: "Aphids", description: "Affect leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Tip Burn", symptoms: "Brown tips", prevention: "Filtered water" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/spider-plant.jpeg",
},

p25: {
  id: "p25",
  name: "Papaya",
  scientificName: "Carica papaya",
  type: "Fruit Plant",
  description: "Papaya is a fast-growing tropical fruit plant that produces nutritious and sweet fruits within a year.",
  category: "Fruit",
  varieties: [
    { name: "Red Lady", bestFor: "High yield", description: "Fast-growing hybrid" },
    { name: "Solo", bestFor: "Sweet fruit", description: "Small but tasty fruits" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "6-10 feet",
    depth: "1-2 inches",
    sunlight: "Full sun",
    season: "Warm season",
    water: "High",
    germination: "2-3 weeks",
    sprouting: "Fast",
    harvestTime: "6-12 months",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Plant seeds" },
    { month: "April", task: "Water regularly" },
    { month: "June", task: "Rapid growth" },
    { month: "September", task: "Fruit harvesting" }
  ],
  companionPlants: [
    { name: "Banana", benefit: "Moisture support" },
    { name: "Mango", benefit: "Soil compatibility" }
  ],
  combativePlants: [
    { name: "Cold climate plants", reason: "Different conditions" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Papaya Ringspot Virus", symptoms: "Leaf distortion", prevention: "Resistant varieties" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/papaya.jpeg",
},
  p26: {
  id: "p26",
  name: "Jasmine",
  scientificName: "Jasminum",
  type: "Flowering Plant",
  description: "Jasmine is a fragrant flowering plant widely used in perfumes, teas, and decoration. It blooms beautifully in warm climates.",
  category: "Flower",
  varieties: [
    { name: "Arabian Jasmine", bestFor: "Perfume & tea", description: "Highly fragrant white flowers" },
    { name: "Common Jasmine", bestFor: "Gardens", description: "Climbing variety with delicate blooms" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "3-5 feet",
    depth: "1 inch",
    sunlight: "Full sun",
    season: "Spring planting",
    water: "Moderate",
    germination: "2-3 weeks",
    sprouting: "Moderate",
    harvestTime: "6-12 months",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "February", task: "Plant saplings" },
    { month: "April", task: "Water regularly" },
    { month: "June", task: "Flowering begins" },
    { month: "August", task: "Harvest flowers" }
  ],
  companionPlants: [
    { name: "Rose", benefit: "Enhances garden beauty" },
    { name: "Lavender", benefit: "Fragrance combination" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Whiteflies", description: "Damage leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Blight", symptoms: "Brown patches", prevention: "Proper care" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/jasmine.jpeg",
},

p27: {
  id: "p27",
  name: "Marigold",
  scientificName: "Tagetes",
  type: "Flowering Plant",
  description: "Marigold is a bright and easy-to-grow flower known for its pest-repelling properties and vibrant colors.",
  category: "Flower",
  varieties: [
    { name: "African Marigold", bestFor: "Large blooms", description: "Tall plants with big flowers" },
    { name: "French Marigold", bestFor: "Gardens", description: "Compact plants with bright colors" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "8-12 inches",
    depth: "1/2 inch",
    sunlight: "Full sun",
    season: "All seasons",
    water: "Moderate",
    germination: "5-7 days",
    sprouting: "Fast",
    harvestTime: "45-60 days",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "January", task: "Sow seeds" },
    { month: "March", task: "Transplant" },
    { month: "May", task: "Flowering begins" },
    { month: "July", task: "Maintain care" }
  ],
  companionPlants: [
    { name: "Tomato", benefit: "Repels pests" },
    { name: "Rose", benefit: "Protects from insects" }
  ],
  combativePlants: [
    { name: "Beans", reason: "Growth interference" }
  ],
  pests: [
    { name: "Aphids", description: "Damage plants", control: "Neem oil" }
  ],
  diseases: [
    { name: "Powdery Mildew", symptoms: "White powder", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Ladybugs", benefit: "Eat harmful insects" }
  ],
  image: "/images/searchimages/marigold.jpeg",
},

p28: {
  id: "p28",
  name: "Moringa",
  scientificName: "Moringa oleifera",
  type: "Medicinal Tree",
  description: "Moringa is a highly nutritious plant known as the 'drumstick tree'. It is rich in vitamins and widely used in traditional medicine.",
  category: "Medicinal",
  varieties: [
    { name: "PKM-1", bestFor: "High yield", description: "Fast growing hybrid" },
    { name: "Local Moringa", bestFor: "Traditional use", description: "Hardy and adaptable" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "10-15 feet",
    depth: "1-2 inches",
    sunlight: "Full sun",
    season: "Year-round",
    water: "Low",
    germination: "7-14 days",
    sprouting: "Fast",
    harvestTime: "6-12 months",
    frostTolerance: "Low",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "January", task: "Plant seeds" },
    { month: "March", task: "Rapid growth" },
    { month: "June", task: "Harvest leaves" },
    { month: "September", task: "Pod harvesting" }
  ],
  companionPlants: [
    { name: "Neem", benefit: "Pest control" },
    { name: "Tulsi", benefit: "Medicinal synergy" }
  ],
  combativePlants: [
    { name: "Waterlogged plants", reason: "Needs dry soil" }
  ],
  pests: [
    { name: "Caterpillars", description: "Eat leaves", control: "Manual removal" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Weak plant", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/moringa.jpeg",
},
  p29: {
  id: "p29",
  name: "Cactus",
  scientificName: "Cactaceae",
  type: "Succulent",
  description: "Cactus plants are desert-adapted succulents known for their ability to store water in thick stems. They are extremely low-maintenance and ideal for dry climates and indoor decor.",
  category: "Succulent",
  varieties: [
    { name: "Barrel Cactus", bestFor: "Decor", description: "Round, ribbed cactus with spines" },
    { name: "Prickly Pear", bestFor: "Edible fruit", description: "Flat pads producing fruits" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "6-12 inches",
    depth: "Shallow",
    sunlight: "Full sun",
    season: "Year-round",
    water: "Very low (once every 2-3 weeks)",
    germination: "2-3 weeks",
    sprouting: "Slow",
    harvestTime: "N/A",
    frostTolerance: "Very Low",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "March", task: "Repot if needed" },
    { month: "June", task: "Minimal watering" },
    { month: "September", task: "Check soil dryness" },
    { month: "December", task: "Keep dry" }
  ],
  companionPlants: [
    { name: "Aloe Vera", benefit: "Similar water needs" },
    { name: "Agave", benefit: "Desert pairing" }
  ],
  combativePlants: [
    { name: "Fern", reason: "Requires high moisture" },
    { name: "Peace Lily", reason: "Different humidity needs" }
  ],
  pests: [
    { name: "Mealybugs", description: "White insects on stems", control: "Alcohol swab" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft base", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Low pest attraction" }
  ],
  image: "/images/searchimages/cactus.jpeg",
},

p30: {
  id: "p30",
  name: "Mint",
  scientificName: "Mentha",
  type: "Herb",
  description: "Mint is a fast-growing aromatic herb widely used in beverages, cooking, and medicine. It spreads quickly and requires regular trimming.",
  category: "Herb",
  varieties: [
    { name: "Peppermint", bestFor: "Tea", description: "Strong cooling flavor" },
    { name: "Spearmint", bestFor: "Cooking", description: "Milder taste" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12 inches",
    depth: "1/2 inch",
    sunlight: "Partial sunlight",
    season: "Spring to summer",
    water: "High (keep soil moist)",
    germination: "7-10 days",
    sprouting: "Fast",
    harvestTime: "30-45 days",
    frostTolerance: "Moderate",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Plant cuttings" },
    { month: "March", task: "Water regularly" },
    { month: "May", task: "Harvest leaves" },
    { month: "July", task: "Trim plant" }
  ],
  companionPlants: [
    { name: "Cabbage", benefit: "Repels pests" },
    { name: "Tomato", benefit: "Improves growth" }
  ],
  combativePlants: [
    { name: "Parsley", reason: "Overgrows and competes" }
  ],
  pests: [
    { name: "Aphids", description: "Suck plant sap", control: "Neem oil spray" }
  ],
  diseases: [
    { name: "Rust", symptoms: "Orange spots", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/mint.jpeg",
},

p31: {
  id: "p31",
  name: "Parsley",
  scientificName: "Petroselinum crispum",
  type: "Herb",
  description: "Parsley is a nutritious herb rich in vitamins and commonly used as garnish and seasoning in various cuisines.",
  category: "Herb",
  varieties: [
    { name: "Curly Parsley", bestFor: "Garnish", description: "Decorative leaves" },
    { name: "Flat-leaf Parsley", bestFor: "Cooking", description: "Stronger flavor" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "8-10 inches",
    depth: "1/4 inch",
    sunlight: "Partial sunlight",
    season: "Cool season",
    water: "Medium",
    germination: "14-21 days",
    sprouting: "Slow",
    harvestTime: "70-90 days",
    frostTolerance: "High",
    heatTolerance: "Low",
  },
  growingCalendar: [
    { month: "January", task: "Prepare soil" },
    { month: "February", task: "Plant seeds" },
    { month: "April", task: "Thin seedlings" },
    { month: "June", task: "Harvest leaves" }
  ],
  companionPlants: [
    { name: "Tomato", benefit: "Improves flavor" },
    { name: "Carrot", benefit: "Soil compatibility" }
  ],
  combativePlants: [
    { name: "Mint", reason: "Overgrowth competition" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Dark spots", prevention: "Proper spacing" }
  ],
  beneficialCritters: [
    { name: "Ladybugs", benefit: "Control aphids" }
  ],
  image: "/images/searchimages/parsley.jpeg",
},
  p32: {
  id: "p32",
  name: "Chili Plant",
  scientificName: "Capsicum frutescens",
  type: "Vegetable",
  description: "Chili plants produce spicy fruits widely used in cooking. They thrive in warm climates and require moderate care for good yield.",
  category: "Vegetable",
  varieties: [
    { name: "Green Chili", bestFor: "Cooking", description: "Moderate spice level" },
    { name: "Red Chili", bestFor: "Dry spice", description: "Hot and pungent flavor" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "12-18 inches",
    depth: "1/4 inch",
    sunlight: "Full sun",
    season: "Warm season",
    water: "Medium",
    germination: "7-14 days",
    sprouting: "Moderate",
    harvestTime: "60-90 days",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "February", task: "Start seeds indoors" },
    { month: "March", task: "Transplant outdoors" },
    { month: "May", task: "Water and fertilize" },
    { month: "July", task: "Harvest begins" }
  ],
  companionPlants: [
    { name: "Basil", benefit: "Improves flavor" },
    { name: "Tomato", benefit: "Shared care conditions" }
  ],
  combativePlants: [
    { name: "Fennel", reason: "Inhibits growth" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil" },
    { name: "Spider Mites", description: "Cause leaf yellowing", control: "Water spray" }
  ],
  diseases: [
    { name: "Leaf Curl", symptoms: "Curled leaves", prevention: "Proper care" }
  ],
  beneficialCritters: [
    { name: "Ladybugs", benefit: "Eat aphids" }
  ],
  image: "/images/searchimages/chili.jpeg",
},

p33: {
  id: "p33",
  name: "Dracaena",
  scientificName: "Dracaena",
  type: "Indoor Plant",
  description: "Dracaena is a popular indoor plant known for its long, sword-like leaves and ability to purify air.",
  category: "Indoor",
  varieties: [
    { name: "Dracaena Marginata", bestFor: "Decor", description: "Thin leaves with red edges" },
    { name: "Dracaena Fragrans", bestFor: "Indoor air purification", description: "Broad leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-3 feet",
    depth: "Shallow",
    sunlight: "Indirect light",
    season: "Year-round",
    water: "Low to medium",
    germination: "N/A",
    sprouting: "Slow",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain watering" },
    { month: "April", task: "Repot plant" },
    { month: "July", task: "Clean leaves" },
    { month: "October", task: "Check growth" }
  ],
  companionPlants: [
    { name: "Snake Plant", benefit: "Indoor pairing" },
    { name: "Peace Lily", benefit: "Air purification combo" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different water needs" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Wipe leaves" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Brown spots", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/dracaena.jpeg",
},

p34: {
  id: "p34",
  name: "ZZ Plant",
  scientificName: "Zamioculcas zamiifolia",
  type: "Indoor Plant",
  description: "ZZ Plant is a hardy indoor plant that tolerates low light and requires minimal maintenance, making it ideal for beginners.",
  category: "Indoor",
  varieties: [
    { name: "Zenzi ZZ", bestFor: "Compact spaces", description: "Short and bushy" },
    { name: "Raven ZZ", bestFor: "Decor", description: "Dark black leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Low to partial light",
    season: "Year-round",
    water: "Low",
    germination: "N/A",
    sprouting: "Slow",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Check soil dryness" },
    { month: "May", task: "Minimal watering" },
    { month: "August", task: "Clean leaves" },
    { month: "November", task: "Indoor maintenance" }
  ],
  companionPlants: [
    { name: "Money Plant", benefit: "Indoor pairing" },
    { name: "Snake Plant", benefit: "Low maintenance combo" }
  ],
  combativePlants: [
    { name: "Fern", reason: "Different humidity needs" }
  ],
  pests: [],
  diseases: [
    { name: "Root Rot", symptoms: "Yellow leaves", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/zz-plant.jpeg",
},
  p35: {
  id: "p35",
  name: "Agave",
  scientificName: "Agave",
  type: "Succulent",
  description: "Agave is a drought-tolerant succulent known for its rosette of thick, spiky leaves. It is commonly used in landscaping and for producing natural products like agave syrup.",
  category: "Succulent",
  varieties: [
    { name: "Blue Agave", bestFor: "Agave syrup", description: "Large blue-green leaves" },
    { name: "Century Plant", bestFor: "Decor", description: "Long lifespan and dramatic growth" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-3 feet",
    depth: "Shallow",
    sunlight: "Full sun",
    season: "Year-round",
    water: "Low",
    germination: "Slow",
    sprouting: "Slow",
    harvestTime: "5-10 years",
    frostTolerance: "Low",
    heatTolerance: "Very High",
  },
  growingCalendar: [
    { month: "March", task: "Repot plant" },
    { month: "June", task: "Minimal watering" },
    { month: "September", task: "Check soil drainage" },
    { month: "December", task: "Keep dry" }
  ],
  companionPlants: [
    { name: "Cactus", benefit: "Similar care needs" },
    { name: "Aloe Vera", benefit: "Drought tolerance" }
  ],
  combativePlants: [
    { name: "Fern", reason: "Needs high moisture" }
  ],
  pests: [
    { name: "Scale insects", description: "Stick to leaves", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft base", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination when flowering" }
  ],
  image: "/images/searchimages/agave.jpeg",
},

p36: {
  id: "p36",
  name: "Areca Palm",
  scientificName: "Dypsis lutescens",
  type: "Indoor Plant",
  description: "Areca Palm is a popular indoor decorative plant with feathery leaves. It is known for improving indoor air quality.",
  category: "Indoor",
  varieties: [
    { name: "Golden Cane Palm", bestFor: "Indoor decor", description: "Bright green feathery leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-3 feet",
    depth: "Shallow",
    sunlight: "Indirect sunlight",
    season: "Year-round",
    water: "Medium",
    germination: "N/A",
    sprouting: "Moderate",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain watering" },
    { month: "April", task: "Fertilize lightly" },
    { month: "July", task: "Clean leaves" },
    { month: "October", task: "Repot if needed" }
  ],
  companionPlants: [
    { name: "Money Plant", benefit: "Indoor pairing" },
    { name: "Peace Lily", benefit: "Air purification" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Water spray" }
  ],
  diseases: [
    { name: "Leaf Yellowing", symptoms: "Yellow leaves", prevention: "Proper watering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/areca.jpeg",
},

p37: {
  id: "p37",
  name: "Peepal Tree",
  scientificName: "Ficus religiosa",
  type: "Tree",
  description: "Peepal is a sacred and long-living tree known for its ecological and medicinal importance. It provides shade and improves air quality.",
  category: "Tree",
  varieties: [
    { name: "Sacred Fig", bestFor: "Religious use", description: "Large spreading tree" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "20-30 feet",
    depth: "2 inches",
    sunlight: "Full sun",
    season: "All seasons",
    water: "Medium",
    germination: "2-3 weeks",
    sprouting: "Moderate",
    harvestTime: "Years",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "June", task: "Plant saplings" },
    { month: "July", task: "Water regularly" },
    { month: "September", task: "Growth phase" },
    { month: "December", task: "Minimal care" }
  ],
  companionPlants: [
    { name: "Tulsi", benefit: "Medicinal synergy" }
  ],
  combativePlants: [
    { name: "Small crops", reason: "Large root spread" }
  ],
  pests: [
    { name: "Leaf Caterpillars", description: "Eat leaves", control: "Manual removal" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Dark spots", prevention: "Proper care" }
  ],
  beneficialCritters: [
    { name: "Birds", benefit: "Ecosystem support" }
  ],
  image: "/images/searchimages/peepal.jpeg",
},
  p38: {
  id: "p38",
  name: "Rubber Plant",
  scientificName: "Ficus elastica",
  type: "Indoor Plant",
  description: "Rubber Plant is a popular indoor plant known for its large, glossy leaves and air-purifying qualities. It adds a bold, modern look to interiors.",
  category: "Indoor",
  varieties: [
    { name: "Burgundy Rubber", bestFor: "Decor", description: "Dark reddish leaves" },
    { name: "Variegated Rubber", bestFor: "Aesthetic appeal", description: "Green leaves with cream patterns" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "2-3 feet",
    depth: "Shallow",
    sunlight: "Indirect bright light",
    season: "Year-round",
    water: "Medium",
    germination: "N/A",
    sprouting: "Moderate",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Maintain watering" },
    { month: "April", task: "Fertilize" },
    { month: "July", task: "Clean leaves" },
    { month: "October", task: "Repot if needed" }
  ],
  companionPlants: [
    { name: "Snake Plant", benefit: "Indoor compatibility" },
    { name: "ZZ Plant", benefit: "Low maintenance combo" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Scale insects", description: "Sticky residue", control: "Neem oil" }
  ],
  diseases: [
    { name: "Leaf Drop", symptoms: "Falling leaves", prevention: "Stable environment" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/rubber-plant.jpeg",
},

p39: {
  id: "p39",
  name: "Croton",
  scientificName: "Codiaeum variegatum",
  type: "Indoor Plant",
  description: "Croton is a colorful ornamental plant known for its vibrant, multi-colored leaves. It enhances indoor and outdoor garden aesthetics.",
  category: "Indoor",
  varieties: [
    { name: "Petra Croton", bestFor: "Decor", description: "Bright red, yellow, green leaves" },
    { name: "Gold Dust", bestFor: "Indoor beauty", description: "Green leaves with yellow spots" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Bright indirect light",
    season: "Year-round",
    water: "Medium",
    germination: "N/A",
    sprouting: "Moderate",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Maintain humidity" },
    { month: "May", task: "Fertilize" },
    { month: "August", task: "Water regularly" },
    { month: "November", task: "Indoor care" }
  ],
  companionPlants: [
    { name: "Dracaena", benefit: "Decor pairing" },
    { name: "Areca Palm", benefit: "Indoor greenery" }
  ],
  combativePlants: [
    { name: "Low light plants", reason: "Needs bright light" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Mist leaves" }
  ],
  diseases: [
    { name: "Leaf Drop", symptoms: "Falling leaves", prevention: "Avoid stress" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/croton.jpeg",
},

p40: {
  id: "p40",
  name: "Anthurium",
  scientificName: "Anthurium andraeanum",
  type: "Flowering Indoor Plant",
  description: "Anthurium is a tropical plant known for its glossy leaves and bright red, heart-shaped flowers. It is popular for indoor decoration.",
  category: "Indoor",
  varieties: [
    { name: "Red Anthurium", bestFor: "Decor", description: "Bright red flowers" },
    { name: "White Anthurium", bestFor: "Elegant interiors", description: "White blooms" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Indirect light",
    season: "Year-round",
    water: "Medium",
    germination: "N/A",
    sprouting: "Moderate",
    harvestTime: "6-12 months",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "March", task: "Repot plant" },
    { month: "June", task: "Maintain humidity" },
    { month: "September", task: "Fertilize" },
    { month: "December", task: "Indoor care" }
  ],
  companionPlants: [
    { name: "Peace Lily", benefit: "Humidity pairing" },
    { name: "Fern", benefit: "Indoor ecosystem" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Aphids", description: "Damage flowers", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Yellow leaves", prevention: "Proper drainage" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/anthurium.jpeg",
},
  p41: {
  id: "p41",
  name: "Jade Plant",
  scientificName: "Crassula ovata",
  type: "Succulent",
  description: "Jade Plant is a hardy succulent known for its thick, glossy leaves and symbolic association with prosperity and good luck. It is widely used as an indoor decorative plant.",
  category: "Succulent",
  varieties: [
    { name: "Classic Jade", bestFor: "Indoor decor", description: "Oval thick green leaves" },
    { name: "Mini Jade", bestFor: "Small pots", description: "Compact growth variety" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Full to partial sunlight",
    season: "Year-round",
    water: "Low (once in 1-2 weeks)",
    germination: "Slow",
    sprouting: "Slow",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "High",
  },
  growingCalendar: [
    { month: "March", task: "Repot if needed" },
    { month: "June", task: "Minimal watering" },
    { month: "September", task: "Check soil dryness" },
    { month: "December", task: "Keep plant dry" }
  ],
  companionPlants: [
    { name: "Cactus", benefit: "Similar watering needs" },
    { name: "Aloe Vera", benefit: "Succulent pairing" }
  ],
  combativePlants: [
    { name: "Fern", reason: "Requires high moisture" }
  ],
  pests: [
    { name: "Mealybugs", description: "White cotton-like insects", control: "Neem oil or alcohol wipe" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Soft stem, yellow leaves", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/jade.jpeg",
},

p42: {
  id: "p42",
  name: "Coleus",
  scientificName: "Plectranthus scutellarioides",
  type: "Ornamental Plant",
  description: "Coleus is a vibrant ornamental plant grown for its colorful foliage. It is ideal for gardens, pots, and indoor decoration.",
  category: "Flower",
  varieties: [
    { name: "Rainbow Coleus", bestFor: "Decoration", description: "Multi-colored leaves" },
    { name: "Wizard Coleus", bestFor: "Garden beds", description: "Compact and dense foliage" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-18 inches",
    depth: "1/4 inch",
    sunlight: "Partial shade",
    season: "Spring to summer",
    water: "Medium",
    germination: "7-14 days",
    sprouting: "Fast",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Start seeds" },
    { month: "March", task: "Transplant seedlings" },
    { month: "May", task: "Regular watering" },
    { month: "July", task: "Prune for bushy growth" }
  ],
  companionPlants: [
    { name: "Begonia", benefit: "Aesthetic pairing" },
    { name: "Petunia", benefit: "Color contrast" }
  ],
  combativePlants: [
    { name: "Full sun plants", reason: "Needs shade conditions" }
  ],
  pests: [
    { name: "Aphids", description: "Damage leaves", control: "Neem oil spray" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Wilting plant", prevention: "Well-drained soil" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination (flowering stage)" }
  ],
  image: "/images/searchimages/coleus.jpeg",
},

p43: {
  id: "p43",
  name: "English Ivy",
  scientificName: "Hedera helix",
  type: "Climber",
  description: "English Ivy is a fast-growing climbing plant used for walls, fences, and indoor decoration. It also helps purify air.",
  category: "Indoor",
  varieties: [
    { name: "Variegated Ivy", bestFor: "Indoor decor", description: "Green leaves with white edges" },
    { name: "Green Ivy", bestFor: "Wall covering", description: "Dense foliage" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Partial to shade",
    season: "Year-round",
    water: "Medium",
    germination: "N/A",
    sprouting: "Fast",
    harvestTime: "N/A",
    frostTolerance: "Moderate",
    heatTolerance: "Low",
  },
  growingCalendar: [
    { month: "January", task: "Indoor maintenance" },
    { month: "April", task: "Trim vines" },
    { month: "July", task: "Water regularly" },
    { month: "October", task: "Shape plant" }
  ],
  companionPlants: [
    { name: "Pothos", benefit: "Indoor pairing" },
    { name: "Fern", benefit: "Humidity balance" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Mist leaves" }
  ],
  diseases: [
    { name: "Leaf Spot", symptoms: "Brown patches", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/ivy.jpeg",
},
  p44: {
  id: "p44",
  name: "Pothos",
  scientificName: "Epipremnum aureum",
  type: "Indoor Plant",
  description: "Pothos is a low-maintenance indoor plant known for its trailing vines and excellent air-purifying ability. It is ideal for beginners and grows well in low light.",
  category: "Indoor",
  varieties: [
    { name: "Golden Pothos", bestFor: "Indoor decor", description: "Green leaves with yellow variegation" },
    { name: "Marble Queen", bestFor: "Aesthetic interiors", description: "White and green patterned leaves" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "1-2 feet",
    depth: "Shallow",
    sunlight: "Low to partial sunlight",
    season: "Year-round",
    water: "Low to medium",
    germination: "N/A",
    sprouting: "Fast",
    harvestTime: "N/A",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Minimal watering" },
    { month: "April", task: "Trim vines" },
    { month: "July", task: "Fertilize lightly" },
    { month: "October", task: "Repot if needed" }
  ],
  companionPlants: [
    { name: "Snake Plant", benefit: "Air purification combo" },
    { name: "ZZ Plant", benefit: "Low maintenance pairing" }
  ],
  combativePlants: [
    { name: "Cactus", reason: "Different watering needs" }
  ],
  pests: [
    { name: "Mealybugs", description: "White insects on stems", control: "Neem oil" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Yellowing leaves", prevention: "Avoid overwatering" }
  ],
  beneficialCritters: [
    { name: "None", benefit: "Indoor plant" }
  ],
  image: "/images/searchimages/pothos.jpeg",
},

p45: {
  id: "p45",
  name: "Geranium",
  scientificName: "Pelargonium",
  type: "Flowering Plant",
  description: "Geranium is a colorful flowering plant widely used in gardens and balconies. It blooms in vibrant shades and is easy to grow.",
  category: "Flower",
  varieties: [
    { name: "Zonal Geranium", bestFor: "Garden beds", description: "Bright round flowers" },
    { name: "Ivy Geranium", bestFor: "Hanging pots", description: "Trailing growth" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "12-18 inches",
    depth: "1/2 inch",
    sunlight: "Full sun",
    season: "Spring to summer",
    water: "Medium",
    germination: "7-14 days",
    sprouting: "Moderate",
    harvestTime: "60-90 days",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Plant seeds" },
    { month: "March", task: "Water regularly" },
    { month: "May", task: "Flowering begins" },
    { month: "July", task: "Deadhead flowers" }
  ],
  companionPlants: [
    { name: "Petunia", benefit: "Enhances garden beauty" },
    { name: "Marigold", benefit: "Pest control" }
  ],
  combativePlants: [
    { name: "Shade plants", reason: "Needs sunlight" }
  ],
  pests: [
    { name: "Aphids", description: "Damage buds", control: "Neem oil" }
  ],
  diseases: [
    { name: "Botrytis Blight", symptoms: "Gray mold", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/geranium.jpeg",
},

p46: {
  id: "p46",
  name: "Petunia",
  scientificName: "Petunia",
  type: "Flowering Plant",
  description: "Petunia is a popular ornamental flower known for its wide range of colors and continuous blooming throughout the season.",
  category: "Flower",
  varieties: [
    { name: "Grandiflora", bestFor: "Large flowers", description: "Big blooms" },
    { name: "Multiflora", bestFor: "Garden beds", description: "Smaller but abundant flowers" }
  ],
  growingInfo: {
    difficulty: "Easy",
    spacing: "10-12 inches",
    depth: "1/4 inch",
    sunlight: "Full sun",
    season: "Spring to summer",
    water: "Medium",
    germination: "5-10 days",
    sprouting: "Fast",
    harvestTime: "45-60 days",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Start seeds indoors" },
    { month: "March", task: "Transplant outdoors" },
    { month: "May", task: "Flowering begins" },
    { month: "August", task: "Deadhead flowers" }
  ],
  companionPlants: [
    { name: "Geranium", benefit: "Colorful pairing" },
    { name: "Marigold", benefit: "Pest control" }
  ],
  combativePlants: [
    { name: "Tall plants", reason: "Block sunlight" }
  ],
  pests: [
    { name: "Caterpillars", description: "Eat flowers", control: "Manual removal" }
  ],
  diseases: [
    { name: "Powdery Mildew", symptoms: "White coating", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Butterflies", benefit: "Pollination" }
  ],
  image: "/images/searchimages/petunia.jpeg",
},
  p47: {
  id: "p47",
  name: "Dahlia",
  scientificName: "Dahlia",
  type: "Flowering Plant",
  description: "Dahlias are vibrant flowering plants known for their large, colorful blooms and wide variety of shapes. They are popular in gardens and floral arrangements.",
  category: "Flower",
  varieties: [
    { name: "Decorative Dahlia", bestFor: "Garden display", description: "Large, layered petals" },
    { name: "Cactus Dahlia", bestFor: "Unique shapes", description: "Spiky petals" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "12-24 inches",
    depth: "2-3 inches",
    sunlight: "Full sun",
    season: "Spring to summer",
    water: "Medium",
    germination: "Tubers planted directly",
    sprouting: "Moderate",
    harvestTime: "90-120 days",
    frostTolerance: "Low",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "March", task: "Plant tubers" },
    { month: "May", task: "Water regularly" },
    { month: "July", task: "Flowering begins" },
    { month: "October", task: "Harvest tubers" }
  ],
  companionPlants: [
    { name: "Marigold", benefit: "Pest control" },
    { name: "Petunia", benefit: "Colorful garden" }
  ],
  combativePlants: [
    { name: "Shade plants", reason: "Needs sunlight" }
  ],
  pests: [
    { name: "Aphids", description: "Damage flowers", control: "Neem oil" }
  ],
  diseases: [
    { name: "Powdery Mildew", symptoms: "White coating", prevention: "Air circulation" }
  ],
  beneficialCritters: [
    { name: "Bees", benefit: "Pollination" }
  ],
  image: "/images/searchimages/dahlia.jpeg",
},

p48: {
  id: "p48",
  name: "Bonsai",
  scientificName: "Various species",
  type: "Miniature Tree",
  description: "Bonsai is the art of growing miniature trees in containers. It requires careful pruning, shaping, and maintenance.",
  category: "Indoor",
  varieties: [
    { name: "Ficus Bonsai", bestFor: "Beginners", description: "Easy to maintain" },
    { name: "Juniper Bonsai", bestFor: "Traditional style", description: "Outdoor bonsai" }
  ],
  growingInfo: {
    difficulty: "Hard",
    spacing: "Small container",
    depth: "Shallow pot",
    sunlight: "Partial sunlight",
    season: "Year-round",
    water: "Medium",
    germination: "Varies by species",
    sprouting: "Slow",
    harvestTime: "Years",
    frostTolerance: "Depends on species",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "January", task: "Pruning" },
    { month: "April", task: "Repotting" },
    { month: "July", task: "Water regularly" },
    { month: "October", task: "Shape trimming" }
  ],
  companionPlants: [],
  combativePlants: [],
  pests: [
    { name: "Spider Mites", description: "Damage leaves", control: "Water spray" }
  ],
  diseases: [
    { name: "Root Rot", symptoms: "Weak growth", prevention: "Proper drainage" }
  ],
  beneficialCritters: [],
  image: "/images/searchimages/bonsai.jpeg",
},

p49: {
  id: "p49",
  name: "Cypress Tree",
  scientificName: "Cupressus",
  type: "Tree",
  description: "Cypress trees are evergreen conifers known for their tall, slender shape and use in landscaping.",
  category: "Tree",
  varieties: [
    { name: "Italian Cypress", bestFor: "Landscape design", description: "Tall and narrow" },
    { name: "Bald Cypress", bestFor: "Wet areas", description: "Grows in swampy soil" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "10-20 feet",
    depth: "1-2 inches",
    sunlight: "Full sun",
    season: "All seasons",
    water: "Medium",
    germination: "2-4 weeks",
    sprouting: "Moderate",
    harvestTime: "Years",
    frostTolerance: "High",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "February", task: "Plant saplings" },
    { month: "April", task: "Water regularly" },
    { month: "July", task: "Growth phase" },
    { month: "November", task: "Minimal care" }
  ],
  companionPlants: [],
  combativePlants: [],
  pests: [
    { name: "Bagworms", description: "Damage foliage", control: "Manual removal" }
  ],
  diseases: [
    { name: "Canker Disease", symptoms: "Branch dieback", prevention: "Pruning" }
  ],
  beneficialCritters: [
    { name: "Birds", benefit: "Habitat" }
  ],
  image: "/images/searchimages/cypress.jpeg",
},

p50: {
  id: "p50",
  name: "Oak Tree",
  scientificName: "Quercus",
  type: "Tree",
  description: "Oak trees are strong, long-living trees known for their hardwood and ecological importance. They provide shade and support wildlife.",
  category: "Tree",
  varieties: [
    { name: "White Oak", bestFor: "Timber", description: "Strong wood" },
    { name: "Red Oak", bestFor: "Landscaping", description: "Fast growing" }
  ],
  growingInfo: {
    difficulty: "Medium",
    spacing: "30-50 feet",
    depth: "2-3 inches",
    sunlight: "Full sun",
    season: "Spring planting",
    water: "Medium",
    germination: "4-6 weeks",
    sprouting: "Slow",
    harvestTime: "Years (decades)",
    frostTolerance: "High",
    heatTolerance: "Moderate",
  },
  growingCalendar: [
    { month: "March", task: "Plant acorns" },
    { month: "May", task: "Water regularly" },
    { month: "August", task: "Growth phase" },
    { month: "December", task: "Dormancy period" }
  ],
  companionPlants: [
    { name: "Clover", benefit: "Improves soil nitrogen" }
  ],
  combativePlants: [
    { name: "Small crops", reason: "Large root system" }
  ],
  pests: [
    { name: "Oak Caterpillars", description: "Eat leaves", control: "Manual removal" }
  ],
  diseases: [
    { name: "Oak Wilt", symptoms: "Leaf discoloration", prevention: "Proper care" }
  ],
  beneficialCritters: [
    { name: "Birds", benefit: "Habitat and ecosystem support" }
  ],
  image: "/images/searchimages/oak.jpeg",
},
  // More plant data would go here in a real application
};

const PlantInfoPage = () => {
  const { id } = useParams<{ id: string }>();
 const plant =
  plantInfoData[id as keyof typeof plantInfoData] ||
  plantInfoData[`p${id}` as keyof typeof plantInfoData];
   
  if (!plant) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Plant information not found. The requested plant may not exist.</p>
          <Button variant="outline" asChild className="mt-4">
            <Link to="/plant-search">Back to Plant Search</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/plant-search">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plant Search
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{plant.name}</CardTitle>
                    <CardDescription>{plant.scientificName}</CardDescription>
                  </div>
                  <Badge variant="outline">{plant.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="varieties">Varieties</TabsTrigger>
                    <TabsTrigger value="companions">Companions</TabsTrigger>
                    <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                    <TabsTrigger value="beneficial">Beneficial</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{plant.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Category</h3>
                        <p className="text-sm">{plant.category}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="growing" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Ruler className="h-5 w-5 text-gray-500" />
                            <CardTitle className="text-lg">Planting Specs</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Spacing:</span>
                              <span className="text-sm">{plant.growingInfo.spacing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Depth:</span>
                              <span className="text-sm">{plant.growingInfo.depth}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Difficulty:</span>
                              <span className="text-sm">{plant.growingInfo.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg">Light & Season</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Sunlight:</span>
                              <span className="text-sm">{plant.growingInfo.sunlight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Season:</span>
                              <span className="text-sm">{plant.growingInfo.season}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Timing</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Germination:</span>
                              <span className="text-sm">{plant.growingInfo.germination}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Time to Harvest:</span>
                              <span className="text-sm">{plant.growingInfo.harvestTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Water & Tolerance</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Water Needs:</span>
                              <span className="text-sm">{plant.growingInfo.water}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Frost Tolerance:</span>
                              <span className="text-sm">{plant.growingInfo.frostTolerance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Heat Tolerance:</span>
                              <span className="text-sm">{plant.growingInfo.heatTolerance}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="varieties" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Popular Varieties</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plant.varieties.map((variety, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-medium">{variety.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{variety.description}</p>
                              <div className="mt-2">
                                <span className="text-xs font-medium">Best for: </span>
                                <span className="text-xs">{variety.bestFor}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="companions" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Companion Plants</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.companionPlants.map((companion, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{companion.name}</h4>
                                <p className="text-sm text-muted-foreground">{companion.benefit}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldAlert className="h-5 w-5 text-red-500" />
                          <h3 className="font-medium">Plants to Avoid</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.combativePlants.map((enemy, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{enemy.name}</h4>
                                <p className="text-sm text-muted-foreground">{enemy.reason}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pests" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Bug className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Common Pests</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.pests.map((pest, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{pest.name}</h4>
                                <p className="text-sm text-muted-foreground">{pest.description}</p>
                                <p className="text-sm mt-1"><span className="font-medium">Control: </span>{pest.control}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldAlert className="h-5 w-5 text-red-500" />
                          <h3 className="font-medium">Common Diseases</h3>
                        </div>
                        <div className="space-y-3">
                          {plant.diseases.map((disease, index) => (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{disease.name}</h4>
                                <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                                <p className="text-sm mt-1"><span className="font-medium">Prevention: </span>{disease.prevention}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="beneficial" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <h3 className="font-medium">Beneficial Critters</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plant.beneficialCritters.map((critter, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-medium">{critter.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{critter.benefit}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Growing Calendar</CardTitle>
                <CardDescription>Monthly activities for {plant.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {plant.growingCalendar.map((item, index) => (
                      <div key={index} className="flex gap-2 pb-2 border-b last:border-0">
                        <span className="font-medium text-sm w-24">{item.month}</span>
                        <span className="text-sm">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Climate</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.season}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Water Needs</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.water}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Sunlight</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.sunlight}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Time to Harvest</p>
                      <p className="text-sm text-muted-foreground">{plant.growingInfo.harvestTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlantInfoPage;
