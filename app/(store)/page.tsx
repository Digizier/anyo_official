import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/store/HeroSection";
import { ProductGrid } from "@/components/store/ProductGrid";
import { BrandStorySection } from "@/components/store/BrandStorySection";
import { LifestyleGallery } from "@/components/store/LifestyleGallery";
import { NewsletterSection } from "@/components/store/NewsletterSection";
import { getProducts } from "@/actions/products";
import { initialCategories } from "@/lib/initial-data";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default async function HomePage() {
  const { data: products } = await getProducts();

  const featuredProducts = products?.filter((p) => p.is_featured) || products?.slice(0, 4) || [];
  const bestSellers = products?.filter((p) => p.is_best_seller) || products || [];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. FEATURED COLLECTION BANNER */}
      <section id="featured-collection" className="py-24 bg-luxury-black text-luxury-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
                Signature Drops
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
                Featured Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs font-label uppercase tracking-widest text-luxury-gold hover:underline flex items-center gap-1 font-bold"
            >
              View All Collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/shop?collection=drop-1-timeless-essentials"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-dark/80 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
                alt="Black Essentials 260 GSM"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-label text-luxury-gold uppercase tracking-widest bg-luxury-black/80 px-2.5 py-1 rounded-full border border-luxury-gold/40 backdrop-blur-md">
                  260 GSM Heavyweight
                </span>
                <h3 className="font-serif text-2xl font-bold text-luxury-white">
                  Black Essentials
                </h3>
                <span className="text-xs font-label uppercase tracking-wider text-luxury-cream group-hover:text-luxury-gold transition-colors flex items-center gap-1 font-semibold">
                  Shop Drop #1 →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?collection=minimalist-prestige"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-dark/80 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
                alt="White Minimal Prestige"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-label text-luxury-gold uppercase tracking-widest bg-luxury-black/80 px-2.5 py-1 rounded-full border border-luxury-gold/40 backdrop-blur-md">
                  Clean Silhouette
                </span>
                <h3 className="font-serif text-2xl font-bold text-luxury-white">
                  White Minimal
                </h3>
                <span className="text-xs font-label uppercase tracking-wider text-luxury-cream group-hover:text-luxury-gold transition-colors flex items-center gap-1 font-semibold">
                  Explore Prestige →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=prestige-drops"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-dark/80 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80"
                alt="Limited Edition Boxed Set"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-label text-luxury-gold uppercase tracking-widest bg-luxury-black/80 px-2.5 py-1 rounded-full border border-luxury-gold/40 backdrop-blur-md">
                  Luxury Packaging
                </span>
                <h3 className="font-serif text-2xl font-bold text-luxury-white">
                  Prestige Gift Boxes
                </h3>
                <span className="text-xs font-label uppercase tracking-wider text-luxury-cream group-hover:text-luxury-gold transition-colors flex items-center gap-1 font-semibold">
                  Order Gift Box →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES CAROUSEL */}
      <section className="py-16 bg-luxury-charcoal/50 border-y border-luxury-dark/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-label uppercase tracking-[0.25em] text-luxury-gold font-semibold text-center mb-8">
            Explore Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {initialCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="p-6 rounded-2xl bg-luxury-black/60 border border-luxury-dark hover:border-luxury-gold/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-serif text-lg font-bold text-luxury-white group-hover:text-luxury-gold transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-luxury-gray line-clamp-1 mt-1 font-sans">
                    {cat.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS PRODUCT GRID */}
      <section className="py-24 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
              Customer Favorites
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
              Best Selling 260 GSM Tees
            </h2>
          </div>

          <ProductGrid products={bestSellers} columns={4} />
        </div>
      </section>

      {/* 5. BRAND STORY & 260 GSM SPECIFICATION */}
      <BrandStorySection />

      {/* 6. LIFESTYLE INSTAGRAM GALLERY */}
      <LifestyleGallery />

      {/* 7. VIP NEWSLETTER DROP */}
      <NewsletterSection />
    </div>
  );
}
