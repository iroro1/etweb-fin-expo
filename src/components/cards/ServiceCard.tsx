import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import { Star } from "lucide-react-native";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  onPress?: (service: Service) => void;
}

export const ServiceCard = memo(({ service, onPress }: ServiceCardProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(service);
      return;
    }

    router.push({ pathname: "/services/[id]", params: { id: service.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSecondary,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: service.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      </View>
      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: colors.text }]}
        >
          {service.title}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.description, { color: colors.textSecondary }]}
        >
          {service.description}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ₦{service.price.toLocaleString()}
          </Text>
          <View style={styles.ratingRow}>
            <Star size={16} color={colors.rating} fill={colors.rating} />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}
            >
              {service.rating.toFixed(1)} · {service.reviewCount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

ServiceCard.displayName = "ServiceCard";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    width: 120,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "500",
  },
});


