"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-luxury-black via-luxury-charcoal to-luxury-black text-luxury-white border-t border-luxury-dark/80 relative overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
          Exclusive Access
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
          Join the AYVO Inner Circle
        </h2>
        <p className="text-luxury-gray text-sm max-w-lg mx-auto leading-relaxed">
          Be first to receive secret Drop alerts, limited prestige restocks, and private VIP promotional codes.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold text-sm font-label uppercase tracking-wider font-semibold animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-luxury-gold" />
            Thank you! You are officially registered for Drop #2 alerts.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 bg-luxury-black/90 border border-luxury-dark rounded-full text-xs font-sans text-luxury-white placeholder-luxury-gray focus:outline-none focus:border-luxury-gold transition-colors"
            />
            <button
              type="submit"
              className="py-3.5 px-8 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-widest hover:bg-luxury-gold-light transition-all shadow-gold flex items-center justify-center gap-2"
            >
              Subscribe <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
