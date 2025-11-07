import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  onPress?: (category: Category) => void;
}

export const CategoryCard = memo(({ category, onPress }: CategoryCardProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(category);
      return;
    }

    router.push({
      pathname: "/search",
      params: { category: category.name },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Image
        source={{ uri: category.image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.overlay}>
        <Text style={[styles.label, { color: colors.textInverse }]}
        >
          {category.name}
        </Text>
        <Text style={[styles.count, { color: colors.textInverse }]}>
          {category.productCount} products
        </Text>
      </View>
    </Pressable>
  );
});

CategoryCard.displayName = "CategoryCard";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  count: {
    fontSize: 12,
    opacity: 0.9,
  },
});


