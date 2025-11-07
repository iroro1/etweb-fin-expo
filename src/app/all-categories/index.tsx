import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Grid3X3,
  List,
  Search,
} from "lucide-react-native";
import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";

const BUSINESS_CATEGORIES = [
  "Electronics",
  "Computers & Laptops",
  "Mobile Phones & Tablets",
  "Gaming & Consoles",
  "Audio & Headphones",
  "Cameras & Photography",
  "Smart Home Devices",
  "Wearable Technology",
  "Fashion & Apparel",
  "Shoes & Footwear",
  "Jewelry & Watches",
  "Bags & Accessories",
  "Beauty & Cosmetics",
  "Hair Care & Styling",
  "Skincare & Makeup",
  "Perfumes & Fragrances",
  "Home & Garden",
  "Furniture & Decor",
  "Kitchen & Dining",
  "Bedding & Bath",
  "Lighting & Lamps",
  "Storage & Organization",
  "Pet Supplies",
  "Baby & Kids Products",
  "Health & Fitness",
  "Sports & Outdoor",
  "Nutrition & Supplements",
  "Medical & Healthcare",
  "Yoga & Meditation",
  "Personal Care",
  "Fitness Equipment",
  "Automotive",
  "Car Accessories",
  "Motorcycle Parts",
  "Bicycles & Cycling",
  "Travel & Luggage",
  "Navigation & GPS",
  "Office Supplies",
  "Business Services",
  "Printing & Stationery",
  "Professional Services",
  "Marketing & Advertising",
  "Food & Beverages",
  "Restaurants & Delivery",
  "Catering Services",
  "Food Processing",
  "Beverages & Drinks",
  "Snacks & Confectionery",
  "Art & Crafts",
  "Music & Instruments",
  "Books & Publishing",
  "Photography Services",
  "Design & Graphics",
  "Handmade Products",
  "Education & Training",
  "Online Courses",
  "Tutoring Services",
  "Language Learning",
  "Professional Development",
  "Skills Training",
  "Real Estate",
  "Property Management",
  "Construction Services",
  "Interior Design",
  "Architecture",
  "Property Development",
  "Financial Services",
  "Banking & Insurance",
  "Investment Services",
  "Accounting & Tax",
  "Loan Services",
  "Payment Solutions",
  "Entertainment",
  "Event Planning",
  "Party Supplies",
  "Gaming & Recreation",
  "Movie & TV Services",
  "Live Performances",
  "Agriculture",
  "Farming Equipment",
  "Organic Products",
  "Livestock",
  "Crop Production",
  "Agricultural Services",
  "Manufacturing",
  "Industrial Equipment",
  "Raw Materials",
  "Production Services",
  "Quality Control",
  "Supply Chain",
  "Energy & Utilities",
  "Solar & Renewable",
  "Power Solutions",
  "Water Services",
  "Waste Management",
  "Environmental Services",
  "Legal Services",
  "Consulting",
  "Human Resources",
  "Recruitment",
  "Training & Development",
  "Business Support",
  "Transportation",
  "Logistics Services",
  "Shipping & Delivery",
  "Warehousing",
  "Freight Services",
  "Supply Chain Management",
  "Media & Communication",
  "Digital Marketing",
  "Content Creation",
  "Social Media",
  "Public Relations",
  "Broadcasting",
  "Tourism & Hospitality",
  "Hotels & Accommodation",
  "Travel Services",
  "Tour Guides",
  "Cultural Experiences",
  "Adventure Tourism",
  "Cleaning Services",
  "Security Services",
  "Maintenance & Repair",
  "Installation Services",
  "Custom Services",
  "Specialized Solutions",
];

type ViewMode = "grid" | "list";

export default function AllCategoriesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return BUSINESS_CATEGORIES;
    const query = search.toLowerCase();
    return BUSINESS_CATEGORIES.filter((cat) =>
      cat.toLowerCase().includes(query)
    );
  }, [search]);

  const handleSelect = (category: string) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <Screen scrollable={false}>
      <View style={styles.header}>
        <View style={{ gap: 6 }}>
          <Text style={[styles.title, { color: colors.text }]}>All Categories</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Explore our comprehensive collection of products and services.
          </Text>
        </View>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { borderColor: colors.border }]}
        >
          <ArrowLeft color={colors.text} size={18} />
          <Text style={{ color: colors.text, fontWeight: "600" }}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.controls}>
        <View style={[styles.searchInputWrapper, { borderColor: colors.border }]}>
          <Search color={colors.textSecondary} size={18} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search categories..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        <View style={[styles.toggle, { borderColor: colors.border }]}>
          <Pressable
            onPress={() => setViewMode("grid")}
            style={[
              styles.toggleButton,
              viewMode === "grid" && { backgroundColor: colors.primary },
            ]}
          >
            <Grid3X3
              color={viewMode === "grid" ? colors.textInverse : colors.textSecondary}
              size={18}
            />
          </Pressable>
          <Pressable
            onPress={() => setViewMode("list")}
            style={[
              styles.toggleButton,
              viewMode === "list" && { backgroundColor: colors.primary },
            ]}
          >
            <List
              color={viewMode === "list" ? colors.textInverse : colors.textSecondary}
              size={18}
            />
          </Pressable>
        </View>
      </View>

      <Text style={[styles.count, { color: colors.textSecondary }]}>
        Showing {filtered.length} of {BUSINESS_CATEGORIES.length} categories
      </Text>

      <FlatList
        data={filtered}
        key={viewMode}
        numColumns={viewMode === "grid" ? 2 : 1}
        columnWrapperStyle={viewMode === "grid" ? styles.gridRow : undefined}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelect(item)}
            style={[
              styles.categoryCard,
              viewMode === "grid" ? styles.categoryCardGrid : styles.categoryCardList,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={{ color: colors.primary, fontWeight: "700" }}>
                {item.charAt(0)}
              </Text>
            </View>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>{item}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Search color={colors.textSecondary} size={28} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No categories found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Try adjusting your search terms or browse all categories.
            </Text>
          </View>
        )}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 32,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  toggle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  toggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  count: {
    marginTop: 12,
    fontSize: 13,
  },
  gridRow: {
    gap: 12,
  },
  categoryCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCardGrid: {
    flex: 1,
  },
  categoryCardList: {
    flex: 1,
  },
  categoryBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
  },
  empty: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});


