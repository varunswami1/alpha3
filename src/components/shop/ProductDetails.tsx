
import React from "react";
import { 
  Star, 
  Truck, 
  Heart, 
  ShoppingCart, 
  ShieldCheck, 
  Gift, 
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/shop";

interface ProductDetailsProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductDetails = ({ 
  product, 
  quantity, 
  setQuantity, 
  onAddToCart 
}: ProductDetailsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-neutral-500">({product.reviewsCount} reviews)</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {product.discount ? (
          <>
            <span className="text-2xl font-bold">${product.discountedPrice}</span>
            <span className="text-neutral-500 line-through">${product.price}</span>
            <Badge className="bg-red-500">{product.discount}</Badge>
          </>
        ) : (
          <span className="text-2xl font-bold">${product.price}</span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant={product.stockStatus === "In Stock" ? "default" : 
          product.stockStatus === "Low Stock" ? "outline" : "destructive"} className="text-sm">
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
              <Badge key={index} variant="outline">{item}</Badge>
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
            >-</Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQuantity(quantity + 1)}
            >+</Button>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1 gap-2" onClick={onAddToCart}>
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
              <p className="text-sm text-neutral-600">{product.deliveryEstimate}</p>
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
              <p className="text-sm text-neutral-600">Earn {product.loyaltyPoints} points with this purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
