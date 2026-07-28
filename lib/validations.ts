import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  addressLine1: z.string().min(5, "Shipping address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province/State is required"),
  postalCode: z.string().optional(),
  country: z.string().default("Pakistan"),
  paymentMethod: z.enum(["cod", "card", "bank"]).default("cod"),
  notes: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  description: z.string().min(10, "Full description is required"),
  price: z.coerce.number().positive("Regular price must be greater than 0"),
  salePrice: z.coerce.number().optional().nullable(),
  comparePrice: z.coerce.number().optional().nullable(),
  sku: z.string().min(2, "SKU is required"),
  stockQuantity: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  lowStockThreshold: z.coerce.number().int().default(5),
  status: z.enum(["published", "draft", "scheduled"]).default("published"),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isNewArrival: z.boolean().default(true),
  isBestSeller: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  categoryId: z.string().optional().nullable(),
  collectionId: z.string().optional().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(2, "Review title is required"),
  body: z.string().min(10, "Please provide detailed feedback"),
  customerName: z.string().min(2, "Your name is required"),
  customerEmail: z.string().email("Valid email required"),
});

export const couponSchema = z.object({
  code: z.string().min(3, "Coupon code must be at least 3 characters").toUpperCase(),
  type: z.enum(["percentage", "fixed", "free_shipping"]),
  value: z.coerce.number().positive("Value must be positive"),
  minimumOrder: z.coerce.number().optional(),
  usageLimit: z.coerce.number().optional(),
  isActive: z.boolean().default(true),
});

export const settingsSchema = z.object({
  storeName: z.string().min(2),
  storeEmail: z.string().email(),
  storePhone: z.string().min(8),
  whatsappNumber: z.string().min(8),
  storeAddress: z.string(),
  currency: z.string().default("PKR"),
  currencySymbol: z.string().default("Rs."),
  freeShippingAbove: z.coerce.number().default(4999),
  taxRate: z.coerce.number().default(0),
});
