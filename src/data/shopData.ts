
import { Product, Review } from "@/types/shop";

// Mock data for the shop products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smart Self-Watering Pot",
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
    id: "2",
    name: "Organic Plant Food Concentrate",
    category: "Fertilizers",
    description: "100% organic plant food that promotes healthy growth and vibrant blooms. Concentrated formula means a little goes a long way. Safe for all houseplants and outdoor gardens.",
    price: 24.99,
    discount: "",
    discountedPrice: 24.99,
    stockStatus: "In Stock",
    images: [
      "public/images/others/Organic Plant Food Concentrate1.jpg", "public/images/others/Organic Plant Food Concentrate2.jpg", "public/images/others/Organic Plant Food Concentrate3.jpg"
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
    id: "3",
    name: "Plant Health Monitor",
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
  }
];

// Dummy reviews data
export const mockReviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    user: "GreenThumb23",
    rating: 5,
    comment: "This smart pot has completely changed how I care for my plants! The auto-watering feature is a lifesaver when I'm traveling.",
    date: "2 weeks ago"
  },
  {
    id: "r2",
    productId: "1",
    user: "PlantLover99",
    rating: 4,
    comment: "Great product, easy to set up and the app works well. Taking off one star because the water reservoir could be larger.",
    date: "1 month ago"
  },
  {
    id: "r3",
    productId: "2",
    user: "OrganicGardener",
    rating: 5,
    comment: "My plants are thriving with this fertilizer! Will definitely purchase again.",
    date: "3 weeks ago"
  }
];
