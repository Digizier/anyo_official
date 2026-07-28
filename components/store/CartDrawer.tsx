"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { calculateCartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { validateCoupon } from "@/actions/coupons";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const totals = calculateCartTotals(items, 4999, 250, couponDiscount);

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    const result = await validateCoupon(couponInput, totals.subtotal);
    setCouponLoading(false);

    if (result.success && result.discountAmount) {
      applyCoupon(result.code!, result.discountAmount);
      setCouponSuccess(result.message || "Coupon applied!");
      setCouponInput("");
    } else {
      setCouponError(result.error || "Invalid coupon");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-luxury-charcoal border-l border-luxury-dark text-luxury-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-luxury-dark/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-luxury-gold" />
              <h2 className="font-serif text-2xl font-bold">Your Bag</h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-luxury-black text-luxury-gold border border-luxury-gold/30">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-luxury-gray hover:text-luxury-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-luxury-black/60 border-b border-luxury-dark/50 text-xs font-label uppercase">
            {totals.freeShippingRemaining > 0 ? (
              <div className="space-y-1.5">
                <p className="text-luxury-gray">
                  Add <span className="text-luxury-gold font-bold font-mono">{formatPrice(totals.freeShippingRemaining)}</span> more for <span className="text-luxury-gold font-bold">FREE SHIPPING</span>
                </p>
                <div className="w-full h-1.5 bg-luxury-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-luxury-gold-dark to-luxury-gold transition-all duration-500"
                    style={{ width: `${totals.freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> You unlocked FREE SHIPPING across Pakistan!
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-luxury-gray/40 mx-auto" />
                <p className="font-serif text-xl text-luxury-gray">Your shopping bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="inline-block py-3 px-6 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase tracking-wider font-bold shadow-gold"
                >
                  Discover 260 GSM Tees
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 p-3 bg-luxury-black/40 rounded-xl border border-luxury-dark/60 relative group"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-luxury-black flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-semibold line-clamp-1 text-luxury-white">
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-xs text-luxury-gold font-mono uppercase mt-0.5">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-xs text-luxury-gray font-mono mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-luxury-dark rounded bg-luxury-black">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="px-2 py-0.5 text-luxury-white text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono text-luxury-gold font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="px-2 py-0.5 text-luxury-white text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-luxury-gray hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon & Summary Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-luxury-dark/80 bg-luxury-black/90 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. AYVO10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-luxury-charcoal border border-luxury-dark rounded-lg text-xs font-mono text-luxury-white uppercase placeholder-luxury-gray focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="px-4 py-2 bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold rounded-lg hover:bg-luxury-gold-light transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[10px] text-red-400 font-sans">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-emerald-400 font-sans">{couponSuccess}</p>}
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-xs text-luxury-gold font-mono pt-1">
                    <span>Applied Coupon: {appliedCoupon}</span>
                    <button type="button" onClick={removeCoupon} className="text-red-400 underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Subtotal Calculations */}
              <div className="space-y-2 text-xs font-sans border-t border-luxury-dark/50 pt-3">
                <div className="flex justify-between text-luxury-gray">
                  <span>Subtotal</span>
                  <span className="font-mono text-luxury-white">{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>Discount</span>
                    <span>-{formatPrice(totals.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-luxury-gray">
                  <span>Shipping</span>
                  <span className="font-mono text-luxury-white">
                    {totals.shippingAmount === 0 ? "FREE" : formatPrice(totals.shippingAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-luxury-white pt-2 border-t border-luxury-dark font-mono">
                  <span>Total</span>
                  <span className="text-luxury-gold text-base">{formatPrice(totals.total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-gold hover:shadow-2xl transition-all duration-300"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
