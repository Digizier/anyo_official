import { createClient } from "@supabase/supabase-js";

const masterUrl = process.env.MASTER_SUPABASE_URL || "https://pggolsqtamtkafrpigfo.supabase.co";
const masterAnonKey = process.env.MASTER_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZ29sc3F0YW10a2FmcnBpZ2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDE3ODgsImV4cCI6MjEwMDgxNzc4OH0.98_YWbdZ6hlpMiujbiWLYPRYlrvnx2_I31FyGILixHs";
const masterServiceKey = process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZ29sc3F0YW10a2FmcnBpZ2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTI0MTc4OCwiZXhwIjoyMTAwODE3Nzg4fQ.HylEsioCqtvD80tvetGvSetwEdwLE5cq1GYrLXdcjMY";

// Anonymous Master Supabase Client
export const masterSupabase = createClient(masterUrl, masterAnonKey, {
  auth: { persistSession: false },
});

// Service Role Master Client for Admin Gate Operations
export const masterServiceSupabase = createClient(masterUrl, masterServiceKey, {
  auth: { persistSession: false },
});
