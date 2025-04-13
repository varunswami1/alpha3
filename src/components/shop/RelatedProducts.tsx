
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { mockProducts } from "@/data/shopData";

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const relatedProducts = mockProducts.filter(p => p.id !== currentProductId);
  
  return (
    <div className="pt-6">
      <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((related) => (
          <Card key={related.id} className="overflow-hidden">
            <Link to={`/shop/${related.id}`}>
              <div className="aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden">
                <img
                  src={related.images[0]}
                  alt={related.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="py-3">
                <CardTitle className="text-base">{related.name}</CardTitle>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs">{related.rating}</span>
                  </div>
                  <span className="font-medium">${related.discountedPrice}</span>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
