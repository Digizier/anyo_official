"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, MessageCircle, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();

  const primaryImg = product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";
  const currentPrice = product.sale_price || product.price;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: primaryImg,
      size: selectedSize,
      price: currentPrice,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappMessage = `Hi AYVO! I want to order via WhatsApp:
Product: ${product.name}
Size: ${selectedSize}
Quantity: ${quantity}
Price: ${formatPrice(currentPrice * quantity)}`;

  const whatsappUrl = `https://wa.me/923710108284?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-luxury-charcoal border border-luxury-dark rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-luxury-white hover:text-luxury-gold bg-luxury-black/60 rounded-full backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-luxury-black">
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-label text-luxury-gold uppercase tracking-[0.2em] font-semibold">
              260 GSM Premium Cotton
            </span>

            <h2 className="font-serif text-2xl font-bold text-luxury-white">
              {product.name}
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-xl font-mono font-bold text-luxury-gold">
                {formatPrice(currentPrice)}
              </span>
              {product.compare_price && (
                <span className="text-sm font-mono text-luxury-gray line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            <p className="text-xs text-luxury-gray leading-relaxed font-sans line-clamp-3">
              {product.short_description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-label uppercase text-luxury-white tracking-wider flex justify-between">
                <span>Select Size</span>
                <span className="text-luxury-gold font-mono">Selected: {selectedSize}</span>
              </label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      selectedSize === sz
                        ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-gold"
                        : "bg-luxury-black text-luxury-white border-luxury-dark hover:border-luxury-gold/50"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Modifier */}
            <div className="space-y-2">
              <label className="text-xs font-label uppercase text-luxury-white tracking-wider">
                Quantity
              </label>
              <div className="inline-flex items-center border border-luxury-dark rounded-lg bg-luxury-black">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-luxury-white hover:text-luxury-gold font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-mono font-bold text-luxury-gold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-luxury-white hover:text-luxury-gold font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-luxury-dark/60">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-label font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-gold"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-label font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Order via WhatsApp
            </a>

            <Link
              href={`/shop/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs text-luxury-gray hover:text-luxury-gold font-label uppercase tracking-wider pt-1"
            >
              View Full Product Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
