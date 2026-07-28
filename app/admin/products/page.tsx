import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/actions/products";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit, Trash, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const { data: products } = await getProducts();

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Products Catalog</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Manage 260 GSM Tees, Variants, Stock, and Status
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="py-3 px-6 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider shadow-gold hover:bg-luxury-gold-light transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Product
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
        <div className="overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-luxury-dark text-luxury-gray uppercase font-label">
                <th className="pb-3">Product</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-dark/50">
              {products?.map((p) => (
                <tr key={p.id} className="hover:bg-luxury-black/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-luxury-black flex-shrink-0">
                        <Image
                          src={p.images?.[0]?.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-luxury-white">{p.name}</p>
                        <p className="text-[10px] text-luxury-gold font-label uppercase">260 GSM Cotton</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-mono text-luxury-gray">{p.sku}</td>
                  <td className="py-4 font-mono font-bold text-luxury-gold">{formatPrice(p.sale_price || p.price)}</td>
                  <td className="py-4 font-mono">{p.stock_quantity} units</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-label uppercase text-[10px]">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${p.id}`} className="p-2 rounded-lg bg-luxury-black hover:text-luxury-gold">
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
