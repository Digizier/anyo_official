import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-luxury-gray text-lg font-serif">No products match your current selection.</p>
        <p className="text-xs text-luxury-gold uppercase tracking-wider font-label">
          Try resetting filters or searching for 260 GSM Tees.
        </p>
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid ${gridColsClass} gap-4 sm:gap-6 lg:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
