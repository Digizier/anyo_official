import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Contact AYVO Support</h1>
          <p className="text-luxury-gray text-sm max-w-md mx-auto font-sans">
            Our primary support channel is WhatsApp for instant order inquiry and size consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Direct Card */}
          <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-gold/50 space-y-4 shadow-gold">
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-luxury-white">WhatsApp Support</h3>
            <p className="text-xs text-luxury-gray leading-relaxed font-sans">
              Instant assistance for orders, size guidance, stock availability, and exchange requests.
            </p>
            <p className="font-mono text-lg font-bold text-luxury-gold">+92 371 0108284</p>
            <a
              href="https://wa.me/923710108284"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-label font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Open WhatsApp Chat
            </a>
          </div>

          {/* Email & Location Card */}
          <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Email Us</h4>
                <p className="text-xs text-luxury-gray font-mono">contact@ayvo.pk</p>
                <p className="text-xs text-luxury-gray font-mono">ayvo.official110@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-luxury-dark/60">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Location</h4>
                <p className="text-xs text-luxury-gray">Karachi, Sindh, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
