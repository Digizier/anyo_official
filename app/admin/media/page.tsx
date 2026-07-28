import Image from "next/image";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function AdminMediaPage() {
  const images = [
    "/logo.png",
    "/ayvo-emblem.png",
    "/instagram-showcase.png",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Media Library</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Supabase Storage Buckets (product-images, media-library)
          </p>
        </div>
        <button className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-gold">
          <Upload className="w-4 h-4" /> Upload Files
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-luxury-charcoal border border-luxury-dark group">
            <Image src={img} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-luxury-gold">
              Copy URL
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
