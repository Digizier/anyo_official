"use server";

import { supabaseAdmin } from "@/lib/client-supabase";

const SAMPLE_COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; minOrder: number }> = {
  AYVO10: { type: "percentage", value: 10, minOrder: 2000 },
  FIRSTDROP: { type: "fixed", value: 500, minOrder: 3000 },
  PRESTIGE20: { type: "percentage", value: 20, minOrder: 5000 },
};

export async function validateCoupon(code: string, subtotal: number) {
  try {
    const formattedCode = code.trim().toUpperCase();

    const { data: dbCoupon } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("code", formattedCode)
      .eq("is_active", true)
      .single();

    if (dbCoupon) {
      if (dbCoupon.minimum_order && subtotal < dbCoupon.minimum_order) {
        return {
          success: false,
          error: `Minimum order amount for code ${formattedCode} is Rs. ${dbCoupon.minimum_order}`,
        };
      }

      let discount = 0;
      if (dbCoupon.type === "percentage") {
        discount = Math.round((subtotal * dbCoupon.value) / 100);
      } else if (dbCoupon.type === "fixed") {
        discount = dbCoupon.value;
      }

      return {
        success: true,
        code: dbCoupon.code,
        discountAmount: discount,
        message: `Coupon code ${formattedCode} applied successfully!`,
      };
    }

    // Check mock sample coupons
    const sample = SAMPLE_COUPONS[formattedCode];
    if (sample) {
      if (subtotal < sample.minOrder) {
        return {
          success: false,
          error: `Minimum order for ${formattedCode} is Rs. ${sample.minOrder}`,
        };
      }

      const discount =
        sample.type === "percentage"
          ? Math.round((subtotal * sample.value) / 100)
          : sample.value;

      return {
        success: true,
        code: formattedCode,
        discountAmount: discount,
        message: `Coupon code ${formattedCode} applied successfully!`,
      };
    }

    return { success: false, error: "Invalid or expired coupon code" };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
