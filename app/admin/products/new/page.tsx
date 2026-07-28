"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/products";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    price: 3999,
    salePrice: 2999,
    comparePrice: 3999,
    sku: "AYVO-TEE-NEW",
    stockQuantity: 50,
    status: "published" as "published" | "draft" | "scheduled",
    isFeatured: true,
    isNewArrival: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createProduct({
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      short_description: formData.shortDescription,
      description: formData.description,
      price: formData.price,
      sale_price: formData.salePrice,
      compare_price: formData.comparePrice,
      sku: formData.sku,
      stock_quantity: formData.stockQuantity,
      status: formData.status,
      is_featured: formData.isFeatured,
      is_new_arrival: formData.isNewArrival,
      tags: ["260 GSM", "Gold Monogram", "Luxury Essential"],
    });

    setLoading(false);

    if (result.success) {
      router.push("/admin/products");
    } else {
      setError(result.error || "Failed to create product");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-xl bg-luxury-charcoal hover:text-luxury-gold border border-luxury-dark">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold">Add New Luxury Product</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-0.5">
            260 GSM Combed Cotton Specifications & Pricing
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
          <h3 className="font-serif text-xl font-bold border-b border-luxury-dark pb-3">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. AYVO 3D Gold Monogram Navy Blue Tee"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Short Preview Description *</label>
              <input
                type="text"
                required
                placeholder="260 GSM Heavyweight Combed Cotton with 3D raised gold monogram."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Full Specifications & Description *</label>
              <textarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none font-sans"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
          <h3 className="font-serif text-xl font-bold border-b border-luxury-dark pb-3">Pricing & Stock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Regular Price (Rs.) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white font-mono focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Sale Price (Rs.)</label>
              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white font-mono focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-luxury-gray uppercase font-label tracking-wider">Stock Quantity *</label>
              <input
                type="number"
                required
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white font-mono focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold flex items-center justify-center gap-2 hover:bg-luxury-gold-light transition-all"
        >
          <Save className="w-4 h-4" /> {loading ? "Publishing Product..." : "Save & Publish Product"}
        </button>
      </form>
    </div>
  );
}
