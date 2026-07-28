import { initialCategories } from "@/lib/initial-data";
import { FolderTree, Plus } from "lucide-react";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Categories Manager</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Organize Store Catalog Categories
          </p>
        </div>
        <button className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider shadow-gold">
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-3">
            <FolderTree className="w-6 h-6 text-luxury-gold" />
            <h3 className="font-serif text-xl font-bold text-luxury-white">{cat.name}</h3>
            <p className="text-xs text-luxury-gray">{cat.description}</p>
            <p className="text-[10px] font-mono text-luxury-gold uppercase">Slug: /{cat.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
