import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";

export default function SignInScreen() {
  const { colors } = useTheme();
  const { signIn, loading, signInWithGoogle, showResend, resendEmailVerification } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    const result = await signIn(email, password);
    if (!result.success) {
      if (result.requiresVerification) {
        setError(result.error ?? "Please verify your email address.");
      } else {
        setError(result.error ?? "Sign-in failed. Check your credentials.");
      }
      return;
    }
    setSuccess("Signed in successfully.");
    router.replace("/(tabs)/home");
  };

  const handleResend = async () => {
    if (!email) {
      setError("Enter your email to resend verification.");
      return;
    }
    const ok = await resendEmailVerification(email);
    setSuccess(ok ? "Verification email sent." : "Could not resend verification email.");
  };

  return (
    <Screen scrollable={false}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            Sign in to manage your account and orders
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="you@example.com"
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, { borderColor: colors.borderSecondary, color: colors.text, backgroundColor: colors.surfaceSecondary }]}
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, { borderColor: colors.borderSecondary, color: colors.text, backgroundColor: colors.surfaceSecondary }]}
          />

          {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
          {success ? (
            <Text style={[styles.successText, { color: colors.success }]}>{success}</Text>
          ) : null}

          <Pressable
            disabled={loading}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed || loading ? 0.9 : 1,
              },
            ]}
          >
            <Text style={[styles.submitText, { color: colors.textInverse }]}>
              {loading ? "Signing in..." : "Sign in"}
            </Text>
          </Pressable>

          <Pressable
            onPress={signInWithGoogle}
            disabled={loading}
            style={({ pressed }) => [
              styles.googleButton,
              {
                borderColor: colors.borderSecondary,
                backgroundColor: colors.surface,
                opacity: pressed ? 0.92 : 1,
              },
            ]}
          >
            <Text style={[styles.googleText, { color: colors.text }]}
            >
              Continue with Google
            </Text>
          </Pressable>

          {showResend ? (
            <Pressable onPress={handleResend}>
              <Text style={[styles.resendText, { color: colors.primary }]}>
                Resend verification email
              </Text>
            </Pressable>
          ) : null}

          <Pressable onPress={() => router.push("/auth/signup")}
          >
            <Text style={[styles.link, { color: colors.primary }]}>
              Don’t have an account? Create one
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
  },
  form: {
    gap: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
  },
  googleButton: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  googleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  resendText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
  link: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },
  errorText: {
    fontSize: 13,
    fontWeight: "600",
  },
  successText: {
    fontSize: 13,
    fontWeight: "600",
  },
});


