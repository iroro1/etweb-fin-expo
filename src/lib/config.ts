import Constants from "expo-constants";

const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig?.extra ?? {};

export const SUPABASE_URL = supabaseUrl as string | undefined;
export const SUPABASE_ANON_KEY = supabaseAnonKey as string | undefined;

export function assertEnvVar(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}


