"use client";

import { useState } from "react";
import { initialStoreSettings } from "@/lib/initial-data";
import { Save, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialStoreSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      <div>
        <h1 className="font-serif text-3xl font-bold">Store Settings & Branding</h1>
        <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
          WhatsApp Support, Currency, Free Shipping Rules & Policies
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
          <h3 className="font-serif text-xl font-bold border-b border-luxury-dark pb-3">General Store Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Store Name</label>
              <input
                type="text"
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">WhatsApp Contact Number</label>
              <input
                type="text"
                value={settings.store_phone}
                onChange={(e) => setSettings({ ...settings, store_phone: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-gold font-mono focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Store Email</label>
              <input
                type="email"
                value={settings.store_email}
                onChange={(e) => setSettings({ ...settings, store_email: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Free Shipping Threshold (Rs.)</label>
              <input
                type="number"
                value={settings.free_shipping_above}
                onChange={(e) => setSettings({ ...settings, free_shipping_above: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white font-mono focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold flex items-center justify-center gap-2 hover:bg-luxury-gold-light transition-all"
        >
          <Save className="w-4 h-4" /> {saved ? "Settings Saved!" : "Save Store Settings"}
        </button>
      </form>
    </div>
  );
}
