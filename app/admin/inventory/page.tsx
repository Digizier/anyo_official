import { Boxes } from "lucide-react";
import { initialProducts } from "@/lib/initial-data";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-serif text-3xl font-bold">Inventory & Variant Matrix</h1>
        <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
          Monitor Stock Counts per Size (S, M, L, XL, XXL)
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
        <div className="overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-luxury-dark text-luxury-gray uppercase font-label">
                <th className="pb-3">Product Title</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Total Stock</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-dark/50">
              {initialProducts.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-serif font-bold text-luxury-white">{p.name}</td>
                  <td className="py-3 font-mono text-luxury-gray">{p.sku}</td>
                  <td className="py-3 font-mono text-luxury-gold">{p.stock_quantity} units</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-label uppercase rounded-full">
                      In Stock
                    </span>
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
