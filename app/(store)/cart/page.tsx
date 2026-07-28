"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { calculateCartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, couponDiscount } = useCartStore();
  const totals = calculateCartTotals(items, 4999, 250, couponDiscount);

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 bg-luxury-black text-luxury-white min-h-screen text-center">
        <div className="max-w-md mx-auto px-6 space-y-6">
          <ShoppingBag className="w-16 h-16 text-luxury-gold mx-auto opacity-50" />
          <h1 className="text-3xl font-serif font-bold">Your Bag is Empty</h1>
          <p className="text-luxury-gray text-sm font-sans">
            Explore our Drop #1 260 GSM Heavyweight Tees and luxury prestige gift sets.
          </p>
          <Link
            href="/shop"
            className="inline-block py-4 px-8 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-widest shadow-gold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Review Bag
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="p-4 sm:p-6 bg-luxury-charcoal/80 border border-luxury-dark rounded-2xl flex flex-col sm:flex-row gap-6 items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-luxury-black flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-luxury-white">{item.name}</h3>
                    {item.size && (
                      <p className="text-xs text-luxury-gold font-mono uppercase mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-sm font-mono text-luxury-gray mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="inline-flex items-center border border-luxury-dark rounded-lg bg-luxury-black">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="px-3 py-1 text-luxury-white text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-luxury-gold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="px-3 py-1 text-luxury-white text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-mono font-bold text-base text-luxury-gold min-w-[80px] text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-luxury-gray hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6 sticky top-32">
            <h3 className="font-serif text-2xl font-bold border-b border-luxury-dark pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between text-luxury-gray">
                <span>Subtotal</span>
                <span className="font-mono text-luxury-white">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-luxury-gray">
                <span>Shipping (Pakistan)</span>
                <span className="font-mono text-luxury-white">
                  {totals.shippingAmount === 0 ? "FREE" : formatPrice(totals.shippingAmount)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-luxury-white pt-3 border-t border-luxury-dark font-mono">
                <span>Total Amount</span>
                <span className="text-luxury-gold text-xl">{formatPrice(totals.total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-gold"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
