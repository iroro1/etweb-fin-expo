import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Database } from "./types";
import { SUPABASE_ANON_KEY, SUPABASE_URL, assertEnvVar } from "./config";

const url = assertEnvVar(SUPABASE_URL, "SUPABASE_URL");
const anonKey = assertEnvVar(SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type { Database };


