import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterChip } from "@/components/ui/FilterChip";
import { ProductCard } from "@/components/cards/ProductCard";
import { dummyCategories, dummyProducts } from "@/data/dummy-data";
import { useTheme } from "@/contexts/theme-context";

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Lowest Price", value: "price-asc" },
  { label: "Highest Price", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export default function ProductsScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  const categories = useMemo(() => [
    { id: "all", name: "All Categories" },
    ...dummyCategories.map((cat) => ({ id: cat.id, name: cat.name })),
  ], []);

  const filteredProducts = useMemo(() => {
    let results = dummyProducts;

    if (query) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (category && category !== "all") {
      results = results.filter((product) => product.category === category);
    }

    switch (sort) {
      case "price-asc":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      default:
        results = [...results].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return results;
  }, [category, query, sort]);

  const header = (
    <View>
      <SectionHeader
        title="Products"
        subtitle="Browse curated goods from trusted sellers"
      />

      <View style={styles.searchRow}>
        <SearchInput
          placeholder="Search products, categories, brands"
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery("")}
        />
      </View>

      <View style={styles.filterRow}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FilterChip
              label={item.name}
              active={category === item.name || (!category && item.id === "all")}
              onPress={() =>
                setCategory(item.id === "all" ? null : item.name)
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      </View>

      <View style={styles.sortRow}>
        <Text style={[styles.sortLabel, { color: colors.textSecondary }]}
        >
          Sort by
        </Text>
        <FlatList
          data={SORT_OPTIONS}
          horizontal
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              active={sort === item.value}
              onPress={() => setSort(item.value)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      </View>
    </View>
  );

  return (
    <Screen scrollable={false}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
        ListHeaderComponent={header}
        ListFooterComponent={<View style={{ height: 32 }} />}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}
            >
              No products found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Try adjusting your search or filters to find what you need.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    marginTop: 8,
  },
  filterRow: {
    marginTop: 20,
  },
  sortRow: {
    marginTop: 20,
    gap: 12,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  verticalSeparator: {
    height: 16,
  },
  horizontalSeparator: {
    width: 12,
  },
  horizontalListContent: {
    paddingRight: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
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
});


