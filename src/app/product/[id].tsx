import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTheme } from "@/contexts/theme-context";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { dummyProducts, dummyReviews } from "@/data/dummy-data";
import { Heart, Share2, Star } from "lucide-react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addItem } = useCart();
  const { containsProduct, toggleProduct } = useWishlist();

  const product = useMemo(
    () => dummyProducts.find((entry) => entry.id === id),
    [id]
  );

  const reviews = useMemo(
    () => dummyReviews.filter((review) => review.productId === product?.id).slice(0, 4),
    [product?.id]
  );

  if (!product) {
    return (
      <Screen>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>Product not found</Text>
          <Text style={[styles.notFoundSubtitle, { color: colors.textSecondary }]}
          >
            This item is no longer available or has been removed.
          </Text>
        </View>
      </Screen>
    );
  }

  const inWishlist = containsProduct(product.id);

  return (
    <Screen scrollable={false}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title={product.name} subtitle={product.category} />

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
        >
          {product.images.map((uri) => (
            <Image
              key={uri}
              source={{ uri }}
              style={styles.galleryImage}
              contentFit="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => toggleProduct(product)}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: inWishlist ? colors.sale + "22" : colors.surfaceSecondary,
                borderColor: colors.borderSecondary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Heart
              size={20}
              color={inWishlist ? colors.sale : colors.textSecondary}
              fill={inWishlist ? colors.sale : "transparent"}
            />
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: colors.surfaceSecondary,
                borderColor: colors.borderSecondary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Share2 size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}
          >
            ₦{product.price.toLocaleString()}
          </Text>
          {product.originalPrice ? (
            <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
              ₦{product.originalPrice.toLocaleString()}
            </Text>
          ) : null}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Star size={16} color={colors.rating} fill={colors.rating} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </Text>
          </View>
          <View style={styles.stockBadge}>
            <Text style={[styles.stockText, { color: colors.textSecondary }]}>
              {product.inStock ? "In stock" : "Out of stock"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}
          >
            {product.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Tags</Text>
          <View style={styles.tagWrap}>
            {product.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.surfaceSecondary }]}
              >
                <Text style={[styles.tagText, { color: colors.textSecondary }]}
                >
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reviews</Text>
          {reviews.length ? (
            reviews.map((review) => (
              <View key={review.id} style={[styles.review, { borderColor: colors.borderSecondary }]}
              >
                <Text style={[styles.reviewAuthor, { color: colors.text }]}>
                  {review.userName}
                </Text>
                <Text style={[styles.reviewText, { color: colors.textSecondary }]}
                >
                  {review.comment}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}
            >
              No reviews yet.
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <Pressable
          onPress={() => addItem(product)}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.addButtonText, { color: colors.textInverse }]}
          >
            Add to Cart
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
  gallery: {
    marginTop: 12,
    borderRadius: 28,
    overflow: "hidden",
  },
  galleryImage: {
    width: 320,
    height: 320,
    marginRight: 12,
    borderRadius: 28,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  ratingBadge: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  stockBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(37, 99, 235, 0.1)",
  },
  stockText: {
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginTop: 28,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  review: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: "700",
  },
  reviewText: {
    fontSize: 13,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 14,
  },
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 80,
    gap: 12,
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  notFoundSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  addButton: {
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});


