import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setMessage(null);
    const ok = await forgotPassword(email);
    if (!ok) {
      setError("We couldn't send reset instructions. Try again later.");
      return;
    }
    setMessage("Check your email for password reset instructions.");
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Reset password</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          Enter your email address and we'll send you a reset link.
        </Text>
      </View>

      <View style={styles.form}>
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

        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
        {message ? <Text style={[styles.successText, { color: colors.success }]}>{message}</Text> : null}

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.submitText, { color: colors.textInverse }]}>
            Send reset link
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 32,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
  },
  form: {
    marginTop: 28,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
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


