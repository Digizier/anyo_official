"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldAlert } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const { items, setIsOpen: setCartOpen } = useCartStore();
  const { wishlistIds } = useWishlistStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlistIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-luxury-black/90 backdrop-blur-xl border-b border-luxury-dark/60 py-3 shadow-2xl"
            : "bg-gradient-to-b from-luxury-black/80 via-luxury-black/30 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-luxury-white hover:text-luxury-gold transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left / Center Logo & Brand Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full border border-luxury-gold/40 p-0.5 overflow-hidden bg-luxury-charcoal shadow-gold group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="AYVO Monogram"
                width={40}
                height={40}
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-luxury-white group-hover:text-luxury-gold transition-colors">
                AYVO
              </span>
              <span className="text-[9px] font-label text-luxury-gold uppercase tracking-[0.25em] -mt-1 hidden sm:block">
                Timeless Essentials
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs uppercase font-label tracking-[0.18em] transition-colors py-1 ${
                    isActive
                      ? "text-luxury-gold font-semibold"
                      : "text-luxury-white/90 hover:text-luxury-gold"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Wishlist, Cart, Account/Admin) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-luxury-white hover:text-luxury-gold transition-colors"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account/wishlist"
              className="relative p-2 text-luxury-white hover:text-luxury-gold transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-luxury-gold text-luxury-black font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-luxury-white hover:text-luxury-gold transition-colors flex items-center gap-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="w-5 h-5 bg-luxury-gold text-luxury-black font-bold text-xs rounded-full flex items-center justify-center font-mono shadow-gold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin / Account Dropdown Trigger */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-luxury-gold/40 bg-luxury-gold/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all text-xs font-label uppercase tracking-wider"
            >
              <User className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>
        </div>

        {/* Expandable Search Modal Bar */}
        {searchOpen && (
          <div className="w-full bg-luxury-charcoal/95 border-b border-luxury-dark p-4 animate-in slide-in-from-top duration-300">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-luxury-gold" />
              <input
                type="text"
                placeholder="Search 260 GSM Tees, Collections, Drop #1..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="w-full bg-transparent text-luxury-white placeholder-luxury-gray focus:outline-none text-sm font-sans"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-luxury-gray hover:text-luxury-gold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Full-Screen Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-luxury-black/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-6 border-b border-luxury-dark/80">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AYVO Monogram"
                width={36}
                height={36}
                className="rounded-full border border-luxury-gold/50"
              />
              <span className="font-serif text-2xl font-bold text-luxury-white">AYVO</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-luxury-white hover:text-luxury-gold"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-luxury-white hover:text-luxury-gold transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif text-luxury-gold tracking-wide pt-4 border-t border-luxury-dark/50"
            >
              Admin Panel Access
            </Link>
          </nav>

          <div className="space-y-4 text-center border-t border-luxury-dark/80 pt-6">
            <p className="text-xs text-luxury-gray font-label uppercase tracking-widest">
              WhatsApp Support: +92 371 0108284
            </p>
            <div className="flex justify-center gap-6 text-luxury-white text-xs font-label">
              <Link href="/account/wishlist" onClick={() => setMobileMenuOpen(false)}>
                Wishlist ({totalWishlistCount})
              </Link>
              <span>•</span>
              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>
                Track Order
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />
    </>
  );
}
