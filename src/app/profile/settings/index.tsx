import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { Screen } from "@/components/layout/Screen";
import { dummyUser } from "@/data/dummy-data";
import { useRouter } from "expo-router";

const FIELD_LABELS: Record<keyof FormState, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountSettingsScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: dummyUser.firstName,
    lastName: dummyUser.lastName,
    email: dummyUser.email,
    phone: dummyUser.phone ?? "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const passwordType = showPasswords ? "visible-password" : "password";

  const hasChanges = useMemo(
    () =>
      form.firstName !== dummyUser.firstName ||
      form.lastName !== dummyUser.lastName ||
      form.email !== dummyUser.email ||
      form.phone !== (dummyUser.phone ?? "") ||
      !!form.newPassword ||
      !!form.currentPassword,
    [form]
  );

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) nextErrors.firstName = "Required";
    if (!form.lastName.trim()) nextErrors.lastName = "Required";

    if (!form.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) nextErrors.phone = "Required";

    if (form.newPassword) {
      if (!form.currentPassword) {
        nextErrors.currentPassword = "Enter current password";
      }
      if (form.newPassword.length < 8) {
        nextErrors.newPassword = "At least 8 characters";
      }
      if (form.newPassword !== form.confirmPassword) {
        nextErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSaving(false);
    router.push("/profile"); // mimic success, in a real app we'd show toast
  };

  const handleDeleteAccount = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSaving(false);
    router.replace("/auth/signin");
  };

  return (
    <Screen scrollable={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 8 }}>
          <Text style={[styles.title, { color: colors.text }]}>
            Account Settings
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            Update your personal information and adjust security preferences.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Information
          </Text>
          <View style={{ gap: 16 }}>
            {(["firstName", "lastName", "email", "phone"] as const).map(
              (field) => (
                <View key={field} style={{ gap: 6 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    {FIELD_LABELS[field]}
                  </Text>
                  <TextInput
                    value={form[field]}
                    onChangeText={(value) => updateField(field, value)}
                    placeholder={FIELD_LABELS[field]}
                    placeholderTextColor={colors.textSecondary}
                    keyboardType={field === "email" ? "email-address" : "default"}
                    autoCapitalize={field === "email" ? "none" : "words"}
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        borderColor: errors[field]
                          ? colors.error
                          : colors.borderSecondary,
                        backgroundColor: colors.surfaceSecondary,
                      },
                    ]}
                  />
                  {errors[field] ? (
                    <Text style={{ color: colors.error, fontSize: 12 }}>
                      {errors[field]}
                    </Text>
                  ) : null}
                </View>
              )
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Change Password
          </Text>
          <View style={{ gap: 16 }}>
            <Pressable
              onPress={() => setShowPasswords((prev) => !prev)}
              style={({ pressed }) => [
                styles.toggleRow,
                {
                  backgroundColor: colors.surfaceSecondary,
                  borderColor: colors.borderSecondary,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>Show password</Text>
              <Switch
                value={showPasswords}
                onValueChange={setShowPasswords}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor="#fff"
              />
            </Pressable>

            {(["currentPassword", "newPassword", "confirmPassword"] as const).map(
              (field) => (
                <View key={field} style={{ gap: 6 }}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    {FIELD_LABELS[field]}
                  </Text>
                  <TextInput
                    value={form[field]}
                    onChangeText={(value) => updateField(field, value)}
                    secureTextEntry={!showPasswords}
                    textContentType="password"
                    autoCapitalize="none"
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        borderColor: errors[field]
                          ? colors.error
                          : colors.borderSecondary,
                        backgroundColor: colors.surfaceSecondary,
                      },
                    ]}
                  />
                  {errors[field] ? (
                    <Text style={{ color: colors.error, fontSize: 12 }}>
                      {errors[field]}
                    </Text>
                  ) : null}
                </View>
              )
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Security
          </Text>
          <View style={{ gap: 12 }}>
            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.toggleTitle, { color: colors.text }]}>
                  Two-factor authentication
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                  Add an extra layer of protection to your account.
                </Text>
              </View>
              <Switch
                value={twoFactor}
                onValueChange={setTwoFactor}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor="#fff"
              />
            </View>
            {twoFactor ? (
              <View
                style={[
                  styles.notice,
                  {
                    backgroundColor: colors.primary + "10",
                    borderColor: colors.primary + "25",
                  },
                ]}
              >
                <Text style={{ color: colors.primary, fontWeight: "600" }}>
                  Scan the QR code in your authenticator app and enter the 6-digit
                  code to finish set up.
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <Pressable
          onPress={handleSave}
          disabled={saving || !hasChanges}
          style={[
            styles.saveButton,
            {
              backgroundColor: hasChanges ? colors.primary : colors.border,
              opacity: saving ? 0.7 : 1,
            },
          ]}
        >
          {saving ? (
            <ActivityIndicator color={colors.textInverse} />
          ) : (
            <Text style={[styles.saveLabel, { color: colors.textInverse }]}>
              Save Changes
            </Text>
          )}
        </Pressable>

        <View
          style={[
            styles.dangerCard,
            {
              backgroundColor: colors.error + "10",
              borderColor: colors.error + "35",
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.error }]}>
            Danger zone
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 20 }}>
            Deleting your account will remove all orders, saved addresses, and history.
            This action cannot be undone.
          </Text>
          <Pressable
            onPress={handleDeleteAccount}
            disabled={saving}
            style={[
              styles.deleteButton,
              {
                backgroundColor: colors.error,
                opacity: saving ? 0.7 : 1,
              },
            ]}
          >
            <Text style={{ color: colors.textInverse, fontWeight: "600" }}>
              Delete Account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  notice: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  saveButton: {
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  dangerCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  deleteButton: {
    alignSelf: "flex-start",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});

