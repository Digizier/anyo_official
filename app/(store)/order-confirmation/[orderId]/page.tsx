import Link from "next/link";
import { getOrderByIdOrNumber } from "@/actions/orders";
import { CheckCircle2, MessageCircle, Package, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ConfirmationProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderConfirmationPage({ params }: ConfirmationProps) {
  const { orderId } = await params;
  const { data: order } = await getOrderByIdOrNumber(orderId);

  const orderNumber = order?.order_number || orderId;
  const whatsappUrl = `https://wa.me/923710108284?text=${encodeURIComponent(
    `Hi AYVO! I just placed order ${orderNumber}. Please confirm my dispatch timeline.`
  )}`;

  return (
    <div className="pt-36 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        
        {/* Animated Checkmark Icon */}
        <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold flex items-center justify-center text-luxury-gold mx-auto shadow-gold animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Order Confirmed
          </span>
          <h1 className="text-4xl font-serif font-bold text-luxury-white">
            Thank You For Your Order!
          </h1>
          <p className="text-luxury-gray text-sm font-sans">
            Your luxury order has been received and is now queued for dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-8 rounded-2xl bg-luxury-charcoal border border-luxury-dark text-left space-y-4">
          <div className="flex justify-between items-center border-b border-luxury-dark/80 pb-4">
            <div>
              <p className="text-xs text-luxury-gray uppercase font-label">Order Reference</p>
              <p className="font-mono text-lg font-bold text-luxury-gold">{orderNumber}</p>
            </div>
            <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800/50 rounded-full text-xs font-label uppercase">
              Pending Dispatch
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <p className="text-luxury-gray">
              Confirmation sent to: <span className="text-luxury-white">{order?.customer_email || "Customer"}</span>
            </p>
            <p className="text-luxury-gray">
              Estimated Delivery: <span className="text-luxury-gold font-semibold">3-5 Working Days</span>
            </p>
          </div>
        </div>

        {/* WhatsApp & Tracking Actions */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-label font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Get Order Updates on WhatsApp
          </a>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/track-order?number=${orderNumber}`}
              className="flex-1 py-3.5 px-6 rounded-full bg-luxury-charcoal border border-luxury-dark text-luxury-white hover:border-luxury-gold font-label text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-luxury-gold" />
              Track Order Status
            </Link>

            <Link
              href="/shop"
              className="flex-1 py-3.5 px-6 rounded-full bg-luxury-gold text-luxury-black font-label text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-gold"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
