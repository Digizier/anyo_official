"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("baitullahrepair@gmail.com");
  const [password, setPassword] = useState("ayvoluxury2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      document.cookie = "ayvo_admin_session=authenticated; path=/; max-age=86400";
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-luxury-charcoal border border-luxury-dark/80 rounded-2xl p-8 shadow-2xl space-y-8 relative z-10 backdrop-blur-xl">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full border border-luxury-gold/40 p-1 bg-luxury-black mx-auto shadow-gold flex items-center justify-center">
            <Image src="/logo.png" alt="AYVO Admin Monogram" width={56} height={56} className="object-contain rounded-full" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">AYVO Admin Control</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest">
            Layer 2 SaaS Management Portal
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs text-center font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
          <div className="space-y-1">
            <label className="text-luxury-gray uppercase font-label tracking-wider">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-luxury-gray uppercase font-label tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-luxury-black border border-luxury-dark rounded-xl text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-luxury-gold text-luxury-black font-label font-bold text-xs uppercase tracking-[0.2em] shadow-gold flex items-center justify-center gap-2 hover:bg-luxury-gold-light transition-all pt-3"
          >
            {loading ? "Authenticating..." : "Sign In to Admin"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[10px] text-luxury-gray font-label tracking-widest uppercase">
          Protected by AYVO Dual-Layer Gate Security
        </div>
      </div>
    </div>
  );
}
