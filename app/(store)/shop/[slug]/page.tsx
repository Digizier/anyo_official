import { getProductBySlug, getProducts } from "@/actions/products";
import { formatPrice } from "@/lib/utils";
import { ProductImageGallery } from "@/components/store/ProductImageGallery";
import { ProductGrid } from "@/components/store/ProductGrid";
import { SingleProductActions } from "./SingleProductActions";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, RefreshCw, Sparkles, MessageCircle } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SingleProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { data: allProducts } = await getProducts();
  const relatedProducts = allProducts?.filter((p) => p.id !== product.id).slice(0, 4) || [];

  const currentPrice = product.sale_price || product.price;
  const originalPrice = product.compare_price || (product.sale_price ? product.price : null);

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Main Product Layout: Gallery Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Thumbnail & Lightbox Gallery */}
          <ProductImageGallery images={product.images || []} productName={product.name} />

          {/* Right: Product Details & Purchase Actions */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-label uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                260 GSM Heavyweight Combed Cotton
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-luxury-white">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-mono font-bold text-luxury-gold">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-lg font-mono text-luxury-gray line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                {product.sale_price && (
                  <span className="text-xs font-label uppercase px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800/50 rounded-full font-bold">
                    Save {formatPrice(product.price - product.sale_price)}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-luxury-gray leading-relaxed font-sans border-t border-luxury-dark/60 pt-4">
              {product.short_description}
            </p>

            {/* Client Interactive Add to Cart & WhatsApp Form */}
            <SingleProductActions product={product} />

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-luxury-dark/60 text-center font-label">
              <div className="p-3 bg-luxury-charcoal/60 rounded-xl border border-luxury-dark space-y-1">
                <Truck className="w-5 h-5 text-luxury-gold mx-auto" />
                <p className="text-[10px] uppercase text-luxury-cream">3-5 Day Delivery</p>
              </div>
              <div className="p-3 bg-luxury-charcoal/60 rounded-xl border border-luxury-dark space-y-1">
                <ShieldCheck className="w-5 h-5 text-luxury-gold mx-auto" />
                <p className="text-[10px] uppercase text-luxury-cream">3D Raised Monogram</p>
              </div>
              <div className="p-3 bg-luxury-charcoal/60 rounded-xl border border-luxury-dark space-y-1">
                <RefreshCw className="w-5 h-5 text-luxury-gold mx-auto" />
                <p className="text-[10px] uppercase text-luxury-cream">Easy 7-Day Return</p>
              </div>
            </div>

            {/* Product Specifications & Full Description */}
            <div className="space-y-4 pt-4 font-sans text-xs text-luxury-gray border-t border-luxury-dark">
              <h3 className="text-sm font-serif font-bold text-luxury-white">Product Description & Specs</h3>
              <div className="whitespace-pre-line leading-relaxed bg-luxury-charcoal/40 p-4 rounded-xl border border-luxury-dark">
                {product.description}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-16 border-t border-luxury-dark">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-center">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
