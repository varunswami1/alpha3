import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "./icons/Play";

interface ProductImageGalleryProps {
  images: string[];
  hasVideo: boolean;
  imageIndex: number;
  setImageIndex: (index: number) => void;
}

const ProductImageGallery = ({
  images,
  hasVideo,
  imageIndex,
  setImageIndex
}: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-neutral-100 rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={images[imageIndex]}
          alt={`Product Image ${imageIndex + 1}`}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square w-16 bg-neutral-100 rounded flex items-center justify-center
              ${index === imageIndex ? "ring-2 ring-primary" : ""}`}
            onClick={() => setImageIndex(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>

      {hasVideo && (
        <Button variant="outline" className="w-full gap-2">
          <Play className="h-4 w-4" /> Watch Product Video
        </Button>
      )}
    </div>
  );
};

export default ProductImageGallery;
