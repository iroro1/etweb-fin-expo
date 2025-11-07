import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterChip } from "@/components/ui/FilterChip";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { dummyServices } from "@/data/dummy-data";
import { useTheme } from "@/contexts/theme-context";

const DURATION_FILTERS = [
  { label: "Any Duration", value: "all" },
  { label: "< 2 hrs", value: "short" },
  { label: "2 - 4 hrs", value: "medium" },
  { label: "> 4 hrs", value: "long" },
];

export default function ServicesScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [duration, setDuration] = useState(DURATION_FILTERS[0].value);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(dummyServices.map((service) => service.category)));
    return [{ id: "all", label: "All Services" }, ...unique.map((name) => ({ id: name, label: name }))];
  }, []);

  const filteredServices = useMemo(() => {
    let results = dummyServices;

    if (query) {
      results = results.filter((service) =>
        `${service.title} ${service.description}`.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== "all") {
      results = results.filter((service) => service.category === category);
    }

    if (duration !== "all") {
      results = results.filter((service) => {
        const hours = parseInt(service.duration, 10);
        if (Number.isNaN(hours)) return true;
        if (duration === "short") return hours < 2;
        if (duration === "medium") return hours >= 2 && hours <= 4;
        return hours > 4;
      });
    }

    return [...results].sort((a, b) => b.rating - a.rating);
  }, [category, duration, query]);

  const header = (
    <View>
      <SectionHeader
        title="Services"
        subtitle="Book professional services from verified providers"
      />

      <View style={styles.searchRow}>
        <SearchInput
          placeholder="Search services, skills, providers"
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
              label={item.label}
              active={category === item.id || (!category && item.id === "all")}
              onPress={() => setCategory(item.id === "all" ? null : item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      </View>

      <View style={styles.filterRow}>
        <FlatList
          data={DURATION_FILTERS}
          horizontal
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              active={duration === item.value}
              onPress={() => setDuration(item.value)}
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
        data={filteredServices}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.verticalSeparator} />}
        ListHeaderComponent={header}
        ListFooterComponent={<View style={{ height: 32 }} />}
        renderItem={({ item }) => <ServiceCard service={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}
            >
              No services found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Try refining your filters to discover more providers.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
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
  listContent: {
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


