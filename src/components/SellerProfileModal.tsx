import { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCategoryIcon } from "../data";
import { Listing, SellerProfile } from "../types";

export function SellerProfileModal({
  visible,
  seller,
  listings = [],
  onClose,
  onSelectListing,
  onContactSeller,
}: {
  visible: boolean;
  seller: SellerProfile | null;
  listings: Listing[];
  onClose: () => void;
  onSelectListing: (listing: Listing) => void;
  onContactSeller: (seller: SellerProfile) => void;
}) {
  const [filter, setFilter] = useState<"all" | "active" | "sold">("all");

  const sellerListings = useMemo(() => {
    if (!seller) return [];
    return listings.filter(
      (item) =>
        item.sellerId === seller.id ||
        item.seller.toLowerCase() === seller.name.toLowerCase() ||
        (seller.email && item.seller === seller.email),
    );
  }, [seller, listings]);

  const activeListings = useMemo(
    () => sellerListings.filter((item) => item.status !== "sold"),
    [sellerListings],
  );

  const soldListings = useMemo(
    () => sellerListings.filter((item) => item.status === "sold"),
    [sellerListings],
  );

  const displayedListings = useMemo(() => {
    if (filter === "active") return activeListings;
    if (filter === "sold") return soldListings;
    return sellerListings;
  }, [filter, activeListings, soldListings, sellerListings]);

  if (!seller) return null;

  const initials = seller.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerEyebrow}>CAMPUS SELLER</Text>
              <Text style={styles.headerTitle}>Seller Profile</Text>
            </View>
            <Pressable
              accessibilityLabel="Close seller profile"
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Seller Hero Card */}
            <View style={styles.heroCard}>
              <View style={styles.avatarWrapper}>
                {seller.photoURL ? (
                  <Image
                    source={{ uri: seller.photoURL }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarInitials}>
                    <Text style={styles.initialsText}>{initials}</Text>
                  </View>
                )}
                {seller.verifiedStudent && (
                  <View style={styles.verifiedBadgeIcon}>
                    <Text style={styles.verifiedCheck}>✓</Text>
                  </View>
                )}
              </View>

              <Text style={styles.sellerName}>{seller.name}</Text>

              {seller.verifiedStudent && (
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedPillText}>
                    🎓 Verified Campus Student
                  </Text>
                </View>
              )}

              <Text style={styles.sellerMeta}>
                {seller.major ? `${seller.major} · ` : ""}
                {seller.gradYear ? `${seller.gradYear} · ` : ""}
                {seller.campus}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingScore}>{seller.rating.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>
                  ({seller.reviewCount} {seller.reviewCount === 1 ? "review" : "reviews"})
                </Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.joinedText}>Joined {seller.joinedDate}</Text>
              </View>

              {/* Message Seller Main CTA */}
              <Pressable
                style={styles.messageButton}
                onPress={() => onContactSeller(seller)}
              >
                <Text style={styles.messageButtonIcon}>💬</Text>
                <Text style={styles.messageButtonText}>
                  Message {seller.name.split(" ")[0]}
                </Text>
              </Pressable>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📦</Text>
                <Text style={styles.statValue}>
                  {soldListings.length > 0
                    ? soldListings.length
                    : Math.max(3, seller.reviewCount - 1)}
                </Text>
                <Text style={styles.statLabel}>Items Sold</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statIcon}>🏷️</Text>
                <Text style={styles.statValue}>{activeListings.length}</Text>
                <Text style={styles.statLabel}>Active Items</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statIcon}>⚡</Text>
                <Text style={styles.statValue}>Fast</Text>
                <Text style={styles.statLabel}>Response</Text>
              </View>
            </View>

            {/* Bio Section */}
            {seller.bio ? (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>About the Seller</Text>
                <Text style={styles.bioText}>{seller.bio}</Text>
                {seller.responseTime ? (
                  <View style={styles.responseRow}>
                    <Text style={styles.responseNote}>
                      {seller.responseTime}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Meetup Preferences */}
            {seller.meetupLocations && seller.meetupLocations.length > 0 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>
                  📍 Preferred Meetup Locations
                </Text>
                <Text style={styles.subtext}>
                  Safe, public student locations agreed for exchanges:
                </Text>
                <View style={styles.locationPills}>
                  {seller.meetupLocations.map((loc, idx) => (
                    <View key={idx} style={styles.locationPill}>
                      <Text style={styles.locationPillText}>📍 {loc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Listings Section */}
            <View style={styles.sectionCard}>
              <View style={styles.listingsHeader}>
                <View>
                  <Text style={styles.sectionHeading}>
                    Listings by {seller.name}
                  </Text>
                  <Text style={styles.subtext}>
                    {sellerListings.length}{" "}
                    {sellerListings.length === 1 ? "item total" : "items total"}
                  </Text>
                </View>

                {/* Filter Tabs */}
                <View style={styles.filterTabs}>
                  <Pressable
                    style={[
                      styles.filterTab,
                      filter === "all" && styles.filterTabActive,
                    ]}
                    onPress={() => setFilter("all")}
                  >
                    <Text
                      style={[
                        styles.filterTabText,
                        filter === "all" && styles.filterTabTextActive,
                      ]}
                    >
                      All ({sellerListings.length})
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.filterTab,
                      filter === "active" && styles.filterTabActive,
                    ]}
                    onPress={() => setFilter("active")}
                  >
                    <Text
                      style={[
                        styles.filterTabText,
                        filter === "active" && styles.filterTabTextActive,
                      ]}
                    >
                      Active ({activeListings.length})
                    </Text>
                  </Pressable>

                  {soldListings.length > 0 && (
                    <Pressable
                      style={[
                        styles.filterTab,
                        filter === "sold" && styles.filterTabActive,
                      ]}
                      onPress={() => setFilter("sold")}
                    >
                      <Text
                        style={[
                          styles.filterTabText,
                          filter === "sold" && styles.filterTabTextActive,
                        ]}
                      >
                        Sold ({soldListings.length})
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>

              {displayedListings.length === 0 ? (
                <View style={styles.emptyListings}>
                  <Text style={styles.emptyListingsIcon}>🛍️</Text>
                  <Text style={styles.emptyListingsText}>
                    No {filter} items right now.
                  </Text>
                </View>
              ) : (
                <View style={styles.listingsGrid}>
                  {displayedListings.map((item) => (
                    <Pressable
                      key={item.id}
                      style={styles.itemCard}
                      onPress={() => {
                        onClose();
                        onSelectListing(item);
                      }}
                    >
                      <View style={styles.itemImageWrapper}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.itemImage}
                        />
                        <View style={styles.itemCategoryBadge}>
                          <Text style={styles.itemCategoryText}>
                            {getCategoryIcon(item.category)} {item.category}
                          </Text>
                        </View>
                        {item.status === "sold" && (
                          <View style={styles.itemSoldBadge}>
                            <Text style={styles.itemSoldBadgeText}>SOLD</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.itemBody}>
                        <Text style={styles.itemTitle} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <View style={styles.itemPriceRow}>
                          <Text style={styles.itemPrice}>${item.price}</Text>
                          <Text style={styles.itemCondition}>
                            {item.condition}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Student Reviews Section */}
            {seller.reviews && seller.reviews.length > 0 && (
              <View style={styles.sectionCard}>
                <View style={styles.reviewsHeader}>
                  <Text style={styles.sectionHeading}>
                    Verified Campus Reviews
                  </Text>
                  <View style={styles.reviewBadge}>
                    <Text style={styles.reviewBadgeText}>
                      ★ {seller.rating.toFixed(1)} / 5.0
                    </Text>
                  </View>
                </View>

                {seller.reviews.map((rev) => (
                  <View key={rev.id} style={styles.reviewItem}>
                    <View style={styles.reviewTopRow}>
                      <View style={styles.reviewerInfo}>
                        <View style={styles.reviewerAvatar}>
                          <Text style={styles.reviewerAvatarText}>
                            {rev.author[0]}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.reviewerName}>{rev.author}</Text>
                          <Text style={styles.reviewDate}>{rev.date}</Text>
                        </View>
                      </View>
                      <View style={styles.starsWrapper}>
                        <Text style={styles.reviewStars}>
                          {"★".repeat(Math.round(rev.rating))}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{rev.comment}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 40, 33, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#F7F9F6",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "92%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEFEA",
  },
  headerLeft: {
    flex: 1,
  },
  headerEyebrow: {
    color: "#2E7D63",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: "#173C34",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F4EF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: "#173C34",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5ECE5",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: "#23775D",
  },
  avatarInitials: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#D6E5D7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#23775D",
  },
  initialsText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E5848",
  },
  verifiedBadgeIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#1F7A59",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  verifiedCheck: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "900",
  },
  sellerName: {
    fontSize: 23,
    fontWeight: "800",
    color: "#173C34",
    marginBottom: 4,
  },
  verifiedPill: {
    backgroundColor: "#E6F3EC",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedPillText: {
    color: "#1E684E",
    fontSize: 12,
    fontWeight: "800",
  },
  sellerMeta: {
    color: "#5B6A63",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 18,
  },
  star: {
    color: "#E59819",
    fontSize: 16,
  },
  ratingScore: {
    color: "#173C34",
    fontSize: 14,
    fontWeight: "800",
  },
  ratingCount: {
    color: "#6D7B74",
    fontSize: 13,
  },
  dotSeparator: {
    color: "#CBD5CE",
    fontSize: 14,
    marginHorizontal: 4,
  },
  joinedText: {
    color: "#7E8C85",
    fontSize: 12,
  },
  messageButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#1F5D4C",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  messageButtonIcon: {
    fontSize: 16,
  },
  messageButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5ECE5",
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "800",
    color: "#173C34",
  },
  statLabel: {
    fontSize: 11,
    color: "#74837B",
    marginTop: 2,
    fontWeight: "600",
  },
  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5ECE5",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#173C34",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 12,
    color: "#788780",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#3F4F47",
    marginTop: 4,
  },
  responseRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEF3EE",
  },
  responseNote: {
    fontSize: 12,
    color: "#1F7A59",
    fontWeight: "700",
  },
  locationPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  locationPill: {
    backgroundColor: "#F0F5F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4E2D8",
  },
  locationPillText: {
    color: "#1F5D4C",
    fontSize: 12,
    fontWeight: "700",
  },
  listingsHeader: {
    marginBottom: 14,
  },
  filterTabs: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#EEF2EC",
  },
  filterTabActive: {
    backgroundColor: "#1F5D4C",
  },
  filterTabText: {
    fontSize: 12,
    color: "#4A5852",
    fontWeight: "700",
  },
  filterTabTextActive: {
    color: "#FFF",
  },
  emptyListings: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyListingsIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  emptyListingsText: {
    fontSize: 13,
    color: "#83928A",
  },
  listingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  itemCard: {
    width: "48%",
    backgroundColor: "#FBFDFB",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5ECE5",
    overflow: "hidden",
  },
  itemImageWrapper: {
    height: 110,
    position: "relative",
    backgroundColor: "#E4EDE4",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemCategoryBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgba(23, 60, 52, 0.85)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  itemCategoryText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "700",
  },
  itemSoldBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "#C3535B",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemSoldBadgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "800",
  },
  itemBody: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1B3A33",
    lineHeight: 16,
    minHeight: 32,
  },
  itemPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1C7057",
  },
  itemCondition: {
    fontSize: 10,
    color: "#85948C",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  reviewBadge: {
    backgroundColor: "#FFF8E7",
    borderWidth: 1,
    borderColor: "#F0DFAD",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  reviewBadgeText: {
    color: "#9A680C",
    fontSize: 12,
    fontWeight: "800",
  },
  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3EE",
  },
  reviewTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D9E8DD",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewerAvatarText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E5848",
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#173C34",
  },
  reviewDate: {
    fontSize: 10,
    color: "#85948C",
  },
  starsWrapper: {
    flexDirection: "row",
  },
  reviewStars: {
    color: "#E59819",
    fontSize: 12,
    letterSpacing: 1,
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 18,
    color: "#46554D",
  },
});
