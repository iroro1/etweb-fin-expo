import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/contexts/theme-context";
import { Trash2 } from "lucide-react-native";

export default function CartScreen() {
  const { items, updateQuantity, removeItem, subtotal, total, clearCart } = useCart();
  const { colors } = useTheme();
  const router = useRouter();

  const shippingFee = useMemo(() => (subtotal > 0 ? 1000 : 0), [subtotal]);

  const summaryRows = useMemo(
    () => [
      { label: "Subtotal", value: subtotal },
      { label: "Shipping", value: shippingFee },
      { label: "Total", value: total, accent: true },
    ],
    [shippingFee, subtotal, total]
  );

  return (
    <Screen>
      <SectionHeader
        title="Cart"
        subtitle="Review items and proceed to checkout"
        action={
          items.length ? (
            <Pressable onPress={clearCart} style={styles.clearAction}>
              <Text style={[styles.clearText, { color: colors.error }]}>Clear All</Text>
            </Pressable>
          ) : null
        }
      />

      {!items.length ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Explore products and add them to begin checkout.
          </Text>
          <Pressable
            onPress={() => router.push("/products")}
            style={({ pressed }) => [
              styles.shopButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.92 : 1,
              },
            ]}
          >
            <Text style={[styles.shopButtonText, { color: colors.textInverse }]}
            >
              Browse Products
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.list}>
          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { borderColor: colors.borderSecondary, backgroundColor: colors.surface }]}
            >
              <Image
                source={{ uri: item.product.images[0] }}
                style={styles.image}
                contentFit="cover"
              />
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <Pressable onPress={() => removeItem(item.id)}>
                    <Trash2 color={colors.error} size={18} />
                  </Pressable>
                </View>
                <Text style={[styles.cardPrice, { color: colors.primary }]}>
                  ₦{item.product.price.toLocaleString()}
                </Text>
                <View style={styles.cardFooter}>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(next) => updateQuantity(item.id, next)}
                  />
                  <Text style={[styles.totalPerItem, { color: colors.textSecondary }]}>
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
      >
        <Text style={[styles.summaryTitle, { color: colors.text }]}>Order Summary</Text>
        {summaryRows.map((row) => (
          <View key={row.label} style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}
            >
              {row.label}
            </Text>
            <Text
              style={[
                styles.summaryValue,
                { color: row.accent ? colors.text : colors.textSecondary },
                row.accent && { fontSize: 20, fontWeight: "700" },
              ]}
            >
              ₦{row.value.toLocaleString()}
            </Text>
          </View>
        ))}
        <Pressable
          disabled={!items.length}
          onPress={() => router.push("/checkout")}
          style={({ pressed }) => [
            styles.checkoutButton,
            {
              backgroundColor: items.length ? colors.primary : colors.border,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.checkoutText, { color: colors.textInverse }]}
          >
            Proceed to Checkout
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  clearAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "transparent",
  },
  clearText: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  emptySubtitle: {
    textAlign: "center",
    fontSize: 14,
    width: "80%",
  },
  shopButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  shopButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  list: {
    marginTop: 16,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: 110,
    height: 110,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalPerItem: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryCard: {
    marginTop: 32,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "700",
  },
});


