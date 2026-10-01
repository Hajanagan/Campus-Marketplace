import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ListingCard } from "../components/ListingCard";
import { CATEGORIES } from "../data";
import { Listing } from "../types";

export function ExplorePage({
  items,
  allItems = [],
  query,
  category,
  savedIds,
  onQueryChange,
  onCategoryChange,
  onSave,
  onOpen,
  onProfile,
}: {
  items: Listing[];
  allItems?: Listing[];
  query: string;
  category: string;
  savedIds: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSave: (id: string) => void;
  onOpen: (item: Listing) => void;
  onProfile: () => void;
}) {
  const sourceItems = allItems.length > 0 ? allItems : items;

  // Calculate count of items per category
  const getItemCount = (catName: string) => {
    if (catName === "All items") return sourceItems.length;
    return sourceItems.filter((i) => i.category === catName).length;
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.name === category);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CAMPUS MARKETPLACE</Text>
          <Text style={styles.heading}>
            Find your next{"\n"}favorite thing.
          </Text>
        </View>
        <Pressable style={styles.avatar} onPress={onProfile}>
          <Text style={styles.avatarText}>?</Text>
        </Pressable>
      </View>
      <View style={styles.search}>
        <Text style={styles.icon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search textbooks, desks, tech..."
          placeholderTextColor="#87918C"
          style={styles.input}
        />
        {query ? (
          <Pressable onPress={() => onQueryChange("")} style={styles.clearSearch}>
            <Text style={styles.clearSearchText}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.section}>
        <View>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.muted}>Filter items by type</Text>
        </View>
        {category !== "All items" && (
          <Pressable onPress={() => onCategoryChange("All items")}>
            <Text style={styles.clearFilterLink}>Show all items</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.name;
          const count = getItemCount(cat.name);
          return (
            <Pressable
              key={cat.name}
              onPress={() => onCategoryChange(cat.name)}
              style={[
                styles.category,
                isActive && styles.activeCategory,
              ]}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.activeText,
                ]}
              >
                {cat.name}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  isActive && styles.activeCountBadge,
                ]}
              >
                <Text
                  style={[
                    styles.countBadgeText,
                    isActive && styles.activeCountBadgeText,
                  ]}
                >
                  {count}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {category !== "All items" && (
        <View style={styles.filterBanner}>
          <Text style={styles.filterBannerText}>
            Showing {selectedCategoryObj?.icon} <Text style={styles.bold}>{category}</Text> ({items.length})
          </Text>
          <Pressable
            style={styles.resetFilterButton}
            onPress={() => onCategoryChange("All items")}
          >
            <Text style={styles.resetFilterText}>Clear Filter ✕</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.resultsTitle}>
          {category === "All items" ? "All Listings" : `${category} Listings`}
        </Text>
        <Text style={styles.seeAll}>{items.length} items</Text>
      </View>

      <FlatList
        data={items}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.empty}>
              {category !== "All items"
                ? `No items available in "${category}" ${query ? `matching "${query}"` : ""}.`
                : `No items match "${query}".`}
            </Text>
            {category !== "All items" && (
              <Pressable
                style={styles.emptyResetBtn}
                onPress={() => onCategoryChange("All items")}
              >
                <Text style={styles.emptyResetBtnText}>View All Categories</Text>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ListingCard
            item={item}
            saved={savedIds.includes(item.id)}
            onSave={() => onSave(item.id)}
            onOpen={() => onOpen(item)}
            onCategorySelect={(cat) => onCategoryChange(cat)}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 110 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 28,
    paddingBottom: 24,
  },
  eyebrow: {
    color: "#65766D",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  heading: {
    color: "#173C34",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D6E5D7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#225347", fontWeight: "800" },
  search: {
    height: 52,
    backgroundColor: "#FFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E6E9E2",
  },
  icon: { color: "#49635A", fontSize: 28, marginRight: 8 },
  input: { flex: 1, color: "#173C34", fontSize: 14 },
  clearSearch: { padding: 4 },
  clearSearchText: { color: "#87918C", fontSize: 14, fontWeight: "bold" },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#173C34",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 2,
  },
  muted: { color: "#87918C", fontSize: 12 },
  clearFilterLink: { color: "#C3535B", fontWeight: "700", fontSize: 12 },
  seeAll: { color: "#23775D", fontWeight: "700", fontSize: 12 },
  categories: { gap: 10, paddingVertical: 6, paddingBottom: 16 },
  category: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#ECEFE9",
    gap: 6,
  },
  activeCategory: { backgroundColor: "#1F5D4C" },
  categoryIcon: { fontSize: 14 },
  categoryText: { color: "#4E5C56", fontSize: 13, fontWeight: "700" },
  activeText: { color: "#FFF" },
  countBadge: {
    backgroundColor: "#DBE1D8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 2,
  },
  activeCountBadge: { backgroundColor: "rgba(255, 255, 255, 0.25)" },
  countBadgeText: { color: "#4E5C56", fontSize: 10, fontWeight: "800" },
  activeCountBadgeText: { color: "#FFF" },
  filterBanner: {
    backgroundColor: "#E8F2ED",
    borderWidth: 1,
    borderColor: "#C5DED2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterBannerText: { color: "#1D5445", fontSize: 13 },
  bold: { fontWeight: "800" },
  resetFilterButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B2D3C4",
  },
  resetFilterText: { color: "#1F5D4C", fontSize: 11, fontWeight: "800" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 4,
  },
  resultsTitle: { color: "#173C34", fontSize: 16, fontWeight: "800" },
  grid: { gap: 14 },
  columns: { gap: 14 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EBECE8",
    marginVertical: 10,
  },
  emptyIcon: { fontSize: 36, marginBottom: 8 },
  emptyTitle: { color: "#173C34", fontSize: 16, fontWeight: "800", marginBottom: 4 },
  empty: { textAlign: "center", color: "#87918C", fontSize: 13 },
  emptyResetBtn: {
    marginTop: 16,
    backgroundColor: "#1F5D4C",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyResetBtnText: { color: "#FFF", fontWeight: "800", fontSize: 12 },
});

