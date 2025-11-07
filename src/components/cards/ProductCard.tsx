import { memo, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import { Star } from "lucide-react-native";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard = memo(({ product, onPress }: ProductCardProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const saleBadge = useMemo(() => {
    if (!product.isOnSale && !product.salePercentage) return null;

    return (
      <View style={[styles.saleBadge, { backgroundColor: colors.sale }]}> 
        <Text style={[styles.saleText, { color: colors.textInverse }]}>-
          {product.salePercentage ?? 0}%
        </Text>
      </View>
    );
  }, [colors.sale, colors.textInverse, product.isOnSale, product.salePercentage]);

  const handlePress = () => {
    if (onPress) {
      onPress(product);
      return;
    }

    router.push({ pathname: "/product/[id]", params: { id: product.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSecondary,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        {saleBadge}
      </View>
      <View style={styles.body}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: colors.text }]}
        >
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ₦{product.price.toLocaleString()}
          </Text>
          {product.originalPrice ? (
            <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
              ₦{product.originalPrice.toLocaleString()}
            </Text>
          ) : null}
        </View>
        <View style={styles.metaRow}>
          <Star size={16} color={colors.rating} fill={colors.rating} />
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            {product.rating.toFixed(1)} · {product.reviewCount}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

ProductCard.displayName = "ProductCard";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  saleBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  saleText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 16,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "500",
  },
});


