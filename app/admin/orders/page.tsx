import { getAllOrders } from "@/actions/orders";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Eye, Package } from "lucide-react";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const { data: orders } = await getAllOrders();

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Store Orders</h1>
        <p className="text-xs text-luxury-gray font-label uppercase tracking-widest mt-1">
          Review & Dispatch Customer Orders
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-6">
        <div className="overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-luxury-dark text-luxury-gray uppercase font-label">
                <th className="pb-3">Order Number</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-dark/50">
              {orders && orders.length > 0 ? (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-luxury-black/30 transition-colors">
                    <td className="py-4 font-mono font-bold text-luxury-gold">{ord.order_number}</td>
                    <td className="py-4">{ord.customer_name}</td>
                    <td className="py-4 font-mono">{ord.customer_phone}</td>
                    <td className="py-4 font-mono font-bold">{formatPrice(ord.total_amount)}</td>
                    <td className="py-4 font-label uppercase">{ord.payment_method}</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full font-label uppercase text-[10px]">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/admin/orders/${ord.id}`} className="p-2 rounded-lg bg-luxury-black hover:text-luxury-gold inline-flex">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-luxury-gray">
                    No orders recorded yet. Place an order on the public storefront to view here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
