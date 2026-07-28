import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Instagram, Shield, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-luxury-black text-luxury-white border-t border-luxury-dark/80 pt-20 pb-12 font-sans relative overflow-hidden">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-luxury-dark/60">
          {/* Brand Info & Monogram */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/40 p-1 bg-luxury-charcoal flex items-center justify-center shadow-gold">
                <Image
                  src="/logo.png"
                  alt="AYVO Monogram"
                  width={44}
                  height={44}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold tracking-widest text-luxury-white">
                  AYVO
                </span>
                <span className="text-[10px] font-label text-luxury-gold uppercase tracking-[0.3em]">
                  Aesthetic. Your. Vision. Originally.
                </span>
              </div>
            </div>

            <p className="text-luxury-gray text-sm leading-relaxed max-w-sm">
              Timeless everyday luxury engineered from heavyweight 260 GSM combed cotton. Minimalist aesthetics paired with signature 3D raised gold craftsmanship.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://wa.me/923710108284"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all text-xs font-label uppercase tracking-wider font-semibold"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp: +92 371 0108284
              </a>
              <a
                href="https://instagram.com/ayvo_official110"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-luxury-dark text-luxury-gray hover:text-luxury-gold hover:border-luxury-gold/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-luxury-gray">
              <li>
                <Link href="/shop" className="hover:text-luxury-white transition-colors">
                  All 260 GSM Tees
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-luxury-white transition-colors">
                  Drop #1 Essentials
                </Link>
              </li>
              <li>
                <Link href="/shop?category=prestige-drops" className="hover:text-luxury-white transition-colors">
                  Prestige Gift Boxes
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-luxury-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Help */}
          <div className="space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-luxury-gray">
              <li>
                <Link href="/track-order" className="hover:text-luxury-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxury-white transition-colors">
                  Order via WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-luxury-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-luxury-white transition-colors">
                  Size Guide & Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Admin */}
          <div className="space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-luxury-gray">
              <li>
                <Link href="/about" className="hover:text-luxury-white transition-colors">
                  Brand Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxury-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-luxury-gold hover:underline flex items-center gap-1 font-label text-xs uppercase tracking-wider">
                  Admin Control Panel <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxury-gray font-label tracking-wider">
          <p>© 2026 AYVO Luxury Fashion. Crafted for Everyday Excellence.</p>
          <div className="flex items-center gap-6">
            <span>Karachi, Pakistan</span>
            <span>•</span>
            <Link href="/faq" className="hover:text-luxury-gold">
              Privacy & Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
