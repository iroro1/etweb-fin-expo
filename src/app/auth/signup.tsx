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

export default function SignUpScreen() {
  const { colors } = useTheme();
  const { signUp, loading } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    const ok = await signUp(email, password, firstName, lastName);
    if (!ok) {
      setError("Could not create account. Please try again.");
      return;
    }
    setSuccess("Account created! Check your email to verify your account.");
    router.replace("/auth/signin");
  };

  return (
    <Screen scrollable={false}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            Join the marketplace to start shopping and booking services
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>First name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Ada"
                placeholderTextColor={colors.textTertiary}
                style={[styles.input, { borderColor: colors.borderSecondary, color: colors.text, backgroundColor: colors.surfaceSecondary }]}
              />
            </View>
            <View style={styles.half}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Last name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Obi"
                placeholderTextColor={colors.textTertiary}
                style={[styles.input, { borderColor: colors.borderSecondary, color: colors.text, backgroundColor: colors.surfaceSecondary }]}
              />
            </View>
          </View>

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
            placeholder="••••••••"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
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
              {loading ? "Creating account..." : "Create account"}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push("/auth/signin")}>
            <Text style={[styles.link, { color: colors.primary }]}>
              Already have an account? Sign in
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
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
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
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
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


