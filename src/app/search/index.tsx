import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { ProductCard } from "@/components/cards/ProductCard";
import { dummyProducts } from "@/data/dummy-data";
import { useTheme } from "@/contexts/theme-context";

export default function SearchScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState(params.category ?? "");

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return dummyProducts;
    return dummyProducts.filter((product) =>
      `${product.name} ${product.category} ${product.tags.join(" ")}`
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <Screen scrollable={false}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View>
            <SectionHeader
              title="Search"
              subtitle="Find products and services"
            />
            <SearchInput
              placeholder="Search the marketplace"
              value={query}
              onChangeText={setQuery}
              onClear={() => setQuery("")}
            />
          </View>
        }
        ListFooterComponent={<View style={{ height: 40 }} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No results</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Try another search term.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 48,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  verticalSeparator: {
    height: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 14,
  },
});


