"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black text-xs font-label uppercase tracking-[0.18em] py-2 px-4 flex items-center justify-between font-semibold relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto w-full text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
        <span>DROP #1 NOW LIVE — FREE DELIVERY ON ORDERS ABOVE RS. 4,999</span>
        <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse hidden sm:inline-block" />
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-luxury-black hover:opacity-70 transition-opacity p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
