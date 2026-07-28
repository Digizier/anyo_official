export type WebsiteStatus = "active" | "inactive";

export interface MasterWebsiteRecord {
  id: string;
  website_name: string;
  website_link: string;
  display_name: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  activate_date: string | null;
  deactivate_date: string | null;
  website_status: WebsiteStatus;
  billing_type: string;
  plan_name: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type ProductStatus = "published" | "draft" | "scheduled";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  sale_price?: number | null;
  compare_price?: number | null;
  sku: string;
  barcode?: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  weight_grams?: number | null;
  status: ProductStatus;
  is_featured: boolean;
  is_trending: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  tags: string[];
  category_id?: string | null;
  collection_id?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_image_url?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
  collection?: Collection;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_thumbnail: boolean;
  sort_order: number;
  alt_text?: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  color?: string;
  color_hex?: string;
  stock_quantity: number;
  price_adjustment: number;
  sku_variant?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  banner_url?: string;
  parent_id?: string | null;
  is_active: boolean;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "cod" | "card" | "bank";

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  country: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  note?: string;
  timestamp: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  tax_amount: number;
  total_amount: number;
  coupon_code?: string | null;
  shipping_address: Address;
  billing_address?: Address | null;
  notes?: string | null;
  admin_notes?: string | null;
  timeline: OrderTimelineStep[];
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string | null;
  product_name: string;
  product_image: string;
  size?: string;
  color?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  date_of_birth?: string;
  gender?: string;
  default_address?: Address | null;
  wishlist: string[];
  total_orders: number;
  total_spent: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email?: string;
  rating: number;
  title: string;
  body: string;
  status: "pending" | "approved" | "rejected";
  is_verified_buyer: boolean;
  created_at: string;
  product?: {
    name: string;
    slug: string;
  };
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minimum_order?: number;
  usage_limit?: number;
  usage_count: number;
  is_active: boolean;
  expires_at?: string | null;
  created_at: string;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  store_email: string;
  store_phone: string;
  whatsapp_number: string;
  store_address: string;
  currency: string;
  currency_symbol: string;
  logo_url: string;
  favicon_url: string;
  primary_color: string;
  accent_color: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  google_analytics?: string;
  facebook_pixel?: string;
  shipping_policy: string;
  return_policy: string;
  privacy_policy: string;
  terms_conditions: string;
  smtp_host?: string;
  smtp_port?: number;
  smtp_user?: string;
  smtp_password?: string;
  tax_rate: number;
  free_shipping_above: number;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  folder: string;
  alt_text?: string;
  uploaded_at: string;
}

export interface Announcement {
  id: string;
  message: string;
  bg_color: string;
  text_color: string;
  is_active: boolean;
  link_url?: string;
  link_text?: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
}
