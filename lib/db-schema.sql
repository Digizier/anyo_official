-- ====================================================================
-- LAYER 1 SCHEMA — MASTER SAAS CONTROL LAYER (nadir_website)
-- ====================================================================

CREATE TABLE IF NOT EXISTS client_websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_name TEXT UNIQUE NOT NULL,
  website_link TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  activate_date TIMESTAMPTZ,
  deactivate_date TIMESTAMPTZ,
  website_status TEXT DEFAULT 'active',
  billing_type TEXT DEFAULT 'yearly',
  plan_name TEXT DEFAULT 'Premium Plan',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update website_status on activate/deactivate dates
CREATE OR REPLACE FUNCTION auto_update_website_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.activate_date IS NOT NULL AND NEW.deactivate_date IS NOT NULL THEN
    IF NOW() >= NEW.activate_date AND NOW() < NEW.deactivate_date THEN
      NEW.website_status := 'active';
    ELSE
      NEW.website_status := 'inactive';
    END IF;
  ELSIF NEW.activate_date IS NOT NULL AND NOW() >= NEW.activate_date THEN
    NEW.website_status := 'active';
  ELSE
    NEW.website_status := 'inactive';
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_update_status ON client_websites;
CREATE TRIGGER trigger_auto_update_status
BEFORE INSERT OR UPDATE ON client_websites
FOR EACH ROW EXECUTE FUNCTION auto_update_website_status();

-- Seed data for AYVO Client Website
INSERT INTO client_websites (
  website_name, website_link, display_name, owner_name, owner_phone, owner_email, activate_date, deactivate_date, website_status, billing_type, plan_name
) VALUES (
  'ayvo_official110', 'ayvo.vercel.app', 'AYVO', 'AYVO Owner', '+92 371 0108284', 'baitullahrepair@gmail.com', NOW(), NOW() + INTERVAL '1 year', 'active', 'yearly', 'Premium Plan'
) ON CONFLICT (website_name) DO UPDATE SET updated_at = NOW();


-- ====================================================================
-- LAYER 2 SCHEMA — CLIENT STORE LAYER (ayvo_official110)
-- ====================================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  banner_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT
);

-- 2. Collections Table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  compare_price DECIMAL(10,2),
  sku TEXT NOT NULL,
  barcode TEXT,
  stock_quantity INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 5,
  weight_grams INT DEFAULT 260,
  status TEXT DEFAULT 'published',
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT true,
  is_best_seller BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  seo_title TEXT,
  seo_description TEXT,
  seo_image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_thumbnail BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  alt_text TEXT
);

-- 5. Product Variants Table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  color TEXT,
  color_hex TEXT,
  stock_quantity INT DEFAULT 10,
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  sku_variant TEXT
);

-- 6. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'cod',
  subtotal DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  coupon_code TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  admin_notes TEXT,
  timeline JSONB[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  size TEXT,
  color TEXT,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- 8. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,
  default_address JSONB,
  wishlist UUID[] DEFAULT '{}',
  total_orders INT DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'approved',
  is_verified_buyer BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  minimum_order DECIMAL(10,2) DEFAULT 0,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT DEFAULT 'AYVO',
  store_email TEXT DEFAULT 'contact@ayvo.pk',
  store_phone TEXT DEFAULT '+92 371 0108284',
  whatsapp_number TEXT DEFAULT '923710108284',
  store_address TEXT DEFAULT 'Karachi, Pakistan',
  currency TEXT DEFAULT 'PKR',
  currency_symbol TEXT DEFAULT 'Rs.',
  logo_url TEXT DEFAULT '/logo.png',
  favicon_url TEXT DEFAULT '/favicon.ico',
  primary_color TEXT DEFAULT '#0D0D0D',
  accent_color TEXT DEFAULT '#C9A44C',
  instagram_url TEXT DEFAULT 'https://instagram.com/ayvo_official110',
  facebook_url TEXT DEFAULT 'https://facebook.com/ayvo.official',
  tiktok_url TEXT DEFAULT 'https://tiktok.com/@ayvo_official',
  shipping_policy TEXT DEFAULT 'Free standard delivery on orders above Rs. 4,999 within Pakistan. Delivered in 3-5 working days.',
  return_policy TEXT DEFAULT 'Easy 7-day hassle-free exchange & return policy for all unworn products in original luxury packaging.',
  privacy_policy TEXT DEFAULT 'Your data privacy is paramount to AYVO. We never share or sell personal information.',
  terms_conditions TEXT DEFAULT 'All orders are subject to stock availability and verification.',
  tax_rate DECIMAL(5,2) DEFAULT 0,
  free_shipping_above DECIMAL(10,2) DEFAULT 4999,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'super_admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Media Library Table
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT NOT NULL,
  mime_type TEXT NOT NULL,
  folder TEXT DEFAULT 'general',
  alt_text TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Homepage Sections Table
CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  settings JSONB DEFAULT '{}'
);

-- 15. Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  bg_color TEXT DEFAULT '#C9A44C',
  text_color TEXT DEFAULT '#0D0D0D',
  is_active BOOLEAN DEFAULT true,
  link_url TEXT,
  link_text TEXT
);

-- RLS Enablement
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone view approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone read store settings" ON store_settings FOR SELECT USING (true);
