import { SB_ANON, SB_SERVER_URL } from "@/config/app.config";
import { Database } from "@/lib/db.types";
import { createClient } from "@supabase/supabase-js";

export const supabase_client = createClient<Database>(SB_SERVER_URL!, SB_ANON!, {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });