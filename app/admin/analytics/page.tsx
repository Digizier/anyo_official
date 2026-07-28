"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const analyticsData = [
  { month: "Jan", revenue: 140000, orders: 42 },
  { month: "Feb", revenue: 210000, orders: 68 },
  { month: "Mar", revenue: 320000, orders: 95 },
  { month: "Apr", revenue: 280000, orders: 84 },
  { month: "May", revenue: 410000, orders: 120 },
  { month: "Jun", revenue: 560000, orders: 165 },
];

export default function AdminAnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-serif text-3xl font-bold">Analytics & Conversion</h1>
        <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
          Revenue Trends, Customer Growth, and Average Order Value
        </p>
      </div>

      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
            <h3 className="font-serif text-xl font-bold">Monthly Revenue Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1B1B1B", borderColor: "#2E2E2E", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#C9A44C" fill="#C9A44C" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
            <h3 className="font-serif text-xl font-bold">Monthly Order Volume</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#1B1B1B", borderColor: "#2E2E2E", borderRadius: "8px" }} />
                  <Bar dataKey="orders" fill="#C9A44C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
