import { useRouter } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { supabase } from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export type UserType = "customer" | "seller" | "service_provider";

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType?: UserType;
  avatar?: string;
  phone?: string;
}

interface SignInResponse {
  success: boolean;
  error?: string;
  requiresVerification?: boolean;
}

interface AuthContextValue {
  loading: boolean;
  user: UserProfile | null;
  showResend: boolean;
  signIn(email: string, password: string): Promise<SignInResponse>;
  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean>;
  signOut(): Promise<void>;
  signInWithGoogle(): Promise<boolean>;
  resendEmailVerification(email: string): Promise<boolean>;
  forgotPassword(email: string): Promise<boolean>;
  updateProfile(updates: Partial<UserProfile>): Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfile(authUser: SupabaseUser): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (error) {
    console.warn("Failed to fetch profile", error);
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name ?? undefined,
    lastName: data.last_name ?? undefined,
    avatar: data.avatar_url ?? undefined,
    phone: data.phone ?? undefined,
    userType: data.user_type ?? undefined,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const initialise = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      }

      setLoading(false);
    };

    initialise();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback<
    AuthContextValue["signIn"]
  >(async (email, password) => {
    setLoading(true);
    setShowResend(false);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const needsVerify = error.message.toLowerCase().includes("confirm");
        if (needsVerify) {
          setShowResend(true);
        }
        return {
          success: false,
          error: error.message,
          requiresVerification: needsVerify,
        };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed";
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback<
    AuthContextValue["signUp"]
  >(async (email, password, firstName, lastName) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.warn("Sign-up error", error);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      const redirectTo = Constants?.expoConfig?.scheme
        ? `${Constants.expoConfig.scheme}://auth-callback`
        : undefined;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo,
        },
      });

      if (error || !data?.url) {
        if (error) console.warn("Google auth error", error);
        return false;
      }

      const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      return res.type === "success";
    } catch (err) {
      console.warn("Google auth failed", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn("Sign-out error", error);
      }

      router.replace("/auth/signin");
    } catch (err) {
      console.warn("Sign-out failed", err);
    }
  }, [router]);

  const resendEmailVerification = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      console.warn("Resend verification failed", error);
      return false;
    }

    return true;
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: Constants.expoConfig?.scheme
        ? `${Constants.expoConfig.scheme}://reset-password`
        : undefined,
    });

    if (error) {
      console.warn("Password reset failed", error);
      return false;
    }

    return true;
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return false;

    const { error } = await supabase
      .from("users")
      .update({
        first_name: updates.firstName,
        last_name: updates.lastName,
        avatar_url: updates.avatar,
        phone: updates.phone,
        user_type: updates.userType,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      console.warn("Profile update failed", error);
      return false;
    }

    setUser((current) => (current ? { ...current, ...updates } : current));
    return true;
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      user,
      showResend,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      resendEmailVerification,
      forgotPassword,
      updateProfile,
    }),
    [
      forgotPassword,
      loading,
      resendEmailVerification,
      showResend,
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      updateProfile,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}


