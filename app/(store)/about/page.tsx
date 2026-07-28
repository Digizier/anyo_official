import Image from "next/image";
import { Sparkles, Award, ShieldCheck, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Brand Ethos
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold">
            The AYVO Story
          </h1>
          <p className="text-luxury-gray text-base max-w-xl mx-auto font-sans leading-relaxed">
            Aesthetic. Your. Vision. Originally. Engineered for those who appreciate understated everyday luxury.
          </p>
        </div>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-luxury-dark shadow-2xl">
          <Image
            src="/instagram-showcase.png"
            alt="AYVO Craftsmanship"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-luxury-gray leading-relaxed font-sans">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-luxury-white">
              Why 260 GSM Combed Cotton?
            </h3>
            <p>
              Standard fast-fashion T-shirts range from 140 to 180 GSM, leading to thin transparency, collar deformation after two washes, and zero structural drape. AYVO utilizes custom-milled 260 GSM combed cotton.
            </p>
            <p>
              This weight creates a pristine boxy silhouette that holds shape throughout the day, providing an opulent drape and rich hand-feel.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-luxury-white">
              3D Raised Monogram Craftsmanship
            </h3>
            <p>
              Our signature emblem isn't simple flat screen printing. We use a high-density 3D heat-fusion transfer process that creates a raised, tactile monogram on the chest.
            </p>
            <p>
              Designed and manufactured in Karachi, Pakistan for distribution worldwide.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-gold/40 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-luxury-white">
            Have Questions About Drops or Custom Sizing?
          </h3>
          <p className="text-luxury-gray text-xs max-w-md mx-auto">
            Our luxury support team is available directly on WhatsApp to guide your purchase.
          </p>
          <a
            href="https://wa.me/923710108284"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-wider shadow-gold"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Chat With Us on WhatsApp (+92 371 0108284)
          </a>
        </div>
      </div>
    </div>
  );
}
