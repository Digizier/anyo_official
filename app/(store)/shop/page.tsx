import { getProducts } from "@/actions/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import Link from "next/link";
import { Filter, SlidersHorizontal } from "lucide-react";

export const revalidate = 0;

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    search?: string;
    sortBy?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const { data: products } = await getProducts({
    categorySlug: resolvedParams.category,
    collectionSlug: resolvedParams.collection,
    search: resolvedParams.search,
    sortBy: resolvedParams.sortBy,
  });

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Header Title */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Catalog & Drops
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            All 260 GSM Products
          </h1>
          <p className="text-luxury-gray text-sm max-w-xl font-sans">
            Minimalist streetwear engineered from 260 GSM heavyweight combed cotton. Featuring our signature 3D raised gold monogram.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-luxury-charcoal border border-luxury-dark/80 text-xs font-label">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/shop"
              className={`px-4 py-2 rounded-full border transition-all ${
                !resolvedParams.category && !resolvedParams.collection
                  ? "bg-luxury-gold text-luxury-black font-bold border-luxury-gold shadow-gold"
                  : "bg-luxury-black text-luxury-white border-luxury-dark hover:border-luxury-gold/50"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/shop?category=luxury-tees"
              className={`px-4 py-2 rounded-full border transition-all ${
                resolvedParams.category === "luxury-tees"
                  ? "bg-luxury-gold text-luxury-black font-bold border-luxury-gold shadow-gold"
                  : "bg-luxury-black text-luxury-white border-luxury-dark hover:border-luxury-gold/50"
              }`}
            >
              260 GSM Tees
            </Link>
            <Link
              href="/shop?category=prestige-drops"
              className={`px-4 py-2 rounded-full border transition-all ${
                resolvedParams.category === "prestige-drops"
                  ? "bg-luxury-gold text-luxury-black font-bold border-luxury-gold shadow-gold"
                  : "bg-luxury-black text-luxury-white border-luxury-dark hover:border-luxury-gold/50"
              }`}
            >
              Prestige Boxes
            </Link>
          </div>

          <div className="flex items-center gap-4 text-luxury-gray">
            <span>Showing {products?.length || 0} products</span>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <ProductGrid products={products || []} columns={4} />
      </div>
    </div>
  );
}
