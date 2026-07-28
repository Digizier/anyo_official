"use server";

import { supabaseAdmin } from "@/lib/client-supabase";
import { initialReviews } from "@/lib/initial-data";
import { Review } from "@/types";

export async function getApprovedReviews(productId?: string) {
  try {
    let query = supabaseAdmin.from("reviews").select("*").eq("status", "approved");
    if (productId) {
      query = query.eq("product_id", productId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return { success: true, data: initialReviews };
    }

    return { success: true, data: data as Review[] };
  } catch (err: any) {
    return { success: true, data: initialReviews };
  }
}

export async function submitReview(payload: {
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  body: string;
}) {
  try {
    const newReview = {
      product_id: payload.productId,
      customer_name: payload.customerName,
      customer_email: payload.customerEmail,
      rating: payload.rating,
      title: payload.title,
      body: payload.body,
      status: "approved",
      is_verified_buyer: true,
    };

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert([newReview])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
