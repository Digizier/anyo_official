import { initialReviews } from "@/lib/initial-data";
import { Star, CheckCircle, XCircle } from "lucide-react";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-serif text-3xl font-bold">Customer Reviews Moderation</h1>
        <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
          Approve & Manage Customer Product Feedback
        </p>
      </div>

      <div className="space-y-4">
        {initialReviews.map((rev) => (
          <div key={rev.id} className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-luxury-white">{rev.customer_name}</span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-label uppercase rounded-full">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-luxury-gold">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <h4 className="font-serif text-lg font-bold text-luxury-white">{rev.title}</h4>
            <p className="text-xs text-luxury-gray">{rev.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
