
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { mockProducts } from "@/data/shopData";

const ShopListingPage = () => {
  const [category, setCategory] = useState<string>("all");

  const filteredProducts = category === "all"
    ? mockProducts
    : mockProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Garden Shop</h2>
        <div className="flex gap-2">
          <Button variant="outline"
            className={category === "all" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("all")}>
            All Products
          </Button>
          <Button variant="outline"
            className={category === "pots" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("pots")}>
            Pots
          </Button>
          <Button variant="outline"
            className={category === "fertilizers" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("fertilizers")}>
            Fertilizers
          </Button>
          <Button variant="outline"
            className={category === "sensors" ? "bg-primary/10 text-primary" : ""}
            onClick={() => setCategory("sensors")}>
            Sensors
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.discount && (
                <Badge className="absolute top-2 right-2 bg-red-500">{product.discount}</Badge>
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
                <span className="text-xs text-neutral-500">({product.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {product.discount ? (
                  <>
                    <span className="text-lg font-bold">${product.discountedPrice}</span>
                    <span className="text-sm text-neutral-500 line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${product.price}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant={product.stockStatus === "In Stock" ? "default" :
                  product.stockStatus === "Low Stock" ? "outline" : "destructive"}>
                  {product.stockStatus}
                </Badge>
                {product.freeShipping && (
                  <Badge variant="secondary">Free Shipping</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild variant="default" className="flex-1">
                <Link to={`/shop/${product.id}`}>View Details</Link>
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

export default ShopListingPage;
