"use client";

import { useState } from "react";
import { ShoppingBag, MessageCircle, Heart, Check, Ruler } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface ActionsProps {
  product: Product;
}

export function SingleProductActions({ product }: ActionsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);
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
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = `Hi AYVO! I want to order:
Product: ${product.name}
Size: ${selectedSize}
Quantity: ${quantity}
Price: ${formatPrice(currentPrice * quantity)}
Please confirm availability and dispatch details.`;

  const whatsappUrl = `https://wa.me/923710108284?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-label uppercase">
          <span className="text-luxury-white tracking-wider font-semibold">
            Select Size (260 GSM Fit)
          </span>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-luxury-gold hover:underline flex items-center gap-1"
          >
            <Ruler className="w-3.5 h-3.5" /> Size Chart Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`w-14 h-12 rounded-xl text-xs font-mono font-bold border transition-all duration-300 ${
                selectedSize === sz
                  ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-gold scale-105"
                  : "bg-luxury-black text-luxury-white border-luxury-dark hover:border-luxury-gold/50"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeGuide && (
        <div className="p-4 rounded-xl bg-luxury-charcoal border border-luxury-gold/40 text-xs text-luxury-gray space-y-2 animate-in fade-in duration-300 font-sans">
          <p className="font-serif font-bold text-luxury-white text-sm">260 GSM Boxy Fit Measurements (Inches)</p>
          <div className="grid grid-cols-4 gap-2 text-center font-mono pt-1">
            <div className="bg-luxury-black p-2 rounded">S: Chest 40" / L 27"</div>
            <div className="bg-luxury-black p-2 rounded">M: Chest 42" / L 28"</div>
            <div className="bg-luxury-black p-2 rounded">L: Chest 44" / L 29"</div>
            <div className="bg-luxury-black p-2 rounded">XL: Chest 46" / L 30"</div>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-xs font-label uppercase text-luxury-white tracking-wider font-semibold">
          Quantity
        </label>
        <div className="inline-flex items-center border border-luxury-dark rounded-xl bg-luxury-black p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 text-luxury-white hover:text-luxury-gold font-bold text-lg rounded-lg hover:bg-luxury-charcoal transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center font-mono font-bold text-sm text-luxury-gold">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 text-luxury-white hover:text-luxury-gold font-bold text-lg rounded-lg hover:bg-luxury-charcoal transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 px-8 rounded-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        {/* WhatsApp Direct Order Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-label font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          Order via WhatsApp (+92 371 0108284)
        </a>

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-full py-3 px-6 rounded-full border transition-all text-xs font-label uppercase tracking-wider flex items-center justify-center gap-2 ${
            isLiked
              ? "bg-luxury-charcoal text-luxury-gold border-luxury-gold"
              : "bg-transparent text-luxury-gray border-luxury-dark hover:border-luxury-gold hover:text-luxury-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          {isLiked ? "In Your Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
