import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";
import { useRouter } from "expo-router";

export default function PaymentSuccessScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.success }]}>Payment successful!</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          We’re preparing your order. You can track its progress in the orders tab.
        </Text>
        <Pressable
          onPress={() => router.replace("/(tabs)/home")}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.textInverse }]}>
            Continue shopping
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    width: "80%",
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});


