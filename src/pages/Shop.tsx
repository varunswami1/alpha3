import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Info,
  Truck,
  Heart,
  ShoppingCart,
  Clock,
  Check,
  X,
  Wifi,
  MessageCircle,
  Send,
  Gift,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

// Mock data for the shop products
const mockProducts = [
  {
    id: "1",
    name: "Smart Self-Watering Pot",
    category: "Pots",
    description:
      "Never forget to water your plants again! This smart pot monitors soil moisture and waters automatically when needed. Includes a mobile app for remote monitoring and customization.",
    price: 39.99,
    discount: "15% off",
    discountedPrice: 33.99,
    stockStatus: "In Stock",
    images: [
      "🪴",
      "🌱",
      "🌿", // Using emojis as placeholders
    ],
    hasVideo: true,
    rating: 4.8,
    reviewsCount: 124,
    smartFeatures: [
      "Mobile app",
      "Moisture sensing",
      "Auto-watering",
      "Low water alerts",
    ],
    compatibility: ["iOS", "Android", "Alexa", "Google Home"],
    deliveryEstimate: "2-3 business days",
    freeShipping: true,
    warranty: "1 year manufacturer warranty",
    loyaltyPoints: 100,
  },
  {
    id: "2",
    name: "Organic Plant Food Concentrate",
    category: "Fertilizers",
    description:
      "100% organic plant food that promotes healthy growth and vibrant blooms. Concentrated formula means a little goes a long way. Safe for all houseplants and outdoor gardens.",
    price: 24.99,
    discount: "",
    discountedPrice: 24.99,
    stockStatus: "In Stock",
    images: [
      "💧",
      "🧪",
      "🌱", // Using emojis as placeholders
    ],
    hasVideo: false,
    rating: 4.5,
    reviewsCount: 89,
    smartFeatures: [],
    compatibility: [],
    deliveryEstimate: "2-3 business days",
    freeShipping: true,
    warranty: "100% satisfaction guarantee",
    loyaltyPoints: 50,
  },
  {
    id: "3",
    name: "Plant Health Monitor",
    category: "Sensors",
    description:
      "Keep track of your plant's vital stats with this advanced sensor. Monitors light, moisture, temperature, and nutrients. Sync with your smartphone for real-time updates and personalized care recommendations.",
    price: 54.99,
    discount: "10% off",
    discountedPrice: 49.49,
    stockStatus: "Low Stock",
    images: [
      "📱",
      "🌡️",
      "🔆", // Using emojis as placeholders
    ],
    hasVideo: true,
    rating: 4.7,
    reviewsCount: 68,
    smartFeatures: [
      "Light tracking",
      "Temperature monitoring",
      "Nutrient analysis",
      "Care recommendations",
    ],
    compatibility: ["iOS", "Android", "Web dashboard"],
    deliveryEstimate: "3-5 business days",
    freeShipping: true,
    warranty: "2 year manufacturer warranty",
    loyaltyPoints: 120,
  },
];

// Dummy reviews data
const mockReviews = [
  {
    id: "r1",
    productId: "1",
    user: "GreenThumb23",
    rating: 5,
    comment:
      "This smart pot has completely changed how I care for my plants! The auto-watering feature is a lifesaver when I'm traveling.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    productId: "1",
    user: "PlantLover99",
    rating: 4,
    comment:
      "Great product, easy to set up and the app works well. Taking off one star because the water reservoir could be larger.",
    date: "1 month ago",
  },
  {
    id: "r3",
    productId: "2",
    user: "OrganicGardener",
    rating: 5,
    comment:
      "My plants are thriving with this fertilizer! Will definitely purchase again.",
    date: "3 weeks ago",
  },
];

// Shop listing page
const ShopListingPage = () => {
  const [category, setCategory] = useState<string>("all");

  const filteredProducts =
    category === "all"
      ? mockProducts
      : mockProducts.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Garden Shop</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={category === "all" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("all")}
          >
            All Products
          </Button>
          <Button
            variant="outline"
            className={category === "pots" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("pots")}
          >
            Pots
          </Button>
          <Button
            variant="outline"
            className={
              category === "fertilizers" ? "bg-primary/10 text-primary" : ""
            }
            onClick={() => setCategory("fertilizers")}
          >
            Fertilizers
          </Button>
          <Button
            variant="outline"
            className={
              category === "sensors" ? "bg-primary/10 text-primary" : ""
            }
            onClick={() => setCategory("sensors")}
          >
            Sensors
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center text-4xl">
                {product.images[0]}
              </div>
              {product.discount && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  {product.discount}
                </Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-neutral-500">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {product.discount ? (
                  <>
                    <span className="text-lg font-bold">
                      ${product.discountedPrice}
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${product.price}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge
                  variant={
                    product.stockStatus === "In Stock"
                      ? "default"
                      : product.stockStatus === "Low Stock"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {product.stockStatus}
                </Badge>
                {product.freeShipping && (
                  <Badge variant="secondary">Free Shipping</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild variant="default" className="flex-1">
                <a href={`/shop/${product.id}`}>View Details</a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Product details page
const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const productReviews = mockReviews.filter((r) => r.productId === product.id);

  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const submitReview = (data: any) => {
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    form.reset();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-neutral-100 rounded-md flex items-center justify-center text-8xl">
            {product.images[imageIndex]}
          </div>
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square w-16 bg-neutral-100 rounded flex items-center justify-center text-2xl
                  ${index === imageIndex ? "ring-2 ring-primary" : ""}`}
                onClick={() => setImageIndex(index)}
              >
                {image}
              </button>
            ))}
          </div>
          {product.hasVideo && (
            <Button variant="outline" className="w-full gap-2">
              <Play className="h-4 w-4" /> Watch Product Video
            </Button>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-neutral-500">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {product.discount ? (
              <>
                <span className="text-2xl font-bold">
                  ${product.discountedPrice}
                </span>
                <span className="text-neutral-500 line-through">
                  ${product.price}
                </span>
                <Badge className="bg-red-500">{product.discount}</Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={
                product.stockStatus === "In Stock"
                  ? "default"
                  : product.stockStatus === "Low Stock"
                  ? "outline"
                  : "destructive"
              }
              className="text-sm"
            >
              {product.stockStatus}
            </Badge>
            {product.freeShipping && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
            )}
          </div>

          <p className="text-neutral-700">{product.description}</p>

          {product.smartFeatures.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Smart Features:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.smartFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.compatibility.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Compatible with:</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>

            <div className="bg-neutral-50 p-4 rounded-md space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Delivery Estimate</p>
                  <p className="text-sm text-neutral-600">
                    {product.deliveryEstimate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-sm text-neutral-600">{product.warranty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Loyalty Points</p>
                  <p className="text-sm text-neutral-600">
                    Earn {product.loyaltyPoints} points with this purchase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <h3 className="text-xl font-medium">Product Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Dimensions</h4>
              <p className="text-neutral-600">8" × 8" × 10" (H×W×D)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Materials</h4>
              <p className="text-neutral-600">
                BPA-free plastic, ceramic inner pot
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Water Capacity</h4>
              <p className="text-neutral-600">500ml reservoir</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Battery Life</h4>
              <p className="text-neutral-600">
                Up to 3 months on a single charge
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">Customer Reviews</h3>
            <Button variant="outline">Write a Review</Button>
          </div>

          <div className="space-y-4">
            {productReviews.length > 0 ? (
              <>
                {productReviews.map((review) => (
                  <div key={review.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <p className="text-xs text-neutral-500">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700">{review.comment}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center p-6 border rounded-md">
                <p className="text-neutral-600">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">Add Your Review</h4>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitReview)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => field.onChange(star)}
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                field.value >= star
                                  ? "text-amber-500"
                                  : "text-neutral-300"
                              }`}
                            >
                              <Star className="h-6 w-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience with this product..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit Review</Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4 pt-4">
          <h3 className="text-xl font-medium">Shipping & Returns</h3>
          <div className="space-y-4">
            <div className="bg-neutral-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Shipping Policy</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Free shipping on orders over $50</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Standard shipping: 3-7 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Expedited shipping available at checkout for an additional
                    fee
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Return Policy</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    30-day return policy for unused items in original packaging
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    Return shipping fees may apply depending on the reason for
                    return
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Defective items can be returned or exchanged at no
                    additional cost
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4 pt-4">
          <h3 className="text-xl font-medium">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medium">How long does the battery last?</h4>
              <p className="text-neutral-600 mt-2">
                The battery typically lasts up to 3 months on a single charge
                with normal usage. This may vary depending on how often the
                watering system activates.
              </p>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium">
                Is the app available for both iOS and Android?
              </h4>
              <p className="text-neutral-600 mt-2">
                Yes, our app is available for download on both iOS and Android
                devices. You can control all smart features through the mobile
                application.
              </p>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium">
                Can I use regular potting soil with this pot?
              </h4>
              <p className="text-neutral-600 mt-2">
                Yes, you can use any standard potting soil. For optimal results,
                we recommend a well-draining soil mix appropriate for your
                specific plant.
              </p>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium">How do I clean the sensor?</h4>
              <p className="text-neutral-600 mt-2">
                The sensor can be gently wiped with a damp cloth. Do not
                submerge the electronic components in water. Full cleaning
                instructions are included in the user manual.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-md flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-medium">Still have questions?</h4>
              <p className="text-sm text-neutral-600 mb-3">
                Our support team is here to help you with any questions you
                might have.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" /> Live Chat
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Send className="h-4 w-4" /> Email Support
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="pt-6">
        <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockProducts
            .filter((p) => p.id !== product.id)
            .map((related) => (
              <Card key={related.id} className="overflow-hidden">
                <div className="aspect-square bg-neutral-100 flex items-center justify-center text-4xl">
                  {related.images[0]}
                </div>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{related.name}</CardTitle>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs">{related.rating}</span>
                    </div>
                    <span className="font-medium">
                      ${related.discountedPrice}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

// Missing Play icon component
const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

// Main Shop component with routing for list/detail view
const Shop = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DashboardLayout title={id ? "Product Details" : "Garden Shop"}>
      {id ? <ProductDetailsPage /> : <ShopListingPage />}
    </DashboardLayout>
  );
};

export default Shop;
