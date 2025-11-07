import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/contexts/theme-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const { items, total } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const canComplete = items.length > 0 && address && city && state;

  return (
    <Screen>
      <SectionHeader
        title="Checkout"
        subtitle="Confirm delivery details and complete your purchase"
      />

      {!items.length ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}
          >
            Your cart is empty. Add items before checking out.
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>Shipping information</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Street address"
              placeholderTextColor={colors.textTertiary}
              style={[styles.input, { borderColor: colors.borderSecondary, backgroundColor: colors.surfaceSecondary, color: colors.text }]}
            />
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="City"
              placeholderTextColor={colors.textTertiary}
              style={[styles.input, { borderColor: colors.borderSecondary, backgroundColor: colors.surfaceSecondary, color: colors.text }]}
            />
            <TextInput
              value={state}
              onChangeText={setState}
              placeholder="State"
              placeholderTextColor={colors.textTertiary}
              style={[styles.input, { borderColor: colors.borderSecondary, backgroundColor: colors.surfaceSecondary, color: colors.text }]}
            />
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>Order summary</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.text }]} numberOfLines={1}>
                  {item.product.name}
                </Text>
                <Text style={[styles.summaryValue, { color: colors.textSecondary }]}>
                  ₦{(item.product.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryTotalLabel, { color: colors.text }]}>Total</Text>
              <Text style={[styles.summaryTotal, { color: colors.primary }]}
              >
                ₦{total.toLocaleString()}
              </Text>
            </View>
            <Pressable
              disabled={!canComplete}
              onPress={() => router.push("/payment-success")}
              style={({ pressed }) => [
                styles.payButton,
                {
                  backgroundColor: canComplete ? colors.primary : colors.border,
                  opacity: pressed ? 0.92 : 1,
                },
              ]}
            >
              <Text style={[styles.payText, { color: colors.textInverse }]}>Pay ₦{total.toLocaleString()}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
  grid: {
    marginTop: 24,
    gap: 20,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(148, 163, 184, 0.2)",
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "700",
  },
  payButton: {
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    fontWeight: "700",
  },
});


