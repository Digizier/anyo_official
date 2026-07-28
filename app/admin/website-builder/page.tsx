"use client";

import { useState } from "react";
import { Sliders, Eye, EyeOff, Save } from "lucide-react";

export default function AdminWebsiteBuilderPage() {
  const [sections, setSections] = useState([
    { key: "hero", name: "Hero Section (100vh Banner)", enabled: true },
    { key: "featured", name: "Featured Collections Grid", enabled: true },
    { key: "categories", name: "Category Carousel Bar", enabled: true },
    { key: "bestsellers", name: "Best Sellers 260 GSM Grid", enabled: true },
    { key: "why_ayvo", name: "Why AYVO 260 GSM Craftsmanship", enabled: true },
    { key: "lifestyle", name: "Instagram Lifestyle Showcase", enabled: true },
    { key: "newsletter", name: "VIP Newsletter Drop Form", enabled: true },
  ]);

  const toggleSection = (key: string) => {
    setSections(
      sections.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Homepage Builder</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Toggle & Reorder Homepage Sections in Real-Time
          </p>
        </div>
        <button className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-gold">
          <Save className="w-4 h-4" /> Save Homepage Layout
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-4">
        {sections.map((s) => (
          <div
            key={s.key}
            className="p-4 rounded-xl bg-luxury-black border border-luxury-dark/80 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-luxury-gold cursor-grab" />
              <span className="font-serif text-base font-bold text-luxury-white">{s.name}</span>
            </div>

            <button
              onClick={() => toggleSection(s.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-label uppercase flex items-center gap-1.5 transition-colors ${
                s.enabled
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : "bg-red-950 text-red-400 border border-red-800"
              }`}
            >
              {s.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {s.enabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
