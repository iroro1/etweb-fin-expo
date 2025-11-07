import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";
import { Text, View } from "react-native";

export default function TermsScreen() {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={{ gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.text }}>
            Terms & Conditions
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
            This is a placeholder Terms page for testing. Replace with your real content.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            Use of this demo app is for testing purposes only. All content and transactions are
            simulated.
          </Text>
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
            Please replace this copy with the actual legal terms that apply to your product before
            releasing it to real users.
          </Text>
        </View>
      </View>
    </Screen>
  );
}


