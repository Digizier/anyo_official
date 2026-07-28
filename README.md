# AYVO Luxury Fashion eCommerce — Dual-Layer SaaS Platform

AYVO is a production-ready, high-converting luxury fashion eCommerce platform built with Next.js 15, Tailwind CSS, Dual-Layer Supabase Security, Framer Motion, and Zustand.

## 🌟 Key Features

- **Dual-Layer Security Gate**: Intercepts requests using Next.js middleware and queries Layer 1 Master Control (`nadir_website`) to verify website activation status (`ayvo_official110`). If inactive, user is redirected to a full-screen luxury gate page (`/deactivated`) displaying owner contact info and WhatsApp link.
- **Official AYVO Branding**: Incorporates the official 3D Gold AYVO Monogram emblem across browser favicons, header, mobile navigation, footer, and admin control panel.
- **Mobile-First Responsive Design**: Optimized for mobile (<640px), tablet, and desktop with swipeable galleries, sticky action bars, and slide-over drawers.
- **WhatsApp Integration**: Floating WhatsApp support button (`+92 371 0108284`) and pre-filled product order CTAs.
- **Storefront Suite**:
  - Homepage with 100vh Hero Banner, Featured Collections, 260 GSM Specifications, Instagram Showcase, and VIP Newsletter.
  - Shop Catalog with Category, Collection, Price Range, and Sorting filters.
  - Single Product Page with Size Selector (S-XXL), Size Chart guide, and direct WhatsApp order links.
  - Cart Drawer & Multi-Step Checkout with Cash on Delivery (COD) and Bank Transfer.
  - Order Confirmation & Live Order Tracking timeline (`/track-order`).
- **Full Admin Control Panel (`/admin`)**:
  - Recharts Sales & Revenue analytics.
  - Products CRUD manager with 260 GSM specs & inventory counts.
  - Orders manager with status workflow (Pending → Confirmed → Processing → Shipped → Delivered).
  - Category, Collection, Coupon, Review Moderation, Media Library, Website Builder, and Store Settings managers.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, Server Components)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS, Lucide Icons, Framer Motion
- **Database & Auth**: Supabase (Layer 1 Master & Layer 2 Client Store)
- **State Management**: Zustand with LocalStorage persistence
- **Charts**: Recharts

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Digizier/anyo_official.git
   cd anyo_official
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```env
   MASTER_SUPABASE_URL=https://pggolsqtamtkafrpigfo.supabase.co
   MASTER_SUPABASE_ANON_KEY=your_key
   MASTER_SUPABASE_SERVICE_ROLE_KEY=your_service_key

   WEBSITE_NAME=ayvo_official110

   NEXT_PUBLIC_SUPABASE_URL=https://djbapbcevjnalzvionlz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` for public store and `http://localhost:3000/admin` for admin panel.

---
© 2026 AYVO Luxury Fashion. All rights reserved.
