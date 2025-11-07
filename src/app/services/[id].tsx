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
import { dummyServices, dummyServiceReviews, dummyServicePackages } from "@/data/dummy-data";
import { useWishlist } from "@/contexts/wishlist-context";
import { Heart, MapPin, Clock3, Star } from "lucide-react-native";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { toggleService, containsService } = useWishlist();

  const service = useMemo(
    () => dummyServices.find((entry) => entry.id === id),
    [id]
  );

  const reviews = useMemo(
    () => dummyServiceReviews.filter((review) => review.serviceId === service?.id).slice(0, 4),
    [service?.id]
  );

  const packages = useMemo(
    () => dummyServicePackages.filter((pkg) => pkg.serviceId === service?.id),
    [service?.id]
  );

  if (!service) {
    return (
      <Screen>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>Service not found</Text>
          <Text style={[styles.notFoundSubtitle, { color: colors.textSecondary }]}
          >
            This service is no longer available.
          </Text>
        </View>
      </Screen>
    );
  }

  const inWishlist = containsService(service.id);

  return (
    <Screen scrollable={false}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title={service.title} subtitle={service.category} />

        <Image
          source={{ uri: service.images[0] }}
          style={styles.heroImage}
          contentFit="cover"
        />

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {service.provider.location}
            </Text>
          </View>
          <View style={styles.metaChip}>
            <Clock3 size={16} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {service.duration}
            </Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Star size={16} color={colors.rating} fill={colors.rating} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {service.rating.toFixed(1)} · {service.reviewCount} reviews
            </Text>
          </View>
          <Pressable
            onPress={() => toggleService(service)}
            style={({ pressed }) => [
              styles.wishlistButton,
              {
                backgroundColor: inWishlist ? colors.sale + "22" : colors.surfaceSecondary,
                borderColor: colors.borderSecondary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Heart
              size={18}
              color={inWishlist ? colors.sale : colors.textSecondary}
              fill={inWishlist ? colors.sale : "transparent"}
            />
          </Pressable>
        </View>

        <Text style={[styles.price, { color: colors.primary }]}>
          ₦{service.price.toLocaleString()}
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About this service</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}
          >
            {service.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Packages</Text>
          <View style={styles.packageWrap}>
            {packages.map((pkg) => (
              <View key={pkg.id} style={[styles.packageCard, { borderColor: colors.borderSecondary }]}
              >
                <Text style={[styles.packageName, { color: colors.text }]}>{pkg.name}</Text>
                <Text style={[styles.packagePrice, { color: colors.primary }]}>
                  ₦{pkg.price.toLocaleString()}
                </Text>
                <Text style={[styles.packageDuration, { color: colors.textSecondary }]}>
                  {pkg.duration}
                </Text>
                <View style={styles.packageFeatures}>
                  {pkg.features.map((feature) => (
                    <Text key={feature} style={[styles.packageFeatureText, { color: colors.textSecondary }]}
                    >
                      • {feature}
                    </Text>
                  ))}
                </View>
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
                <Text style={[styles.reviewBody, { color: colors.textSecondary }]}
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
          onPress={() => {}}
          style={({ pressed }) => [
            styles.bookButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.bookButtonText, { color: colors.textInverse }]}>
            Book Service
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
  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 28,
    marginTop: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  metaChip: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(148, 163, 184, 0.12)",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
  },
  ratingRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  wishlistButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "700",
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
  packageWrap: {
    gap: 16,
  },
  packageCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "700",
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  packageDuration: {
    fontSize: 13,
    fontWeight: "600",
  },
  packageFeatures: {
    marginTop: 8,
    gap: 6,
  },
  packageFeatureText: {
    fontSize: 13,
    lineHeight: 20,
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
  reviewBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 14,
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
  bookButton: {
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 16,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});


