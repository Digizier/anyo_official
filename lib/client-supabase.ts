import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://djbapbcevjnalzvionlz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYmFwYmNldmpuYWx6dmlvbmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMzc2ODYsImV4cCI6MjEwMDgxM2Y4Nn0.GMn6tuP0rTrlR4fvoJOrUw3KYoQO5Usvv1Yi5agNqc8";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYmFwYmNldmpuYWx6dmlvbmx6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTIzNzY4NiwiZXhwIjoyMTAwODEzNjg2fQ.iPMmWXFHN5uim0KKQPERe2kuM4VihCuZ_5JTUd84-Kw";

// Browser Public Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Service Role Client for Server Actions & Admin API
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});
