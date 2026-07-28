"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Don't apply admin sidebar layout on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-luxury-black text-luxury-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm"
          />
          <div className="relative z-10">
            <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
