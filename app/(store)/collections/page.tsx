import Link from "next/link";
import Image from "next/image";
import { initialCollections } from "@/lib/initial-data";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Curated Lines
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            AYVO Collections
          </h1>
          <p className="text-luxury-gray text-sm font-sans">
            Minimalist streetwear drops engineered with structural 260 GSM combed cotton.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialCollections.map((col) => (
            <Link
              key={col.id}
              href={`/shop?collection=${col.slug}`}
              className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-dark shadow-2xl"
            >
              <Image
                src={col.image_url!}
                alt={col.name}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="text-[10px] font-label text-luxury-gold uppercase tracking-widest bg-luxury-black/80 px-3 py-1 rounded-full border border-luxury-gold/40 backdrop-blur-md">
                  Featured Drop
                </span>
                <h2 className="font-serif text-3xl font-bold text-luxury-white">
                  {col.name}
                </h2>
                <p className="text-xs text-luxury-gray max-w-md font-sans">
                  {col.description}
                </p>
                <div className="pt-2 text-xs font-label uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
