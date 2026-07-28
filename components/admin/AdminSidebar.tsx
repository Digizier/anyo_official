"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Sparkles,
  Users,
  Star,
  Tag,
  Boxes,
  BarChart3,
  Image as ImageIcon,
  Sliders,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Core Store Management",
      items: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Orders", href: "/admin/orders", icon: Package },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Categories", href: "/admin/categories", icon: FolderTree },
        { name: "Collections", href: "/admin/collections", icon: Sparkles },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Reviews", href: "/admin/reviews", icon: Star },
        { name: "Coupons", href: "/admin/coupons", icon: Tag },
        { name: "Inventory", href: "/admin/inventory", icon: Boxes },
      ],
    },
    {
      title: "Analytics & Content",
      items: [
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Media Library", href: "/admin/media", icon: ImageIcon },
        { name: "Website Builder", href: "/admin/website-builder", icon: Sliders },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const handleLogout = () => {
    document.cookie = "ayvo_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-luxury-charcoal border-r border-luxury-dark text-luxury-white h-screen flex flex-col justify-between p-5 sticky top-0 z-40 select-none">
      {/* Sidebar Header with Logo */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-5 border-b border-luxury-dark/80">
          <div className="w-9 h-9 rounded-full border border-luxury-gold/40 p-0.5 bg-luxury-black flex items-center justify-center shadow-gold">
            <Image
              src="/logo.png"
              alt="AYVO Admin Monogram"
              width={34}
              height={34}
              className="object-contain rounded-full"
            />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-wider text-luxury-white block leading-none">
              AYVO Admin
            </span>
            <span className="text-[9px] font-label text-luxury-gold uppercase tracking-[0.2em]">
              Master SaaS Control
            </span>
          </div>
        </div>

        {/* Navigation Item Groups */}
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-[10px] font-label text-luxury-gray uppercase tracking-widest px-2 font-semibold">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium transition-all ${
                        isActive
                          ? "bg-luxury-gold text-luxury-black font-bold shadow-gold"
                          : "text-luxury-white/80 hover:bg-luxury-black hover:text-luxury-gold"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section: View Store & Logout */}
      <div className="pt-4 border-t border-luxury-dark/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-luxury-gray hover:text-luxury-gold hover:bg-luxury-black transition-colors"
        >
          <span>View Public Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
}
