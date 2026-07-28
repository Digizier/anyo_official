import { initialCollections } from "@/lib/initial-data";
import { Sparkles } from "lucide-react";

export default function AdminCollectionsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Collections Manager</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Manage Signature Drops & Prestige Collections
          </p>
        </div>
        <button className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider shadow-gold">
          + Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialCollections.map((col) => (
          <div key={col.id} className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-3">
            <Sparkles className="w-6 h-6 text-luxury-gold" />
            <h3 className="font-serif text-xl font-bold text-luxury-white">{col.name}</h3>
            <p className="text-xs text-luxury-gray">{col.description}</p>
            <span className="inline-block px-2.5 py-1 bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-[10px] font-label uppercase rounded-full">
              Featured Collection
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
