"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 12, revenue: 34000 },
  { day: "Tue", sales: 18, revenue: 49000 },
  { day: "Wed", sales: 14, revenue: 38500 },
  { day: "Thu", sales: 22, revenue: 61000 },
  { day: "Fri", sales: 28, revenue: 78000 },
  { day: "Sat", sales: 35, revenue: 98000 },
  { day: "Sun", sales: 30, revenue: 84000 },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-luxury-white">
            AYVO Master Control Dashboard
          </h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Real-time Store Performance & Inventory Operations
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider shadow-gold hover:bg-luxury-gold-light transition-all"
        >
          + Add New Product
        </Link>
      </div>

      {/* Row 1: Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-2">
          <div className="flex justify-between items-center text-luxury-gray">
            <span className="text-xs font-label uppercase tracking-wider">Today Orders</span>
            <ShoppingBag className="w-5 h-5 text-luxury-gold" />
          </div>
          <p className="text-3xl font-mono font-bold text-luxury-white">14</p>
          <p className="text-[11px] text-emerald-400 font-sans">+3 vs yesterday</p>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-2">
          <div className="flex justify-between items-center text-luxury-gray">
            <span className="text-xs font-label uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-luxury-gold" />
          </div>
          <p className="text-3xl font-mono font-bold text-luxury-gold">{formatPrice(442500)}</p>
          <p className="text-[11px] text-emerald-400 font-sans">+12% vs last week</p>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-2">
          <div className="flex justify-between items-center text-luxury-gray">
            <span className="text-xs font-label uppercase tracking-wider">Unique Visitors</span>
            <Users className="w-5 h-5 text-luxury-gold" />
          </div>
          <p className="text-3xl font-mono font-bold text-luxury-white">892</p>
          <p className="text-[11px] text-emerald-400 font-sans">+8% vs yesterday</p>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-2">
          <div className="flex justify-between items-center text-luxury-gray">
            <span className="text-xs font-label uppercase tracking-wider">Conversion Rate</span>
            <TrendingUp className="w-5 h-5 text-luxury-gold" />
          </div>
          <p className="text-3xl font-mono font-bold text-luxury-white">1.8%</p>
          <p className="text-[11px] text-emerald-400 font-sans">+0.3% this month</p>
        </div>
      </div>

      {/* Row 2: Order Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-amber-900/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-label uppercase">
            <Clock className="w-4 h-4" /> Pending Processing
          </div>
          <p className="text-2xl font-mono font-bold text-luxury-white">8 Orders</p>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-emerald-900/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-label uppercase">
            <CheckCircle className="w-4 h-4" /> Successfully Delivered
          </div>
          <p className="text-2xl font-mono font-bold text-luxury-white">245 Orders</p>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-red-900/40 space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-xs font-label uppercase">
            <AlertTriangle className="w-4 h-4" /> Cancelled / Returned
          </div>
          <p className="text-2xl font-mono font-bold text-luxury-white">12 Orders</p>
        </div>
      </div>

      {/* Row 3: Recharts Charts */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
            <h3 className="font-serif text-xl font-bold text-luxury-white">Sales Count (Last 7 Days)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1B1B1B", borderColor: "#2E2E2E", borderRadius: "8px" }} />
                  <Bar dataKey="sales" fill="#C9A44C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
            <h3 className="font-serif text-xl font-bold text-luxury-white">Revenue (Last 7 Days)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1B1B1B", borderColor: "#2E2E2E", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#C9A44C" fill="#C9A44C" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Row 4: Latest Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
          <div className="flex justify-between items-center border-b border-luxury-dark pb-4">
            <h3 className="font-serif text-xl font-bold">Latest Store Orders</h3>
            <Link href="/admin/orders" className="text-xs font-label text-luxury-gold uppercase hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto text-xs font-sans">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-luxury-dark text-luxury-gray uppercase font-label">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-dark/50">
                <tr>
                  <td className="py-3 font-mono font-bold text-luxury-gold">AYVO-2026-4821</td>
                  <td className="py-3">Hamza Khan</td>
                  <td className="py-3 font-mono">Rs. 2,999</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full font-label uppercase text-[10px]">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-mono font-bold text-luxury-gold">AYVO-2026-4820</td>
                  <td className="py-3">Shahzaib Malik</td>
                  <td className="py-3 font-mono">Rs. 5,499</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full font-label uppercase text-[10px]">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-mono font-bold text-luxury-gold">AYVO-2026-4819</td>
                  <td className="py-3">Usman Ali</td>
                  <td className="py-3 font-mono">Rs. 3,999</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-label uppercase text-[10px]">
                      Delivered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
          <h3 className="font-serif text-xl font-bold">Low Stock Alerts</h3>
          <div className="space-y-3 text-xs font-sans">
            <div className="p-3 rounded-xl bg-luxury-black border border-amber-900/50 flex justify-between items-center">
              <div>
                <p className="font-bold text-luxury-white">AYVO 3D Jet Black (Size XL)</p>
                <p className="text-[10px] text-amber-400 font-mono">Only 3 units remaining</p>
              </div>
              <Link href="/admin/products" className="px-3 py-1 bg-luxury-gold text-luxury-black font-label text-[10px] font-bold uppercase rounded-lg">
                Restock
              </Link>
            </div>
            <div className="p-3 rounded-xl bg-luxury-black border border-amber-900/50 flex justify-between items-center">
              <div>
                <p className="font-bold text-luxury-white">AYVO Prestige Gift Box</p>
                <p className="text-[10px] text-amber-400 font-mono">Only 5 units remaining</p>
              </div>
              <Link href="/admin/products" className="px-3 py-1 bg-luxury-gold text-luxury-black font-label text-[10px] font-bold uppercase rounded-lg">
                Restock
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
