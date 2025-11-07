import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PromoCarousel } from "@/components/PromoCarousel";
import { ProductCard } from "@/components/cards/ProductCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import {
  dummyCategories,
  dummyProducts,
  dummyServices,
  dummyNotifications,
} from "@/data/dummy-data";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import {
  ShoppingBag,
  Wrench,
  ArrowRight,
  Sparkles,
  BellDot,
} from "lucide-react-native";

const HERO_STATS = [
  { label: "Customers", value: "10K+" },
  { label: "Products", value: "5K+" },
  { label: "Services", value: "500+" },
  { label: "Support", value: "24/7" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  const featuredProducts = useMemo(() => dummyProducts.slice(0, 6), []);
  const featuredServices = useMemo(() => dummyServices.slice(0, 6), []);
  const saleProducts = useMemo(
    () => dummyProducts.filter((product) => product.isOnSale).slice(0, 3),
    []
  );

  const slides = useMemo(
    () => [
      {
        id: "sale-phones",
        title: "Mega Deals on Smartphones",
        subtitle: "Up to 20% off select devices this week only.",
        ctaText: "Shop Phones",
        ctaHref: "/products",
        image: dummyProducts[0]?.images[0] ?? "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      },
      {
        id: "services",
        title: "Hire Top Service Providers",
        subtitle: "Find vetted pros for design, development, and more.",
        ctaText: "Browse Services",
        ctaHref: "/services",
        image: dummyServices[0]?.images[0] ?? "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      },
      {
        id: "trending",
        title: "Trending Products This Week",
        subtitle: "See what other buyers are loving right now.",
        ctaText: "Explore Trending",
        ctaHref: "/products",
        image: dummyProducts[1]?.images[0] ?? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      },
    ],
    []
  );

  return (
    <Screen>
      <View style={[styles.hero, { backgroundColor: colors.surface }]}
      >
        <View style={styles.heroBadge}>
          <Sparkles color={colors.primary} size={16} />
          <Text style={[styles.heroBadgeText, { color: colors.primary }]}
          >
            Trusted by 10,000+ customers
          </Text>
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}
        >
          Your one-stop marketplace for products and services
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}
        >
          Shop quality products and book professional services from verified sellers across Nigeria.
        </Text>
        <View style={styles.heroActions}>
          <Pressable
            onPress={() => router.push("/products")}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <ShoppingBag color={colors.textInverse} size={18} />
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}
            >
              Browse Products
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/services")}
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                borderColor: colors.border,
                backgroundColor: pressed ? colors.backgroundSecondary : colors.surface,
              },
            ]}
          >
            <Wrench color={colors.text} size={18} />
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}
            >
              Find Services
            </Text>
          </Pressable>
        </View>
        <View style={styles.heroStats}>
          {HERO_STATS.map((stat) => (
            <View key={stat.label} style={styles.heroStatItem}>
              <Text style={[styles.heroStatValue, { color: colors.text }]}
              >
                {stat.value}
              </Text>
              <Text style={[styles.heroStatLabel, { color: colors.textSecondary }]}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionSpacing}>
        <PromoCarousel slides={slides} />
      </View>

      <View style={styles.sectionSpacing}>
        <View style={styles.welcomeHeader}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}
          >
            {user ? `Welcome back, ${user.firstName ?? "Customer"}!` : "Welcome to ET Marketplace!"}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.notificationBadge,
              {
                backgroundColor: colors.surfaceSecondary,
                borderColor: colors.borderSecondary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={() => router.push("/notifications")}
          >
            <BellDot color={colors.primary} size={18} />
            <Text style={[styles.notificationText, { color: colors.textSecondary }]}
            >
              {dummyNotifications.filter((notif) => !notif.isRead).length} new alerts
            </Text>
          </Pressable>
        </View>
        <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}
        >
          Discover amazing products and professional services from trusted sellers across Nigeria
        </Text>
      </View>

      <View style={styles.sectionSpacing}>
        <SectionHeader
          title="Shop by Category"
          action={
            <Pressable
              onPress={() => router.push("/all-categories")}
              style={styles.actionLink}
            >
              <Text style={[styles.actionText, { color: colors.primary }]}
              >
                View All
              </Text>
              <ArrowRight color={colors.primary} size={16} />
            </Pressable>
          }
        />
        <FlatList
          data={dummyCategories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.categoryRow}
          contentContainerStyle={styles.listContentSpacing}
          ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.categoryCell,
                index % 2 === 1 && styles.categoryCellRight,
              ]}
            >
              <CategoryCard category={item} />
            </View>
          )}
        />
      </View>

      <View style={styles.sectionSpacing}>
        <SectionHeader
          title="Featured Products"
          action={
            <Pressable
              onPress={() => router.push("/products")}
              style={styles.actionLink}
            >
              <Text style={[styles.actionText, { color: colors.primary }]}
              >
                View All
              </Text>
              <ArrowRight color={colors.primary} size={16} />
            </Pressable>
          }
        />
        <FlatList
          data={featuredProducts}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContentSpacing}
          ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ProductCard product={item} />
            </View>
          )}
        />
      </View>

      <View style={styles.sectionSpacing}>
        <SectionHeader
          title="Featured Services"
          action={
            <Pressable
              onPress={() => router.push("/services")}
              style={styles.actionLink}
            >
              <Text style={[styles.actionText, { color: colors.primary }]}>
                Browse All
              </Text>
              <ArrowRight color={colors.primary} size={16} />
            </Pressable>
          }
        />
        <FlatList
          data={featuredServices}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContentSpacing}
          ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ServiceCard service={item} />
            </View>
          )}
        />
      </View>

      {saleProducts.length ? (
        <View style={[styles.sectionSpacing, styles.lastSection]}>
          <SectionHeader
            title="On Sale"
            action={
              <Pressable
                onPress={() => router.push("/products")}
                style={styles.actionLink}
              >
                <Text style={[styles.actionText, { color: colors.primary }]}
                >
                  View All
                </Text>
                <ArrowRight color={colors.primary} size={16} />
              </Pressable>
            }
          />
          <FlatList
            data={saleProducts}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContentSpacing}
            ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <ProductCard product={item} />
              </View>
            )}
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: 24,
    gap: 18,
    borderWidth: 1,
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "rgba(37, 99, 235, 0.12)",
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  heroActions: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroStatItem: {
    alignItems: "center",
    gap: 4,
  },
  heroStatValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  heroStatLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  sectionSpacing: {
    marginTop: 32,
    gap: 16,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
  },
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 6,
  },
  notificationBadge: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryCell: {
    flex: 1,
    marginRight: 16,
  },
  categoryCellRight: {
    marginRight: 0,
  },
  listContentSpacing: {
    paddingBottom: 8,
  },
  listItem: {
    marginBottom: 16,
  },
  verticalSeparator: {
    height: 16,
  },
  notificationText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  lastSection: {
    marginBottom: 40,
  },
});


