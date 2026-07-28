"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);
  const primaryImg = product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";
  const hoverImg = product.images?.[1]?.image_url || primaryImg;

  const currentPrice = product.sale_price || product.price;
  const originalPrice = product.compare_price || (product.sale_price ? product.price : null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: primaryImg,
      size: "M",
      price: currentPrice,
      quantity: 1,
    });
  };

  return (
    <>
      <div className="group relative bg-luxury-charcoal/70 border border-luxury-dark/80 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-luxury-gold/50 transition-all duration-500 flex flex-col justify-between">
        {/* Top Badges & Wishlist Toggle */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-black">
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new_arrival && (
              <span className="bg-luxury-gold text-luxury-black text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-gold">
                New Arrival
              </span>
            )}
            {product.is_best_seller && (
              <span className="bg-luxury-black/80 border border-luxury-gold/50 text-luxury-gold text-[10px] font-label uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked
                ? "bg-luxury-gold text-luxury-black"
                : "bg-luxury-black/60 text-luxury-white hover:text-luxury-gold"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          {/* Overlay Quick Action Bar on Hover */}
          <div className="absolute inset-x-0 bottom-3 px-3 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-luxury-black/80 hover:bg-luxury-black text-luxury-white text-xs font-label uppercase tracking-wider backdrop-blur-md border border-luxury-dark flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-xl bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light transition-colors shadow-gold"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Meta Content */}
        <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-label text-luxury-gold uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>260 GSM Heavyweight</span>
            </div>

            <Link href={`/shop/${product.slug}`} className="group-hover:text-luxury-gold transition-colors">
              <h3 className="font-serif text-lg font-semibold text-luxury-white line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-luxury-gray line-clamp-1 mt-1 font-sans">
              {product.short_description}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="pt-3 border-t border-luxury-dark/60 flex items-center justify-between">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-base sm:text-lg font-bold text-luxury-gold">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-xs text-luxury-gray line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Sizes Indicator */}
            <div className="flex gap-1 text-[10px] font-label text-luxury-gray font-semibold uppercase">
              <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
