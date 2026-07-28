"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, Menu, Search, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
}

export function AdminHeader({ onToggleMobileSidebar }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-luxury-charcoal border-b border-luxury-dark text-luxury-white px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-luxury-white hover:text-luxury-gold"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-luxury-black border border-luxury-dark text-xs font-mono text-luxury-gray">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Layer 2 Connected: ayvo_official110</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 text-luxury-gray hover:text-luxury-gold transition-colors relative" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-gold rounded-full" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-luxury-dark">
          <div className="w-8 h-8 rounded-full border border-luxury-gold/50 bg-luxury-black overflow-hidden flex items-center justify-center">
            <Image src="/logo.png" alt="Admin Avatar" width={32} height={32} className="object-contain" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-serif font-bold text-luxury-white leading-none">AYVO Owner</p>
            <p className="text-[10px] font-label text-luxury-gold uppercase">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
