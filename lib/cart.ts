import { CartItem } from "@/types";

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  freeShippingProgress: number;
  freeShippingRemaining: number;
}

export function calculateCartTotals(
  items: CartItem[],
  freeShippingThreshold: number = 4999,
  flatShippingRate: number = 250,
  couponDiscount: number = 0
): CartTotals {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(couponDiscount, subtotal);
  const eligibleSubtotal = Math.max(0, subtotal - discountAmount);

  const isFreeShipping = eligibleSubtotal >= freeShippingThreshold || items.length === 0;
  const shippingAmount = isFreeShipping ? 0 : flatShippingRate;
  const taxAmount = 0; // Tax included or 0 for COD

  const total = eligibleSubtotal + shippingAmount + taxAmount;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return {
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    total,
    freeShippingProgress,
    freeShippingRemaining,
  };
}
