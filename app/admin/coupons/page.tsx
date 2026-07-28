import { Tag, Plus } from "lucide-react";

export default function AdminCouponsPage() {
  const coupons = [
    { code: "AYVO10", type: "10% Discount", minOrder: "Rs. 2,000", status: "Active" },
    { code: "FIRSTDROP", type: "Rs. 500 Flat Off", minOrder: "Rs. 3,000", status: "Active" },
    { code: "PRESTIGE20", type: "20% VIP Discount", minOrder: "Rs. 5,000", status: "Active" },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Coupons Engine</h1>
          <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
            Create Promotional Discounts & VIP Drop Codes
          </p>
        </div>
        <button className="py-3 px-5 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase font-bold tracking-wider shadow-gold">
          + Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.code} className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-3">
            <Tag className="w-6 h-6 text-luxury-gold" />
            <h3 className="font-mono text-2xl font-bold text-luxury-gold">{c.code}</h3>
            <p className="text-xs text-luxury-white font-bold">{c.type}</p>
            <p className="text-xs text-luxury-gray">Min Order: {c.minOrder}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
