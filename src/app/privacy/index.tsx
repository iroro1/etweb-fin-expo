import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";
import { Text, View } from "react-native";

export default function PrivacyScreen() {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={{ gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.text }}>
            Privacy Policy
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
            This is a placeholder Privacy Policy for testing. Replace with your real content.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            We respect your privacy. This demo page explains how your data may be used in this
            prototype.
          </Text>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            No real data is collected. All interactions are simulated with dummy data.
          </Text>
        </View>
      </View>
    </Screen>
  );
}


