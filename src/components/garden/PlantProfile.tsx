
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Droplets, Sun, ThermometerSun, AlertTriangle, ArrowLeft, Camera, SprayCan, Sprout, Leaf } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface PlantPhoto {
  id: string;
  url: string;
  date: string;
  caption?: string;
}

const plantData = [
  {
    id: "1",
  name: "Tomato Plant",
  type: "Vegetable",
  scientificName: "Solanum lycopersicum",
  description: "A healthy tomato plant with vibrant green foliage and developing fruit. This variety produces medium-sized, juicy red tomatoes ideal for salads and cooking.",
  images: [
    "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596120236172-231999844ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ],
  health: 85,
  lifeCycleStage: "Fruiting",
  lifeCycleProgress: 65,
  plantedDate: "2024-04-15",
  germinationDate: "2024-04-22",
  floweringDate: "2024-05-20",
  fruitingDate: "2024-06-15",
  harvestDate: "2024-07-30",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2-3 days",
  wateringAmount: "1 inch per week",
  sunlightNeeds: "full",
  sunlightDescription: "6-8 hours of direct sunlight daily",
  soilType: "Well-draining, loamy soil",
  soilpH: "6.0-6.8",
  fertilizingSchedule: "Every 2 weeks during growing season",
  photos: [
    { 
      id: "p1", 
      url: "/images/others/Seedling stage.jpeg", 
      date: "2024-04-30",
      caption: "Seedling stage"
    },
    { 
      id: "p2", 
      url: "/images/others/First flowers appearing.jpeg", 
      date: "2024-05-25",
      caption: "First flowers appearing"
    },
    { 
      id: "p3", 
      url: "/images/others/Developing fruits.jpeg", 
      date: "2024-06-20",
      caption: "Developing fruits"
    },
  ],
  alerts: [
    {
      id: "a1",
      type: "weather",
      title: "Frost Warning",
      description: "Temperatures expected to drop below freezing tonight. Consider covering or moving your plants indoors.",
      date: "2024-06-02"
    },
    {
      id: "a2",
      type: "disease",
      title: "Powdery Mildew Alert",
      description: "Cases of powdery mildew reported in your area. Inspect leaves regularly and treat preventatively.",
      date: "2024-06-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Removed suckers and lower branches to improve air circulation.",
      date: "2024-05-10"
    },
    {
      id: "n2",
      title: "Fertilizing",
      content: "Applied organic tomato fertilizer.",
      date: "2024-05-25"
    }
  ]
},
 {
  id: "2",
  name: "Rose Bush",
  type: "Flowering Plant",
  scientificName: "Rosa",
  description: "A beautiful rose bush known for its fragrant, colorful blooms and thorny stems. Roses are popular ornamental plants that produce flowers in various shades like red, pink, white, and yellow, making them ideal for gardens and landscaping.",
  images: [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  ],
  health: 90,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 70,
  plantedDate: "2024-02-10",
  germinationDate: "2024-02-20",
  floweringDate: "2024-04-15",
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "medium",
  wateringFrequency: "Every 2-3 days",
  wateringAmount: "1-1.5 inches per week",
  sunlightNeeds: "full",
  sunlightDescription: "6-8 hours of direct sunlight daily",
  soilType: "Well-draining, fertile loamy soil",
  soilpH: "6.0-6.5",
  fertilizingSchedule: "Every 4 weeks during growing season",
  photos: [
    { 
      id: "p1", 
      url: "/images/others/Rose bud stage.jpeg", 
      date: "2024-03-10",
      caption: "Bud formation stage"
    },
    { 
      id: "p2", 
      url: "/images/others/Rose first bloom.jpeg", 
      date: "2024-04-20",
      caption: "First blooms appearing"
    },
    { 
      id: "p3", 
      url: "/images/others/Rose full bloom.jpeg", 
      date: "2024-05-05",
      caption: "Full bloom stage"
    },
  ],
  alerts: [
    {
      id: "a1",
      type: "pest",
      title: "Aphid Infestation Alert",
      description: "Aphids may attack new rose growth. Check leaves and buds regularly and use neem oil or insecticidal soap if needed.",
      date: "2024-04-18"
    },
    {
      id: "a2",
      type: "disease",
      title: "Black Spot Warning",
      description: "Black spot fungus can develop in humid conditions. Remove affected leaves and apply fungicide if necessary.",
      date: "2024-05-02"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Pruned dead and weak stems to encourage new growth.",
      date: "2024-03-01"
    },
    {
      id: "n2",
      title: "Fertilizing",
      content: "Added balanced rose fertilizer for better blooming.",
      date: "2024-04-10"
    }
  ]
},
{
  id: "3",
  name: "Basil Plant",
  type: "Herb",
  scientificName: "Ocimum basilicum",
  description: "A fragrant herb widely used in cooking. Basil grows quickly and produces lush green leaves, perfect for garnishing and flavoring dishes.",
  images: [
    "https://images.unsplash.com/photo-1604908554027-8f3d7c3b3c2a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598514982455-1c9b7f3eeced?auto=format&fit=crop&w=800&q=80",
  ],
  health: 88,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 50,
  plantedDate: "2024-03-05",
  germinationDate: "2024-03-12",
  floweringDate: "2024-05-01",
  fruitingDate: null,
  harvestDate: "2024-04-20",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2 days",
  wateringAmount: "Keep soil moist",
  sunlightNeeds: "full",
  sunlightDescription: "6-8 hours sunlight daily",
  soilType: "Well-drained soil",
  soilpH: "6.0-7.5",
  fertilizingSchedule: "Every 3-4 weeks",
  photos: [
    { id: "p1", url: "/images/others/Basil young.jpeg", date: "2024-03-20", caption: "Young basil plant" },
    { id: "p2", url: "/images/others/Basil harvest.jpeg", date: "2024-04-25", caption: "Ready for harvest" }
  ],
  alerts: [],
  notes: [
    {
      id: "n1",
      title: "Pinching",
      content: "Pinched top leaves to promote bushy growth.",
      date: "2024-03-25"
    }
  ]
},
{
  id: "4",
  name: "Apple Tree",
  type: "Fruit Tree",
  scientificName: "Malus domestica",
  description: "A deciduous fruit tree known for producing sweet and crisp apples. Requires seasonal care and proper pruning for best yield.",
  images: [
    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
  ],
  health: 92,
  lifeCycleStage: "Fruiting",
  lifeCycleProgress: 75,
  plantedDate: "2023-01-10",
  germinationDate: null,
  floweringDate: "2024-03-25",
  fruitingDate: "2024-05-10",
  harvestDate: "2024-09-15",
  wateringNeeds: "medium",
  wateringFrequency: "Once a week",
  wateringAmount: "Deep watering required",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight required",
  soilType: "Loamy, well-drained soil",
  soilpH: "6.0-7.0",
  fertilizingSchedule: "Twice a year",
  photos: [
    { id: "p1", url: "/images/others/Apple blossom.jpeg", date: "2024-03-28", caption: "Blossom stage" },
    { id: "p2", url: "/images/others/Apple fruit.jpeg", date: "2024-06-15", caption: "Fruit development" }
  ],
  alerts: [
    {
      id: "a1",
      type: "disease",
      title: "Apple Scab Warning",
      description: "Watch for fungal infections on leaves.",
      date: "2024-04-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Pruned branches to improve airflow.",
      date: "2024-02-15"
    }
  ]
},
  {
  id: "5",
  name: "Aloe Vera",
  type: "Succulent",
  scientificName: "Aloe barbadensis miller",
  description: "A medicinal succulent plant known for its thick, fleshy leaves filled with soothing gel used for skin care and healing.",
  images: [
    "https://images.unsplash.com/photo-1593691509543-c55fb32e5b2c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587502536263-9298c8c9d68d?auto=format&fit=crop&w=800&q=80",
  ],
  health: 95,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 60,
  plantedDate: "2024-01-10",
  germinationDate: null,
  floweringDate: null,
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "low",
  wateringFrequency: "Once every 7-10 days",
  wateringAmount: "Minimal, allow soil to dry",
  sunlightNeeds: "partial",
  sunlightDescription: "Bright indirect sunlight",
  soilType: "Sandy, well-drained soil",
  soilpH: "7.0-8.5",
  fertilizingSchedule: "Once every 2 months",
  photos: [
    {
      id: "p1",
      url: "/images/others/Aloe small.jpeg",
      date: "2024-02-01",
      caption: "Young aloe plant"
    },
    {
      id: "p2",
      url: "/images/others/Aloe mature.jpeg",
      date: "2024-03-15",
      caption: "Mature plant"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Overwatering Risk",
      description: "Avoid excess watering to prevent root rot.",
      date: "2024-02-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Repotting",
      content: "Repotted into a larger container.",
      date: "2024-02-20"
    }
  ]
},
{
  id: "6",
  name: "Money Plant",
  type: "Indoor Plant",
  scientificName: "Epipremnum aureum",
  description: "A popular indoor plant believed to bring prosperity. It has heart-shaped leaves and grows easily in water or soil.",
  images: [
    "https://images.unsplash.com/photo-1598899134739-24c46f58a5c5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
  ],
  health: 90,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 55,
  plantedDate: "2024-02-05",
  germinationDate: "2024-02-15",
  floweringDate: null,
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "low",
  wateringFrequency: "Every 5-7 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "partial",
  sunlightDescription: "Indirect sunlight",
  soilType: "Well-drained potting mix",
  soilpH: "6.0-7.5",
  fertilizingSchedule: "Once a month",
  photos: [
    {
      id: "p1",
      url: "/images/others/Money plant cutting.jpeg",
      date: "2024-02-20",
      caption: "Water propagation"
    },
    {
      id: "p2",
      url: "/images/others/Money plant growth.jpeg",
      date: "2024-03-25",
      caption: "Healthy growth"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Low Light Warning",
      description: "Leaves may turn yellow in very low light.",
      date: "2024-03-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Propagation",
      content: "Cuttings placed in water for growth.",
      date: "2024-02-18"
    }
  ]
},
 {
  id: "7",
  name: "Tulsi (Holy Basil)",
  type: "Medicinal Herb",
  scientificName: "Ocimum tenuiflorum",
  description: "A sacred medicinal plant in India, Tulsi is known for its healing properties and aromatic leaves used in herbal remedies.",
  images: [
    "https://images.unsplash.com/photo-1602330102258-3f3d8e3dfcc5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1628168337639-0e7b4dbe1b68?auto=format&fit=crop&w=800&q=80",
  ],
  health: 92,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 60,
  plantedDate: "2024-03-01",
  germinationDate: "2024-03-08",
  floweringDate: "2024-05-10",
  fruitingDate: null,
  harvestDate: "2024-04-15",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "full",
  sunlightDescription: "5-7 hours sunlight",
  soilType: "Well-drained soil",
  soilpH: "6.0-7.5",
  fertilizingSchedule: "Every 3 weeks",
  photos: [
    {
      id: "p1",
      url: "/images/others/Tulsi young.jpeg",
      date: "2024-03-15",
      caption: "Young Tulsi plant"
    },
    {
      id: "p2",
      url: "/images/others/Tulsi growth.jpeg",
      date: "2024-04-10",
      caption: "Healthy growth"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Overwatering Alert",
      description: "Avoid waterlogging soil.",
      date: "2024-03-20"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Trimmed top leaves for bushy growth.",
      date: "2024-03-25"
    }
  ]
},
  {
  id: "8",
  name: "Neem Tree",
  type: "Medicinal Tree",
  scientificName: "Azadirachta indica",
  description: "A highly valued medicinal tree known for its antibacterial properties and use in organic pest control.",
  images: [
    "https://images.unsplash.com/photo-1616587226963-5c0b3c8c1d32?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=800&q=80",
  ],
  health: 94,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 65,
  plantedDate: "2023-06-15",
  germinationDate: "2023-06-25",
  floweringDate: "2024-03-20",
  fruitingDate: "2024-05-30",
  harvestDate: "2024-06-30",
  wateringNeeds: "low",
  wateringFrequency: "Once a week",
  wateringAmount: "Deep watering",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight required",
  soilType: "Dry, well-drained soil",
  soilpH: "6.5-8.0",
  fertilizingSchedule: "Rarely needed",
  photos: [
    {
      id: "p1",
      url: "/images/others/Neem sapling.jpeg",
      date: "2023-07-10",
      caption: "Young neem plant"
    },
    {
      id: "p2",
      url: "/images/others/Neem tree.jpeg",
      date: "2024-04-15",
      caption: "Growing tree"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Slow Growth",
      description: "Neem grows slowly in early stages.",
      date: "2023-08-01"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Growth Check",
      content: "Plant adapting well to soil.",
      date: "2023-07-20"
    }
  ]
},
  {
  id: "9",
  name: "Orchid",
  type: "Flowering Plant",
  scientificName: "Orchidaceae",
  description: "An elegant and exotic flowering plant known for its stunning, long-lasting blooms. Orchids are perfect for indoor decoration and add a luxurious touch to any space.",
  images: [
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524594154908-edd94f6c36e3?auto=format&fit=crop&w=800&q=80",
  ],
  health: 87,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 75,
  plantedDate: "2024-01-20",
  germinationDate: null,
  floweringDate: "2024-03-10",
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "low",
  wateringFrequency: "Once a week",
  wateringAmount: "Light watering",
  sunlightNeeds: "partial",
  sunlightDescription: "Indirect bright light",
  soilType: "Orchid bark mix",
  soilpH: "5.5-6.5",
  fertilizingSchedule: "Every 2 weeks (diluted)",
  photos: [
    {
      id: "p1",
      url: "/images/others/Orchid bloom.jpeg",
      date: "2024-03-15",
      caption: "Beautiful bloom"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Overwatering Risk",
      description: "Roots may rot if overwatered.",
      date: "2024-03-18"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Placement",
      content: "Placed near window with indirect light.",
      date: "2024-02-01"
    }
  ]
},
  {
  id: "10",
  name: "Lavender",
  type: "Flowering Herb",
  scientificName: "Lavandula",
  description: "A fragrant and visually appealing plant known for its purple flowers. Lavender is used in aromatherapy, decoration, and herbal products.",
  images: [
    "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504983875-d3b7e3b74d95?auto=format&fit=crop&w=800&q=80",
  ],
  health: 91,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 70,
  plantedDate: "2024-02-15",
  germinationDate: "2024-02-25",
  floweringDate: "2024-05-01",
  fruitingDate: null,
  harvestDate: "2024-06-10",
  wateringNeeds: "low",
  wateringFrequency: "Once every 4-5 days",
  wateringAmount: "Low",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight (6-8 hours)",
  soilType: "Sandy, well-drained soil",
  soilpH: "6.5-7.5",
  fertilizingSchedule: "Minimal",
  photos: [
    {
      id: "p1",
      url: "/images/others/Lavender field.jpeg",
      date: "2024-05-10",
      caption: "Blooming lavender"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Humidity Warning",
      description: "Avoid high humidity.",
      date: "2024-05-05"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Trimmed after flowering.",
      date: "2024-06-15"
    }
  ]
},
  {
  id: "11",
  name: "Sunflower",
  type: "Flowering Plant",
  scientificName: "Helianthus annuus",
  description: "A bright and cheerful plant known for its large yellow blooms that follow the sun. Sunflowers add vibrant color and positivity to any garden.",
  images: [
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80",
  ],
  health: 93,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 80,
  plantedDate: "2024-03-10",
  germinationDate: "2024-03-18",
  floweringDate: "2024-05-25",
  fruitingDate: "2024-06-15",
  harvestDate: "2024-07-10",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2-3 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "full",
  sunlightDescription: "Requires full sunlight",
  soilType: "Well-drained soil",
  soilpH: "6.0-7.5",
  fertilizingSchedule: "Every 2 weeks",
  photos: [
    {
      id: "p1",
      url: "/images/others/Sunflower bloom.jpeg",
      date: "2024-06-01",
      caption: "Full bloom sunflower"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Wind Protection",
      description: "Tall stems may need support.",
      date: "2024-05-20"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Staking",
      content: "Added support stick for stability.",
      date: "2024-05-22"
    }
  ]
},
  {
  id: "12",
  name: "Cactus",
  type: "Succulent",
  scientificName: "Cactaceae",
  description: "A low-maintenance desert plant with a modern aesthetic. Cactus stores water in its thick stems and requires minimal care.",
  images: [
    "https://images.unsplash.com/photo-1501004318641-3f3d7c3b3c2a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524594154908-edd94f6c36e3?auto=format&fit=crop&w=800&q=80",
  ],
  health: 97,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 50,
  plantedDate: "2024-01-05",
  germinationDate: null,
  floweringDate: null,
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "low",
  wateringFrequency: "Once every 10-14 days",
  wateringAmount: "Very low",
  sunlightNeeds: "full",
  sunlightDescription: "Bright direct sunlight",
  soilType: "Sandy, well-drained soil",
  soilpH: "5.5-7.0",
  fertilizingSchedule: "Rarely",
  photos: [
    {
      id: "p1",
      url: "/images/others/Cactus pot.jpeg",
      date: "2024-02-01",
      caption: "Indoor cactus"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Overwatering Danger",
      description: "Too much water can kill cactus.",
      date: "2024-02-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Placement",
      content: "Placed in sunny window.",
      date: "2024-01-10"
    }
  ]
},
  {
  id: "13",
  name: "Snake Plant",
  type: "Indoor Plant",
  scientificName: "Sansevieria trifasciata",
  description: "A stylish and hardy indoor plant known for its upright leaves and air-purifying qualities. Perfect for modern home decor.",
  images: [
    "https://images.unsplash.com/photo-1593691512421-1e9b8c0c5a4d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616627981454-1a5e5c5bdb9b?auto=format&fit=crop&w=800&q=80",
  ],
  health: 96,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 55,
  plantedDate: "2024-01-12",
  germinationDate: null,
  floweringDate: null,
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "low",
  wateringFrequency: "Every 10-12 days",
  wateringAmount: "Minimal",
  sunlightNeeds: "partial",
  sunlightDescription: "Low to bright indirect light",
  soilType: "Well-drained soil",
  soilpH: "5.5-7.5",
  fertilizingSchedule: "Every 2 months",
  photos: [
    {
      id: "p1",
      url: "/images/others/Snake plant indoor.jpeg",
      date: "2024-02-01",
      caption: "Indoor placement"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Overwatering Alert",
      description: "Avoid frequent watering.",
      date: "2024-02-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Placement",
      content: "Placed in bedroom corner.",
      date: "2024-01-15"
    }
  ]
},
  {
  id: "14",
  name: "Strawberry Plant",
  type: "Fruit Plant",
  scientificName: "Fragaria × ananassa",
  description: "A small fruit plant producing sweet and juicy strawberries. Ideal for home gardens and containers.",
  images: [
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
  ],
  health: 89,
  lifeCycleStage: "Fruiting",
  lifeCycleProgress: 70,
  plantedDate: "2024-02-20",
  germinationDate: "2024-03-01",
  floweringDate: "2024-04-10",
  fruitingDate: "2024-05-05",
  harvestDate: "2024-06-01",
  wateringNeeds: "medium",
  wateringFrequency: "Every 2 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "full",
  sunlightDescription: "6-8 hours sunlight",
  soilType: "Loamy, well-drained soil",
  soilpH: "5.5-6.5",
  fertilizingSchedule: "Every 2 weeks",
  photos: [
    {
      id: "p1",
      url: "/images/others/Strawberry fruit.jpeg",
      date: "2024-05-10",
      caption: "Fruiting stage"
    }
  ],
  alerts: [
    {
      id: "a1",
      type: "pest",
      title: "Slug Warning",
      description: "Protect fruits from pests.",
      date: "2024-05-12"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Harvest",
      content: "Picked first ripe strawberries.",
      date: "2024-05-20"
    }
  ]
},
  {
  id: "15",
  name: "Hibiscus",
  type: "Flowering Plant",
  scientificName: "Hibiscus rosa-sinensis",
  description: "A tropical flowering plant with large, colorful blooms, commonly used in decoration and herbal uses.",
  images: [
    "https://images.unsplash.com/photo-1597848212624-e6c0c1c9d1d5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563201515-adbe35c669c0?auto=format&fit=crop&w=800&q=80"
  ],
  health: 91,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 75,
  plantedDate: "2024-02-01",
  germinationDate: "2024-02-10",
  floweringDate: "2024-04-15",
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "medium",
  wateringFrequency: "Every 2 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight required",
  soilType: "Well-drained soil",
  soilpH: "6.0-7.0",
  fertilizingSchedule: "Every 2 weeks",
  photos: [
    { id: "p1", url: "/images/others/Hibiscus bloom.jpeg", date: "2024-04-20", caption: "Blooming hibiscus" }
  ],
  alerts: [
    {
      id: "a1",
      type: "pest",
      title: "Aphid Attack",
      description: "Check leaves for aphids and treat with neem oil.",
      date: "2024-04-18"
    },
    {
      id: "a2",
      type: "weather",
      title: "Heat Stress Warning",
      description: "High temperature may cause flower drop.",
      date: "2024-05-10"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Trimmed branches to promote flowering.",
      date: "2024-03-20"
    },
    {
      id: "n2",
      title: "Fertilizing",
      content: "Added potassium-rich fertilizer.",
      date: "2024-04-05"
    }
  ]
},
  {
  id: "16",
  name: "Banana Plant",
  type: "Fruit Plant",
  scientificName: "Musa",
  description: "A fast-growing tropical plant producing bananas. Requires warm climate and high water supply.",
  images: [
    "https://images.unsplash.com/photo-1574226516831-e1dff420e42e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604908177522-432d5cdbde1c?auto=format&fit=crop&w=800&q=80"
  ],
  health: 93,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 60,
  plantedDate: "2023-07-10",
  germinationDate: null,
  floweringDate: "2024-04-01",
  fruitingDate: "2024-06-15",
  harvestDate: "2024-08-20",
  wateringNeeds: "high",
  wateringFrequency: "Daily",
  wateringAmount: "High",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight",
  soilType: "Rich, moist soil",
  soilpH: "5.5-7.0",
  fertilizingSchedule: "Monthly",
  photos: [
    { id: "p1", url: "/images/others/Banana plant.jpeg", date: "2024-05-01", caption: "Growing banana plant" }
  ],
  alerts: [
    {
      id: "a1",
      type: "disease",
      title: "Leaf Spot Disease",
      description: "Brown spots observed on leaves. Monitor and apply fungicide if needed.",
      date: "2024-05-12"
    },
    {
      id: "a2",
      type: "care",
      title: "Water Requirement High",
      description: "Ensure daily watering to prevent drying.",
      date: "2024-05-15"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Soil Enrichment",
      content: "Added compost to improve soil nutrients.",
      date: "2024-04-20"
    },
    {
      id: "n2",
      title: "Support",
      content: "Installed support for heavy fruit bunch.",
      date: "2024-06-10"
    }
  ]
},
  {
  id: "17",
  name: "Mango Tree",
  type: "Fruit Tree",
  scientificName: "Mangifera indica",
  description: "A tropical fruit tree famous for producing sweet and juicy mangoes. Requires warm climate and proper seasonal care.",
  images: [
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590080877777-98a0b3c3f3c2?auto=format&fit=crop&w=800&q=80"
  ],
  health: 94,
  lifeCycleStage: "Fruiting",
  lifeCycleProgress: 80,
  plantedDate: "2022-06-15",
  germinationDate: "2022-07-01",
  floweringDate: "2024-02-20",
  fruitingDate: "2024-04-10",
  harvestDate: "2024-06-25",
  wateringNeeds: "medium",
  wateringFrequency: "Once every 3-4 days",
  wateringAmount: "Deep watering",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight required",
  soilType: "Loamy, well-drained soil",
  soilpH: "5.5-7.5",
  fertilizingSchedule: "Every 2 months",
  photos: [
    { id: "p1", url: "/images/others/Mango fruit.jpeg", date: "2024-05-20", caption: "Mango fruiting stage" }
  ],
  alerts: [
    {
      id: "a1",
      type: "pest",
      title: "Fruit Fly Alert",
      description: "Fruit flies may damage ripening mangoes.",
      date: "2024-05-15"
    },
    {
      id: "a2",
      type: "weather",
      title: "Heatwave Warning",
      description: "Extreme heat may affect fruit quality.",
      date: "2024-05-25"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Pruning",
      content: "Pruned branches after flowering.",
      date: "2024-03-10"
    },
    {
      id: "n2",
      title: "Fertilizing",
      content: "Applied organic compost.",
      date: "2024-04-01"
    }
  ]
},
  {
  id: "18",
  name: "Coriander (Dhaniya)",
  type: "Herb",
  scientificName: "Coriandrum sativum",
  description: "A fast-growing herb used widely in cooking for its fresh leaves and seeds.",
  images: [
    "https://images.unsplash.com/photo-1589927986089-35812388d1d4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604908554097-30b7c8a3c6d2?auto=format&fit=crop&w=800&q=80"
  ],
  health: 89,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 55,
  plantedDate: "2024-03-10",
  germinationDate: "2024-03-18",
  floweringDate: "2024-05-05",
  fruitingDate: null,
  harvestDate: "2024-04-20",
  wateringNeeds: "medium",
  wateringFrequency: "Daily (light watering)",
  wateringAmount: "Keep soil moist",
  sunlightNeeds: "partial",
  sunlightDescription: "Partial sunlight",
  soilType: "Well-drained soil",
  soilpH: "6.2-6.8",
  fertilizingSchedule: "Every 3 weeks",
  photos: [
    { id: "p1", url: "/images/others/Coriander leaves.jpeg", date: "2024-03-25", caption: "Fresh leaves" }
  ],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Bolting Warning",
      description: "High heat may cause early flowering.",
      date: "2024-04-15"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Harvest",
      content: "First leaves harvested.",
      date: "2024-04-05"
    }
  ]
},
  {
  id: "19",
  name: "Marigold",
  type: "Flowering Plant",
  scientificName: "Tagetes",
  description: "A bright flowering plant used for decoration and pest control in gardens.",
  images: [
    "https://images.unsplash.com/photo-1501004318641-3f3d7c3b3c2a?auto=format&fit=crop&w=800&q=80"
  ],
  health: 92,
  lifeCycleStage: "Flowering",
  lifeCycleProgress: 70,
  plantedDate: "2024-02-25",
  germinationDate: "2024-03-05",
  floweringDate: "2024-04-20",
  fruitingDate: null,
  harvestDate: null,
  wateringNeeds: "medium",
  wateringFrequency: "Every 2 days",
  wateringAmount: "Moderate",
  sunlightNeeds: "full",
  sunlightDescription: "Full sunlight",
  soilType: "Well-drained soil",
  soilpH: "6.0-7.5",
  fertilizingSchedule: "Monthly",
  photos: [],
  alerts: [
    {
      id: "a1",
      type: "pest",
      title: "Spider Mite Risk",
      description: "Inspect leaves regularly.",
      date: "2024-04-25"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Planting",
      content: "Used for pest control near vegetables.",
      date: "2024-03-01"
    }
  ]
},
  {
  id: "20",
  name: "Spinach",
  type: "Leafy Vegetable",
  scientificName: "Spinacia oleracea",
  description: "A nutrient-rich leafy vegetable that grows quickly and is ideal for home gardening.",
  images: [
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"
  ],
  health: 90,
  lifeCycleStage: "Growth",
  lifeCycleProgress: 65,
  plantedDate: "2024-03-01",
  germinationDate: "2024-03-07",
  floweringDate: null,
  fruitingDate: null,
  harvestDate: "2024-04-10",
  wateringNeeds: "medium",
  wateringFrequency: "Daily",
  wateringAmount: "Keep soil moist",
  sunlightNeeds: "partial",
  sunlightDescription: "Partial sunlight",
  soilType: "Rich, moist soil",
  soilpH: "6.5-7.5",
  fertilizingSchedule: "Every 2 weeks",
  photos: [],
  alerts: [
    {
      id: "a1",
      type: "care",
      title: "Heat Warning",
      description: "High temperatures reduce leaf quality.",
      date: "2024-04-05"
    }
  ],
  notes: [
    {
      id: "n1",
      title: "Harvest",
      content: "Leaves harvested regularly.",
      date: "2024-04-08"
    }
  ]
}
];
// Sample growing calendar data
const growingData = [
  { month: "January", activity: "Plan and purchase seeds" },
  { month: "February", activity: "Start seeds indoors" },
  { month: "March", activity: "Continue indoor growth" },
  { month: "April", activity: "Harden off seedlings, prepare soil" },
  { month: "May", activity: "Transplant outdoors, stake plants" },
  { month: "June", activity: "Regular watering, watch for pests" },
  { month: "July", activity: "Harvest early fruits, continue care" },
  { month: "August", activity: "Peak harvest season" },
  { month: "September", activity: "Continued harvest, prepare for end of season" },
  { month: "October", activity: "Final harvest, remove plants" },
  { month: "November", activity: "Clean up garden beds" },
  { month: "December", activity: "Plan for next season" },
];

const PlantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // In a real app, you would fetch the plant data based on the ID
  // For now, we'll use the sample data
  const plant = plantData.find(p => p.id === id) || plantData[0];
  
  const getLifecycleProgress = () => {
    const stages = [
      { label: "Germination", date: plant.germinationDate, icon: Sprout },
      { label: "Growth", date: null, icon: Leaf },
      { label: "Flowering", date: plant.floweringDate, icon: Flower },
      { label: "Fruiting", date: plant.fruitingDate, icon: Fruit },
      { label: "Harvest", date: plant.harvestDate, icon: Harvest },
    ];
    
    return (
      <div className="space-y-6 mt-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Lifecycle Progress</span>
            <span className="text-sm font-medium">{plant.lifeCycleProgress}%</span>
          </div>
          <Progress value={plant.lifeCycleProgress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`rounded-full p-2 ${plant.lifeCycleStage === stage.label ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <stage.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{stage.label}</h4>
                  {stage.date && (
                    <span className="text-sm text-muted-foreground">
                      {new Date(stage.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {plant.lifeCycleStage === stage.label && (
                  <p className="text-sm text-muted-foreground">Current stage</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // We'll define these component functions to solve "No Flower export" and similar problems
  const Flower = () => <Leaf className="h-4 w-4" />;
  const Fruit = () => <Droplets className="h-4 w-4" />;
  const Harvest = () => <Sprout className="h-4 w-4" />;
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/garden">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Garden
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
                <Tabs defaultValue="details">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                    <TabsTrigger value="care">Care</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img 
                        src={plant.images[0]} 
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
                        <h3 className="font-medium mb-2">Plant Health</h3>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.health} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{plant.health}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Key Dates</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Planted:</span>
                            <span>{new Date(plant.plantedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Germination:</span>
                            <span>{plant.germinationDate   ? new Date(plant.germinationDate).toLocaleDateString() : "N/A"}</span>
                          </div>
                          {plant.harvestDate && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expected Harvest:</span>
                              <span>{new Date(plant.harvestDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lifecycle" className="mt-4">
                    {getLifecycleProgress()}
                  </TabsContent>
                  
                  <TabsContent value="care" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-lg">Watering</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Frequency:</span>
                              <span className="text-sm">{plant.wateringFrequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Amount:</span>
                              <span className="text-sm">{plant.wateringAmount}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg">Sunlight</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Needs:</span>
                              <span className="text-sm capitalize">{plant.sunlightNeeds} sun</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Description:</span>
                              <span className="text-sm">{plant.sunlightDescription}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Sprout className="h-5 w-5 text-green-500" />
                            <CardTitle className="text-lg">Soil</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Type:</span>
                              <span className="text-sm">{plant.soilType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">pH:</span>
                              <span className="text-sm">{plant.soilpH}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <SprayCan className="h-5 w-5 text-green-600" />
                            <CardTitle className="text-lg">Fertilizing</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Schedule:</span>
                              <span className="text-sm">{plant.fertilizingSchedule}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="photos" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Plant Journey Photos</h3>
                      <Button size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Add Photo
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {plant.photos.map((photo: PlantPhoto) => (
                        <Card key={photo.id} className="overflow-hidden">
                          <div className="aspect-square">
                            <img 
                              src={photo.url} 
                              alt={`Photo from ${photo.date}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardFooter className="p-2">
                            <div className="w-full">
                              <p className="text-sm truncate">{photo.caption}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(photo.date).toLocaleDateString()}
                              </p>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alerts" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Alerts</h3>
                      
                      {plant.alerts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No active alerts for this plant.</p>
                      ) : (
                        <div className="space-y-2">
                          {plant.alerts.map(alert => (
                            <Card key={alert.id} className="border-l-4 border-l-amber-500">
                              <CardContent className="p-4">
                                <div className="flex gap-2">
                                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                  <div>
                                    <h4 className="font-medium">{alert.title}</h4>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(alert.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Plant Notes</h3>
                        {plant.notes.map(note => (
                          <Card key={note.id} className="mb-2">
                            <CardContent className="p-3">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{note.title}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(note.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{note.content}</p>
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
                <div className="mb-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>
                
                <h4 className="font-medium mb-2">Annual Growing Guide</h4>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {growingData.map((item, index) => (
                      <div key={index} className="flex gap-2 pb-2 border-b last:border-0">
                        <span className="font-medium text-sm w-24">{item.month}</span>
                        <span className="text-sm">{item.activity}</span>
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
                      <p className="text-sm font-medium">Best Temperature</p>
                      <p className="text-sm text-muted-foreground">65-85°F (18-29°C)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Water Needs</p>
                      <p className="text-sm text-muted-foreground">{plant.wateringAmount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Sunlight</p>
                      <p className="text-sm text-muted-foreground">{plant.sunlightDescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Time to Harvest</p>
                      <p className="text-sm text-muted-foreground">70-85 days from transplant</p>
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

export default PlantProfile;
