"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/923710108284?text=${encodeURIComponent(
    "Hi AYVO! I would like to inquire about your 260 GSM luxury collection."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:block bg-luxury-charcoal text-luxury-white text-xs font-label uppercase tracking-wider py-1.5 px-3 rounded-lg border border-luxury-dark shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200">
        Chat with AYVO Support
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact AYVO on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 animate-pulse-slow"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-gold rounded-full border-2 border-luxury-black" />
      </a>
    </div>
  );
}
