import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldAlert } from "lucide-react";
import { checkWebsiteStatus } from "@/lib/master-check";

export default async function DeactivatedPage() {
  const status = await checkWebsiteStatus("ayvo_official110");
  const cleanPhone = status.ownerPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${status.ownerName}, I am reaching out regarding the activation status of ${status.displayName}.`
  )}`;

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Gold Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* AYVO 3D Gold Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-36 h-36 rounded-full border border-luxury-gold/30 p-2 shadow-gold bg-luxury-charcoal/50 backdrop-blur-md flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AYVO Official Logo"
              width={130}
              height={130}
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>

        {/* Separator Gold Line */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto" />

        {/* Header Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs uppercase tracking-widest font-label font-medium">
            <ShieldAlert className="w-3.5 h-3.5" />
            System Notice
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-luxury-white">
            Website Temporarily Unavailable
          </h1>
          <p className="text-luxury-gray text-sm md:text-base leading-relaxed">
            This storefront has been temporarily deactivated by system administration. Please contact the account holder to restore active services.
          </p>
        </div>

        {/* Owner Info Box */}
        <div className="bg-luxury-charcoal/80 border border-luxury-dark/80 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl text-left">
          <div className="flex justify-between items-center text-xs uppercase text-luxury-gray tracking-wider font-label">
            <span>Account Holder</span>
            <span className="text-luxury-gold font-semibold">AYVO Official</span>
          </div>

          <div className="pt-1 border-t border-luxury-dark/50">
            <p className="text-xs text-luxury-gray font-label uppercase">Store Owner</p>
            <p className="text-lg font-serif font-semibold text-luxury-gold mt-0.5">
              {status.ownerName}
            </p>
          </div>

          <div>
            <p className="text-xs text-luxury-gray font-label uppercase">Contact Phone / WhatsApp</p>
            <p className="text-sm font-mono text-luxury-white mt-0.5">
              {status.ownerPhone}
            </p>
          </div>
        </div>

        {/* WhatsApp CTA Action Button */}
        <div className="space-y-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-black font-label font-bold text-sm tracking-wider uppercase hover:shadow-gold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Contact Owner on WhatsApp
          </a>

          <p className="text-xs text-luxury-gray">
            Reference ID: <span className="font-mono text-luxury-gold">ayvo_official110</span>
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 text-center text-xs text-luxury-gray/60 font-label tracking-widest uppercase">
        © 2026 AYVO Luxury Fashion SaaS. All rights reserved.
      </div>
    </div>
  );
}
