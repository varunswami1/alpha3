
import { Product, Review } from "@/types/shop";

// Mock data for the shop products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Plant Food Concentrate",
    link: "https://www.amazon.com/Compressed-Organic-Potting-Soil-Nutrient-Dense/dp/B0C2F8Y9RR?th=1",
    category: "Fertilizers",
    description: "100% organic plant food that promotes healthy growth and vibrant blooms. Concentrated formula means a little goes a long way. Safe for all houseplants and outdoor gardens.",
    price: 24.99,
    discount: "",
    discountedPrice: 24.99,
    stockStatus: "In Stock",
    images: [
      "/images/others/Organic Plant Food Concentrate1.jpg", "/images/others/Organic Plant Food Concentrate2.jpg", "/images/others/Organic Plant Food Concentrate3.jpg"
    ],
    hasVideo: false,
    rating: 4.5,
    reviewsCount: 89,
    smartFeatures: [],
    compatibility: [],
    deliveryEstimate: "2-3 business days",
    freeShipping: true,
    warranty: "100% satisfaction guarantee",
    loyaltyPoints: 50
  },
  {
    id: "2",
    name: "Plant Health Monitor",
    link: "https://www.amazon.com/dp/B0CNVPM3FW/?tag=audite-20",
    category: "Sensors",
    description: "Keep track of your plant's vital stats with this advanced sensor. Monitors light, moisture, temperature, and nutrients. Sync with your smartphone for real-time updates and personalized care recommendations.",
    price: 54.99,
    discount: "10% off",
    discountedPrice: 49.49,
    stockStatus: "Low Stock",
    images: [
      "/images/others/Plant Health Monitor1.jpg", "/images/others/Plant Health Monitor2.jpg", "/images/others/Plant Health Monitor3.jpg", "/images/others/Plant Health Monitor4.jpg", "/images/others/Plant Health Monitor5.jpg"
    ],
    hasVideo: true,
    rating: 4.7,
    reviewsCount: 68,
    smartFeatures: ["Light tracking", "Temperature monitoring", "Nutrient analysis", "Care recommendations"],
    compatibility: ["iOS", "Android", "Web dashboard"],
    deliveryEstimate: "3-5 business days",
    freeShipping: true,
    warranty: "2 year manufacturer warranty",
    loyaltyPoints: 120
  },
    {
    id: "3",
    name: "Smart Self-Watering Pot",
    link: "https://www.yankodesign.com/2021/12/09/this-smart-self-watering-indoor-planter-is-a-futuristic-appliance-that-is-almost-sculptural-in-nature/",
    category: "Pots",
    description: "Never forget to water your plants again! This smart pot monitors soil moisture and waters automatically when needed. Includes a mobile app for remote monitoring and customization.",
    price: 39.99,
    discount: "15% off",
    discountedPrice: 33.99,
    stockStatus: "In Stock",
    images: [
      "/images/others/Smart Self-Watering Pot1.webp", "/images/others/Smart Self-Watering Pot2.webp", "/images/others/Smart Self-Watering Pot3.jpg", "/images/others/Smart Self-Watering Pot4.jpg", "/images/others/Smart Self-Watering Pot5.webp"
    ],
    hasVideo: true,
    rating: 4.8,
    reviewsCount: 124,
    smartFeatures: ["Mobile app", "Moisture sensing", "Auto-watering", "Low water alerts"],
    compatibility: ["iOS", "Android", "Alexa", "Google Home"],
    deliveryEstimate: "2-3 business days",
    freeShipping: true,
    warranty: "1 year manufacturer warranty",
    loyaltyPoints: 100
  },
  {
  id: "4",
  name: "LED Grow Light Panel",
  link: "https://www.amazon.in/Spectrum-Coverage-Greenhouse-Vegetables-Succulent/dp/B0945T2KNS",
  category: "Lighting",
  description: "Full-spectrum LED grow light designed to support indoor plant growth. Ideal for seedlings, herbs, and houseplants. Energy-efficient and adjustable brightness settings.",
  price: 29.99,
  discount: "20% off",
  discountedPrice: 23.99,
  stockStatus: "In Stock",
  images: [
    "/images/others/ledGrowLight.jpg",
    "/images/others/ledGrowLight2.jpg",
    "/images/others/ledGrowLight3.jpg"
  ],
  hasVideo: true,
  rating: 4.6,
  reviewsCount: 75,
  smartFeatures: ["Full-spectrum lighting", "Adjustable brightness", "Timer settings"],
  compatibility: ["Indoor plants", "Hydroponics"],
  deliveryEstimate: "2-4 business days",
  freeShipping: true,
  warranty: "1 year manufacturer warranty",
  loyaltyPoints: 80
},
{
  id: "5",
  name: "Premium Gardening Tool Kit",
  link: "https://www.amazon.in/UGAOO-Gardening-Cultivator-Watering-Vermicompost/dp/B0D1CRGTYF?th=1",
  category: "Tools",
  description: "Complete gardening toolkit including trowel, pruner, weeder, and gloves. Made with durable stainless steel and ergonomic handles for comfortable use.",
  price: 19.99,
  discount: "",
  discountedPrice: 19.99,
  stockStatus: "In Stock",
  images: [
    "/images/others/GradeningToolKit1.jpg",
    "/images/others/GradeningToolKit2.jpg",
    "/images/others/GdeningToolKit3.jpg"
  ],
  hasVideo: false,
  rating: 4.4,
  reviewsCount: 52,
  smartFeatures: [],
  compatibility: ["Indoor gardening", "Outdoor gardening"],
  deliveryEstimate: "3-5 business days",
  freeShipping: false,
  warranty: "6 months warranty",
  loyaltyPoints: 40
},
{
  id: "6",
  name: "Automatic Watering Control System",
  link: "https://www.amazon.in/Automatic-Watering-Control-Irrigation-Shortage/dp/B0D982BBSB",
  category: "Irrigation",
  description: "Smart automatic watering system with Wi-Fi and app control. Ensures consistent hydration and sends alerts during water shortages.",
  price: 44.99,
  discount: "10% off",
  discountedPrice: 40.49,
  stockStatus: "In Stock",
  images: [
    "/images/others/autowateringSystem.jpg",
    "/images/others/autoWateringSystem2.jpg",
    "/images/others/autoWateringSystem3.jpg"
  ],
  hasVideo: true,
  rating: 4.7,
  reviewsCount: 90,
  smartFeatures: ["Auto scheduling", "Water saving", "Easy installation"],
  compatibility: ["Balcony gardens", "Terrace gardens", "Greenhouses"],
  deliveryEstimate: "2-3 business days",
  freeShipping: true,
  warranty: "1 year manufacturer warranty",
  loyaltyPoints: 110
},
{
  id: "7",
  name: "Soil Moisture Sensor Kit",
  link: "https://www.amazon.in/Electron-Moisture-Output-Soil-Hygrometer-Soil-Sensor-Soil/dp/B0D2BMSXQ8?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A3C7Z4RVM9A3G1",
  category: "Sensors",
  description: "Accurate soil moisture sensor for monitoring plant hydration levels. Ideal for DIY smart gardening and IoT projects. Easy to integrate with microcontrollers.",
  price: 14.99,
  discount: "",
  discountedPrice: 14.99,
  stockStatus: "In Stock",
  images: [
    "/images/others/soilMoisture.jpg",
    "/images/others/soilMoisture2.jpg",
    "/images/others/soilMoisture3.jpg"
  ],
  hasVideo: false,
  rating: 4.3,
  reviewsCount: 41,
  smartFeatures: ["Real-time moisture detection", "Low power consumption"],
  compatibility: ["Arduino", "Raspberry Pi", "ESP32"],
  deliveryEstimate: "3-6 business days",
  freeShipping: false,
  warranty: "6 months warranty",
  loyaltyPoints: 30
},
{
  id: "8",
  name: "Portable Mini Greenhouse",
  link: "https://www.amazon.in/Greenhouse-Portable-Roll-Up-Transparent-Seedlings/dp/B0CPLR4M31",
  category: "Accessories",
  description: "Compact greenhouse for protecting plants from harsh weather. Maintains humidity and temperature for optimal plant growth.",
  price: 34.99,
  discount: "12% off",
  discountedPrice: 30.79,
  stockStatus: "In Stock",
  images: [
    "/images/others/portableGreenHouse.jpg",
    "/images/others/portableGreenHouse2.jpg",
    "/images/others/portableGreenhouse3.jpg"
  ],
  hasVideo: false,
  rating: 4.5,
  reviewsCount: 63,
  smartFeatures: [],
  compatibility: ["Indoor plants", "Outdoor gardens"],
  deliveryEstimate: "4-6 business days",
  freeShipping: true,
  warranty: "1 year warranty",
  loyaltyPoints: 70
},
{
  id: "9",
  name: "Eco Compost Bin",
  link: "https://www.amazon.in/Surprise%C2%AE-Organic-Composting-litres-Indoor/dp/B0FFH6ZX2S?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2QYT8O285K7ON",
  category: "Sustainability",
  description: "Turn kitchen waste into nutrient-rich compost for your plants. Odor-free design and easy to use for home gardeners.",
  price: 27.99,
  discount: "",
  discountedPrice: 27.99,
  stockStatus: "In Stock",
  images: [
    "/images/others/ecoCompostBin1.jpg",
    "/images/others/ecoCompostBin2.jpg",
    "/images/others/ecoCompostBin3.jpg"
  ],
  hasVideo: false,
  rating: 4.4,
  reviewsCount: 58,
  smartFeatures: [],
  compatibility: ["Home gardening", "Organic farming"],
  deliveryEstimate: "3-5 business days",
  freeShipping: true,
  warranty: "1 year warranty",
  loyaltyPoints: 60
}
];

// Dummy reviews data
export const mockReviews: Review[] = [
  // Product 1 - Organic Plant Food
  {
    id: "r1",
    productId: "1",
    user: "OrganicGardener",
    rating: 5,
    comment: "My plants are thriving with this fertilizer! Leaves look greener and healthier within weeks.",
    date: "3 weeks ago"
  },
  {
    id: "r2",
    productId: "1",
    user: "SoilLover",
    rating: 4,
    comment: "Good product, works well for indoor plants. Slightly expensive but worth it.",
    date: "1 month ago"
  },

  // Product 2 - Plant Health Monitor
  {
    id: "r3",
    productId: "2",
    user: "TechGardener",
    rating: 5,
    comment: "Super useful device! The app gives accurate insights and helps me maintain my plants easily.",
    date: "2 weeks ago"
  },
  {
    id: "r4",
    productId: "2",
    user: "GreenTechie",
    rating: 4,
    comment: "Great sensor overall, but initial setup took a bit of time.",
    date: "1 month ago"
  },

  // Product 3 - Smart Self-Watering Pot
  {
    id: "r5",
    productId: "3",
    user: "GreenThumb23",
    rating: 5,
    comment: "This smart pot has completely changed how I care for my plants! Perfect for busy schedules.",
    date: "2 weeks ago"
  },
  {
    id: "r6",
    productId: "3",
    user: "PlantLover99",
    rating: 4,
    comment: "Very convenient and easy to use. Reservoir could be slightly bigger.",
    date: "1 month ago"
  },

  // Product 4 - LED Grow Light
  {
    id: "r7",
    productId: "4",
    user: "IndoorFarmer",
    rating: 5,
    comment: "Amazing light! My indoor herbs are growing much faster now.",
    date: "5 days ago"
  },
  {
    id: "r8",
    productId: "4",
    user: "BalconyGardener",
    rating: 4,
    comment: "Good brightness and coverage. Would love a longer power cable.",
    date: "2 weeks ago"
  },

  // Product 5 - Gardening Tool Kit
  {
    id: "r9",
    productId: "5",
    user: "GardenStarter",
    rating: 4,
    comment: "Perfect starter kit. Tools feel sturdy and comfortable to use.",
    date: "3 weeks ago"
  },
  {
    id: "r10",
    productId: "5",
    user: "PlantMom",
    rating: 5,
    comment: "Great value for money. Everything you need in one package.",
    date: "10 days ago"
  },

  // Product 6 - Automatic Watering System
  {
    id: "r11",
    productId: "6",
    user: "BusyGardener",
    rating: 5,
    comment: "A lifesaver! Keeps my plants watered even when I'm away.",
    date: "1 week ago"
  },
  {
    id: "r12",
    productId: "6",
    user: "SmartHomeUser",
    rating: 4,
    comment: "Works well with the app. Installation was easier than expected.",
    date: "2 weeks ago"
  },

  // Product 7 - Soil Moisture Sensor
  {
    id: "r13",
    productId: "7",
    user: "DIYBuilder",
    rating: 5,
    comment: "Perfect for my Arduino project. Accurate readings and easy to use.",
    date: "6 days ago"
  },
  {
    id: "r14",
    productId: "7",
    user: "ElectroGeek",
    rating: 4,
    comment: "Good sensor for beginners. Documentation could be better.",
    date: "3 weeks ago"
  },

  // Product 8 - Mini Greenhouse
  {
    id: "r15",
    productId: "8",
    user: "TerraceFarmer",
    rating: 5,
    comment: "Really helps protect plants from harsh sunlight and wind.",
    date: "2 weeks ago"
  },
  {
    id: "r16",
    productId: "8",
    user: "HomeGardener",
    rating: 4,
    comment: "Nice compact design. Easy to assemble and move around.",
    date: "1 month ago"
  },

  // Product 9 - Compost Bin
  {
    id: "r17",
    productId: "9",
    user: "EcoFriendly",
    rating: 5,
    comment: "Great for turning kitchen waste into compost. No bad smell at all.",
    date: "2 weeks ago"
  },
  {
    id: "r18",
    productId: "9",
    user: "SustainableLife",
    rating: 4,
    comment: "Works well, but takes some time to get used to composting.",
    date: "3 weeks ago"
  }
];
