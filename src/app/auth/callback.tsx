import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/contexts/theme-context";
import { Screen } from "@/components/layout/Screen";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          router.replace("/auth/signin?error=auth_failed");
          return;
        }

        if (data.session) {
          router.replace("/");
        } else {
          router.replace("/auth/signin");
        }
      })
      .catch(() => {
        router.replace("/auth/signin?error=auth_failed");
      });
  }, [router]);

  return (
    <Screen scrollable={false}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary }}>
          Completing authentication...
        </Text>
      </View>
    </Screen>
  );
}


