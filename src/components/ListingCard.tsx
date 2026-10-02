import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getCategoryIcon } from "../data";
import { Listing } from "../types";

export function ListingCard({
  item,
  saved,
  onSave,
  onOpen,
  onCategorySelect,
}: {
  item: Listing;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  onCategorySelect?: (category: string) => void;
}) {
  const categoryIcon = getCategoryIcon(item.category);

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <View style={styles.photo}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Pressable
          style={styles.categoryBadge}
          onPress={(e) => {
            if (onCategorySelect) {
              e.stopPropagation();
              onCategorySelect(item.category);
            }
          }}
        >
          <Text style={styles.categoryBadgeText}>
            {categoryIcon} {item.category}
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel={saved ? "Remove saved item" : "Save item"}
          style={styles.save}
          onPress={onSave}
        >
          <Text style={[styles.heart, saved && styles.red]}>
            {saved ? "♥" : "♡"}
          </Text>
        </Pressable>
        {item.status === "sold" && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldBadgeText}>SOLD</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <Text style={styles.muted}>
          {item.condition} · {item.campus}
        </Text>
        <Text style={styles.tiny}>Listed by {item.seller}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E9ECE6",
  },
  photo: { height: 148, backgroundColor: "#E5ECE5" },
  image: { width: "100%", height: "100%" },
  categoryBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(23, 60, 52, 0.85)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
  save: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  soldBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#C3535B",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  soldBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heart: { color: "#365B4C", fontSize: 21 },
  red: { color: "#C3535B" },
  body: { padding: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 5 },
  title: {
    flex: 1,
    minHeight: 34,
    color: "#1B3A33",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  price: { color: "#1C7057", fontSize: 14, fontWeight: "800" },
  muted: { color: "#87918C", fontSize: 12 },
  tiny: { color: "#A0AAA4", fontSize: 10, marginTop: 5 },
});

