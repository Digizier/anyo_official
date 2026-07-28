"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { calculateCartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/actions/orders";
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, couponDiscount, appliedCoupon } = useCartStore();
  const totals = calculateCartTotals(items, 4999, 250, couponDiscount);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "Karachi",
    province: "Sindh",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "cod" as "cod" | "card" | "bank",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 bg-luxury-black text-luxury-white min-h-screen text-center">
        <h1 className="text-3xl font-serif font-bold">Your bag is empty</h1>
        <p className="text-luxury-gray text-sm mt-2">Add items to proceed to checkout.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1) {
      setError("Please fill in all required shipping fields.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await createOrder({
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      items,
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      shippingAmount: totals.shippingAmount,
      totalAmount: totals.total,
      couponCode: appliedCoupon,
      notes: formData.notes,
    });

    setLoading(false);

    if (result.success && result.data) {
      clearCart();
      router.push(`/order-confirmation/${result.data.order_number}`);
    } else {
      setError(result.error || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Secure Checkout
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Delivery & Payment</h1>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left 2 Columns: Contact & Address Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Contact Information */}
            <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
              <h3 className="font-serif text-xl font-bold text-luxury-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-xs flex items-center justify-center font-mono">1</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hamza Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
              <h3 className="font-serif text-xl font-bold text-luxury-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-xs flex items-center justify-center font-mono">2</span>
                Shipping Address (Pakistan)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Apartment #, Street Name"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-luxury-gray uppercase tracking-wider font-label">Province *</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
                  >
                    <option value="Sindh">Sindh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital Territory">Islamabad</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
              <h3 className="font-serif text-xl font-bold text-luxury-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-xs flex items-center justify-center font-mono">3</span>
                Payment Method
              </h3>

              <div className="space-y-3 font-sans text-xs">
                <label className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === "cod" ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold" : "bg-luxury-black border-luxury-dark text-luxury-white"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    className="hidden"
                  />
                  <Banknote className="w-6 h-6" />
                  <div>
                    <p className="font-bold text-sm">Cash on Delivery (COD)</p>
                    <p className="text-luxury-gray text-[11px]">Pay in cash upon delivery to your doorstep.</p>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all opacity-70 ${formData.paymentMethod === "bank" ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold" : "bg-luxury-black border-luxury-dark text-luxury-white"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "bank" })}
                    className="hidden"
                  />
                  <CreditCard className="w-6 h-6" />
                  <div>
                    <p className="font-bold text-sm">Direct Bank Transfer</p>
                    <p className="text-luxury-gray text-[11px]">Bank account details will be shown upon order placement.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6 sticky top-32">
            <h3 className="font-serif text-2xl font-bold border-b border-luxury-dark pb-4">
              Bag Summary
            </h3>

            <div className="space-y-3 text-xs font-sans">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-luxury-gray">
                  <span className="line-clamp-1">{item.name} (x{item.quantity})</span>
                  <span className="font-mono text-luxury-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-luxury-gray pt-2 border-t border-luxury-dark/50">
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
              <div className="flex justify-between text-base font-bold text-luxury-white pt-3 border-t border-luxury-dark font-mono">
                <span>Total Due</span>
                <span className="text-luxury-gold text-xl">{formatPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
            >
              {loading ? "Processing Order..." : "Place Order Now"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
