"use client";

import { useState } from "react";
import { Search, Package, CheckCircle, Clock, Truck } from "lucide-react";
import { getOrderByIdOrNumber } from "@/actions/orders";
import { Order } from "@/types";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    const res = await getOrderByIdOrNumber(query.trim());
    setLoading(false);

    if (res.success && res.data) {
      setOrder(res.data);
    } else {
      setOrder(null);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Live Dispatch Tracking
          </span>
          <h1 className="text-4xl font-serif font-bold">Track Your Order</h1>
          <p className="text-luxury-gray text-sm font-sans">
            Enter your AYVO Order Number (e.g. AYVO-2026-4821) to check live status updates.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gray" />
            <input
              type="text"
              required
              placeholder="Enter Order # (AYVO-2026-XXXX)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-luxury-charcoal border border-luxury-dark rounded-full text-sm font-mono text-luxury-white uppercase placeholder-luxury-gray focus:outline-none focus:border-luxury-gold"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-widest rounded-full hover:bg-luxury-gold-light transition-all shadow-gold"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {/* Results Timeline */}
        {searched && (
          <div className="space-y-6 pt-4 animate-in fade-in duration-300">
            {order ? (
              <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
                <div className="flex justify-between items-center border-b border-luxury-dark pb-4">
                  <div>
                    <p className="text-xs text-luxury-gray uppercase font-label">Order Number</p>
                    <p className="font-mono text-xl font-bold text-luxury-gold">{order.order_number}</p>
                  </div>
                  <span className="px-3 py-1 bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-label uppercase rounded-full">
                    Status: {order.status}
                  </span>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-serif font-bold text-luxury-white">Tracking History Timeline</h3>
                  <div className="relative border-l-2 border-luxury-dark pl-6 space-y-6">
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-luxury-gold shadow-gold" />
                      <p className="text-sm font-bold text-luxury-white">Order Placed</p>
                      <p className="text-xs text-luxury-gray">Your order has been recorded in the AYVO system.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-luxury-dark" />
                      <p className="text-sm font-bold text-luxury-gray">Processing & Quality Assurance</p>
                      <p className="text-xs text-luxury-gray/60">260 GSM inspection and 3D monogram verification.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-luxury-dark" />
                      <p className="text-sm font-bold text-luxury-gray">Dispatched for Courier Delivery</p>
                      <p className="text-xs text-luxury-gray/60">Handed over to courier partner for 3-5 day delivery.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-luxury-charcoal/50 border border-luxury-dark text-center space-y-3">
                <Package className="w-12 h-12 text-luxury-gray/40 mx-auto" />
                <p className="font-serif text-lg text-luxury-gray">No order found with number "{query}".</p>
                <p className="text-xs text-luxury-gold font-label uppercase">
                  Please verify your order code or contact us on WhatsApp (+92 371 0108284).
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
