import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useWishlist } from "@/contexts/wishlist-context";
import { useTheme } from "@/contexts/theme-context";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";

export default function WishlistScreen() {
  const { items, toggleProduct, toggleService, clear } = useWishlist();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <SectionHeader
        title="Wishlist"
        subtitle="Your saved products and services"
        action={
          items.length ? (
            <Pressable onPress={clear}>
              <Text style={{ color: colors.error, fontWeight: "600" }}>Clear</Text>
            </Pressable>
          ) : null
        }
      />

      {!items.length ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No saved items</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}
          >
            Tap the heart icon on any item to add it here.
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {items.map((item) => {
            const id = item.type === "product" ? item.product.id : item.service.id;
            const name = item.type === "product" ? item.product.name : item.service.title;
            const price = item.type === "product" ? item.product.price : item.service.price;
            const image = item.type === "product" ? item.product.images[0] : item.service.images[0];

            return (
              <View
                key={`${item.type}-${id}`}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
              >
                <Image source={{ uri: image }} style={styles.cardImage} contentFit="cover" />
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
                    {name}
                  </Text>
                  <Text style={[styles.cardPrice, { color: colors.primary }]}>
                    ₦{price.toLocaleString()}
                  </Text>
                  <View style={styles.cardActions}>
                    <Pressable
                      onPress={() =>
                        router.push({ pathname: `/${item.type === "product" ? "product" : "services"}/[id]`, params: { id } })
                      }
                      style={({ pressed }) => [
                        styles.viewButton,
                        {
                          backgroundColor: colors.primary,
                          opacity: pressed ? 0.92 : 1,
                        },
                      ]}
                    >
                      <Text style={[styles.viewText, { color: colors.textInverse }]}>View</Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        item.type === "product"
                          ? toggleProduct(item.product)
                          : toggleService(item.service)
                      }
                      style={styles.removeButton}
                    >
                      <Trash2 color={colors.textSecondary} size={16} />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
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
  grid: {
    marginTop: 24,
    gap: 20,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  viewText: {
    fontSize: 13,
    fontWeight: "700",
  },
  removeButton: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
});


