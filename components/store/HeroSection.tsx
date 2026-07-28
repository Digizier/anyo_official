"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Sparkles, ShoppingBag } from "lucide-react";

export function HeroSection() {
  const scrollToShop = () => {
    const el = document.getElementById("featured-collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-luxury-black overflow-hidden pt-20">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1920&auto=format&fit=crop&q=85"
          alt="AYVO Luxury Fashion Hero"
          fill
          className="object-cover object-center opacity-35 scale-105 transition-transform duration-10000"
          priority
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-luxury-black/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxury-black/40 to-luxury-black" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 my-auto">
        {/* AYVO Monogram Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-xs font-label uppercase tracking-[0.25em] shadow-gold backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          NEW COLLECTION 2026 • DROP #1
        </div>

        {/* Cormorant Garamond Huge Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-luxury-white tracking-tight leading-[1.05] drop-shadow-2xl">
          Timeless Essentials. <br />
          <span className="bg-gradient-to-r from-luxury-white via-luxury-cream to-luxury-gold bg-clip-text text-transparent italic">
            Made for Everyday Luxury.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-luxury-cream/90 text-base sm:text-xl font-sans max-w-2xl mx-auto leading-relaxed tracking-wide">
          Engineered from 260 GSM heavyweight combed cotton. Minimalist design featuring signature 3D raised gold monogram craftsmanship.
        </p>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold hover:bg-luxury-gold-light hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop Collection
          </Link>

          <button
            onClick={scrollToShop}
            className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-8 rounded-full bg-luxury-black/60 border border-luxury-white/30 text-luxury-white hover:border-luxury-gold hover:text-luxury-gold backdrop-blur-md font-label font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300"
          >
            Explore Drop #1
          </button>
        </div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <button
        onClick={scrollToShop}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-luxury-gold/80 hover:text-luxury-gold transition-colors flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll to shop"
      >
        <span className="text-[10px] font-label uppercase tracking-[0.25em]">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
