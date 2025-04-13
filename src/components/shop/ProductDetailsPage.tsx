
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Truck, 
  Heart, 
  ShoppingCart, 
  Clock, 
  Check, 
  X, 
  MessageCircle, 
  Send, 
  Gift, 
  Package, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { mockProducts, mockReviews } from "@/data/shopData";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import { Play } from "@/components/shop/icons/Play";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const productReviews = mockReviews.filter(r => r.productId === product.id);
  
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  
  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: ""
    }
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
        <ProductImageGallery 
          images={product.images} 
          hasVideo={product.hasVideo} 
          imageIndex={imageIndex} 
          setImageIndex={setImageIndex} 
        />
        
        {/* Product Details */}
        <ProductDetails 
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
        />
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
              <p className="text-neutral-600">BPA-free plastic, ceramic inner pot</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Water Capacity</h4>
              <p className="text-neutral-600">500ml reservoir</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Battery Life</h4>
              <p className="text-neutral-600">Up to 3 months on a single charge</p>
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
                          <p className="text-xs text-neutral-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700">{review.comment}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center p-6 border rounded-md">
                <p className="text-neutral-600">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">Add Your Review</h4>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitReview)} className="space-y-4">
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
                                field.value >= star ? "text-amber-500" : "text-neutral-300"
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
                  <span>Expedited shipping available at checkout for an additional fee</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Return Policy</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>30-day return policy for unused items in original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Return shipping fees may apply depending on the reason for return</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Defective items can be returned or exchanged at no additional cost</span>
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
              <p className="text-neutral-600 mt-2">The battery typically lasts up to 3 months on a single charge with normal usage. This may vary depending on how often the watering system activates.</p>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium">Is the app available for both iOS and Android?</h4>
              <p className="text-neutral-600 mt-2">Yes, our app is available for download on both iOS and Android devices. You can control all smart features through the mobile application.</p>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium">Can I use regular potting soil with this pot?</h4>
              <p className="text-neutral-600 mt-2">Yes, you can use any standard potting soil. For optimal results, we recommend a well-draining soil mix appropriate for your specific plant.</p>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium">How do I clean the sensor?</h4>
              <p className="text-neutral-600 mt-2">The sensor can be gently wiped with a damp cloth. Do not submerge the electronic components in water. Full cleaning instructions are included in the user manual.</p>
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-md flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-medium">Still have questions?</h4>
              <p className="text-sm text-neutral-600 mb-3">Our support team is here to help you with any questions you might have.</p>
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
      <RelatedProducts currentProductId={product.id} />
    </div>
  );
};

export default ProductDetailsPage;
