import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";
import { Text, View } from "react-native";

export default function CookiesScreen() {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={{ gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.text }}>
            Cookie Policy
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
            This is a placeholder Cookie Policy for testing. Replace with your real content.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            We use cookies only for demo purposes in this prototype. No tracking or analytics are
            enabled in this environment.
          </Text>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            Update this section with details on how you collect, store, and use cookies in your
            production application.
          </Text>
        </View>
      </View>
    </Screen>
  );
}


