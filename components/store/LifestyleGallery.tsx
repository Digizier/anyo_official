import Image from "next/image";
import { Instagram } from "lucide-react";

export function LifestyleGallery() {
  const images = [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <section className="py-20 bg-luxury-black text-luxury-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-12">
        <a
          href="https://instagram.com/ayvo_official110"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-label text-luxury-gold uppercase tracking-[0.2em] hover:underline"
        >
          <Instagram className="w-4 h-4" /> @ayvo_official110
        </a>
        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          As Seen On Instagram
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 px-4 max-w-7xl mx-auto">
        {images.map((img, idx) => (
          <a
            key={idx}
            href="https://instagram.com/ayvo_official110"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden bg-luxury-charcoal border border-luxury-dark/80"
          >
            <Image
              src={img}
              alt={`AYVO Instagram Post ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-luxury-gold">
              <Instagram className="w-8 h-8" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
