import Image from "next/image";
import { Sparkles, ShieldCheck, Feather, Award } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-24 md:py-32 bg-luxury-charcoal/80 text-luxury-white border-y border-luxury-dark/80 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Why AYVO Highlight Cards */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs uppercase tracking-widest font-label">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Uncompromising Standards
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Why Choose AYVO?
          </h2>
          <p className="text-luxury-gray text-sm md:text-base leading-relaxed">
            We don’t create fast fashion. Every piece is meticulously custom milled, cut, and stitched for those who demand tactile perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-luxury-black/60 border border-luxury-dark rounded-2xl space-y-4 hover:border-luxury-gold/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">260 GSM Combed Cotton</h3>
            <p className="text-xs text-luxury-gray leading-relaxed">
              Ultra-heavyweight knit fabric offering structural boxy drapes without losing softness or breathability even in warm climates.
            </p>
          </div>

          <div className="p-8 bg-luxury-black/60 border border-luxury-dark rounded-2xl space-y-4 hover:border-luxury-gold/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">3D Raised Gold Monogram</h3>
            <p className="text-xs text-luxury-gray leading-relaxed">
              High-density tactile emblem heat-fused onto fabric for lifetime color retention and zero cracking.
            </p>
          </div>

          <div className="p-8 bg-luxury-black/60 border border-luxury-dark rounded-2xl space-y-4 hover:border-luxury-gold/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">Everyday Comfort</h3>
            <p className="text-xs text-luxury-gray leading-relaxed">
              Pre-shrunk, pre-washed combed cotton with shape-retention elastane ribbing for flawless collar fit.
            </p>
          </div>
        </div>

        {/* Brand Story 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-luxury-dark shadow-2xl">
            <Image
              src="/instagram-showcase.png"
              alt="AYVO Craftsmanship Showcase"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-luxury-black/80 backdrop-blur-md rounded-xl border border-luxury-dark">
              <p className="text-xs font-serif italic text-luxury-cream">
                "Aesthetic, your, vision, originally." — Designed & Manufactured in Karachi, Pakistan.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-[2px] bg-luxury-gold" />
            <h3 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Crafted for Those Who Value Prestige in Minimalism.
            </h3>
            <p className="text-luxury-gray text-sm leading-relaxed">
              AYVO was founded on a simple philosophy: eliminate clutter and double down on fabric quality. When you wear an AYVO 260 GSM Tee, you immediately notice the weight, seam precision, and elevated aesthetic.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/923710108284"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-luxury-black border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all text-xs font-label uppercase tracking-widest font-bold"
              >
                Connect With Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
