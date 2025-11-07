import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCompare } from "@/contexts/compare-context";
import { useTheme } from "@/contexts/theme-context";
import { Image } from "expo-image";

export default function CompareScreen() {
  const { products, clear } = useCompare();
  const { colors } = useTheme();

  return (
    <Screen>
      <SectionHeader
        title="Compare"
        subtitle="Review saved products side by side"
        action={
          products.length ? (
            <Pressable onPress={clear}>
              <Text style={{ color: colors.error, fontWeight: "600" }}>Clear</Text>
            </Pressable>
          ) : null
        }
      />

      {!products.length ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No products yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Add up to four products to compare their features.
          </Text>
        </View>
      ) : (
        <View style={styles.table}>
          {products.map((product) => (
            <View key={product.id} style={[styles.column, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
            >
              <Image source={{ uri: product.images[0] }} style={styles.image} contentFit="cover" />
              <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={[styles.price, { color: colors.primary }]}>₦{product.price.toLocaleString()}</Text>
              <View style={styles.featureList}>
                {product.tags.slice(0, 5).map((tag) => (
                  <Text key={tag} style={[styles.feature, { color: colors.textSecondary }]}
                  >
                    • {tag}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    width: "80%",
  },
  table: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  column: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
  },
  featureList: {
    gap: 6,
  },
  feature: {
    fontSize: 12,
  },
});


