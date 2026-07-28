"use server";

import { supabaseAdmin } from "@/lib/client-supabase";
import { initialProducts } from "@/lib/initial-data";
import { Product } from "@/types";

export async function getProducts(options?: {
  categorySlug?: string;
  collectionSlug?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  search?: string;
  sortBy?: string;
}) {
  try {
    const { data: dbProducts, error } = await supabaseAdmin
      .from("products")
      .select("*, images:product_images(*), variants:product_variants(*)");

    let products: Product[] = [];

    if (error || !dbProducts || dbProducts.length === 0) {
      products = [...initialProducts];
    } else {
      products = dbProducts as Product[];
    }

    // Filter by options
    if (options?.isFeatured) {
      products = products.filter((p) => p.is_featured);
    }
    if (options?.isNewArrival) {
      products = products.filter((p) => p.is_new_arrival);
    }
    if (options?.isBestSeller) {
      products = products.filter((p) => p.is_best_seller);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (options?.sortBy) {
      if (options.sortBy === "price-asc") {
        products.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
      } else if (options.sortBy === "price-desc") {
        products.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
      } else if (options.sortBy === "newest") {
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }

    return { success: true, data: products };
  } catch (err: any) {
    return { success: false, data: initialProducts, error: err.message };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data: dbProduct, error } = await supabaseAdmin
      .from("products")
      .select("*, images:product_images(*), variants:product_variants(*)")
      .eq("slug", slug)
      .single();

    if (error || !dbProduct) {
      const found = initialProducts.find((p) => p.slug === slug);
      if (found) return { success: true, data: found };
      return { success: false, data: null, error: "Product not found" };
    }

    return { success: true, data: dbProduct as Product };
  } catch (err: any) {
    const found = initialProducts.find((p) => p.slug === slug);
    if (found) return { success: true, data: found };
    return { success: false, data: null, error: err.message };
  }
}

export async function createProduct(formData: Partial<Product>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([formData])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateProduct(id: string, formData: Partial<Product>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .update(formData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
