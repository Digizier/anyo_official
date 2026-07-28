"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";

interface GalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: GalleryProps) {
  const defaultImg = images?.[0]?.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80";
  const [selectedImg, setSelectedImg] = useState(defaultImg);

  const displayImages = images && images.length > 0 ? images : [{ id: "1", image_url: defaultImg }];

  return (
    <div className="space-y-4">
      {/* Main Showcase Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-dark/80 shadow-2xl">
        <Image
          src={selectedImg}
          alt={productName}
          fill
          className="object-cover transition-all duration-500"
          priority
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedImg(img.image_url)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden bg-luxury-charcoal border transition-all flex-shrink-0 ${
                selectedImg === img.image_url
                  ? "border-luxury-gold ring-2 ring-luxury-gold/40 shadow-gold"
                  : "border-luxury-dark opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.image_url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
