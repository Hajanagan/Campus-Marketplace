import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { User } from "firebase/auth";
import { PageTitle } from "../components/PageTitle";

export function ProfilePage({
  user,
  savedCount,
  listingCount,
  firebaseConfigured,
  profileReady,
  error,
  onMyListings,
  onSaved,
  onSignIn,
  onSignOut,
}: {
  user: User | null;
  savedCount: number;
  listingCount: number;
  firebaseConfigured: boolean;
  profileReady: boolean;
  error: string;
  onMyListings: () => void;
  onSaved: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}) {
  const name =
    user?.displayName || user?.email?.split("@")[0] || "Campus guest";

  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageTitle
        title="My Profile"
        subtitle="Your campus marketplace account"
      />

      {/* Seller profile card */}
      <View style={styles.hero}>
        <View style={styles.avatarWrapper}>
          {user?.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.initials}>
                {user ? initials : "?"}
              </Text>
            </View>
          )}

          {user ? (
            <View style={styles.onlineBadge}>
              <Text style={styles.onlineBadgeText}>✓</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.email}>
          {user?.email || "Sign in to sell and message"}
        </Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            {user ? "CAMPUS MEMBER" : "GUEST ACCOUNT"}
          </Text>
        </View>

        <Text style={styles.heroDescription}>
          {user
            ? "Manage your listings and saved items in one place."
            : "Sign in to manage your campus marketplace account."}
        </Text>
      </View>

      {/* Activity statistics */}
      <Text style={styles.sectionTitle}>YOUR ACTIVITY</Text>

      <View style={styles.statsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.statCard,
            pressed && styles.pressed,
          ]}
          onPress={onMyListings}
          accessibilityRole="button"
        >
          <View style={styles.statIcon}>
            <Text style={styles.statIconText}>▤</Text>
          </View>

          <Text style={styles.statNumber}>{listingCount}</Text>
          <Text style={styles.statLabel}>My Listings</Text>
          <Text style={styles.statHint}>View your items →</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.statCard,
            pressed && styles.pressed,
          ]}
          onPress={onSaved}
          accessibilityRole="button"
        >
          <View style={styles.savedIcon}>
            <Text style={styles.statIconText}>♡</Text>
          </View>

          <Text style={styles.statNumber}>{savedCount}</Text>
          <Text style={styles.statLabel}>Saved Items</Text>
          <Text style={styles.statHint}>View favourites →</Text>
        </Pressable>
      </View>

      {/* Account preferences */}
      <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>

      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>⌖</Text>
          </View>

          <View style={styles.menuDetails}>
            <Text style={styles.menuTitle}>Meetup Preferences</Text>
            <Text style={styles.menuSubtitle}>
              Preferred campus meeting location
            </Text>
          </View>

          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>North Campus</Text>
          </View>
        </View>

        <View style={styles.menuDivider} />

        <View style={styles.menuRow}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>◎</Text>
          </View>

          <View style={styles.menuDetails}>
            <Text style={styles.menuTitle}>Account Status</Text>
            <Text style={styles.menuSubtitle}>
              {user ? "Signed in" : "Not signed in"}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              user ? styles.statusActive : styles.statusGuest,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                !user && styles.statusGuestText,
              ]}
            >
              {user ? "Active" : "Guest"}
            </Text>
          </View>
        </View>
      </View>

      {/* Feedback and Firebase status */}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {user && profileReady ? (
        <Text style={styles.success}>
          ✓ Profile saved to Firebase
        </Text>
      ) : null}

      {user ? (
        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.pressed,
          ]}
          onPress={onSignOut}
          accessibilityRole="button"
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.signInButton,
            pressed && styles.pressed,
          ]}
          onPress={onSignIn}
          accessibilityRole="button"
        >
          <Text style={styles.signInText}>Sign In to Continue →</Text>
        </Pressable>
      )}

      <View style={styles.connection}>
        <View
          style={[
            styles.connectionDot,
            !firebaseConfigured && styles.connectionDotOffline,
          ]}
        />

        <Text style={styles.connectionText}>
          {firebaseConfigured
            ? "Connected to Firebase"
            : "Demo Mode · Firebase not configured"}
        </Text>
      </View>

      <Text style={styles.footer}>
        CAMPUS MARKETPLACE · YOUR CAMPUS, YOUR COMMUNITY
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F8F5",
  },
  content: {
    padding: 20,
    paddingBottom: 110,
  },
  hero: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E8EEE8",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 3,
    borderColor: "#D8E9DD",
  },
  avatarFallback: {
    backgroundColor: "#DCECE0",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 28,
    color: "#205B45",
    fontWeight: "800",
  },
  onlineBadge: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#267A53",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  name: {
    color: "#183F32",
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },
  email: {
    color: "#7C8981",
    fontSize: 13,
    marginTop: 7,
    textAlign: "center",
  },
  roleBadge: {
    backgroundColor: "#E8F4EB",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 14,
  },
  roleBadgeText: {
    color: "#276344",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heroDescription: {
    color: "#78877D",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 15,
    maxWidth: 270,
  },
  sectionTitle: {
    color: "#536B5B",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginTop: 27,
    marginBottom: 13,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 14,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E7EDE7",
    padding: 16,
  },
  pressed: {
    opacity: 0.75,
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#E6F2E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  savedIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FBE9E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  statIconText: {
    fontSize: 23,
    color: "#286247",
    fontWeight: "700",
  },
  statNumber: {
    color: "#183F32",
    fontSize: 28,
    fontWeight: "800",
  },
  statLabel: {
    color: "#334E3E",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },
  statHint: {
    color: "#718779",
    fontSize: 10,
    marginTop: 11,
  },
  menu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EDE7",
    paddingHorizontal: 16,
  },
  menuRow: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 13,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF4EF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconText: {
    color: "#286247",
    fontSize: 23,
    fontWeight: "700",
  },
  menuDetails: {
    flex: 1,
  },
  menuTitle: {
    color: "#294838",
    fontSize: 12,
    fontWeight: "800",
  },
  menuSubtitle: {
    color: "#849087",
    fontSize: 10,
    marginTop: 5,
  },
  locationBadge: {
    backgroundColor: "#F0F5F0",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  locationText: {
    color: "#42634D",
    fontSize: 9,
    fontWeight: "700",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#EDF1ED",
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusActive: {
    backgroundColor: "#E5F4E9",
  },
  statusGuest: {
    backgroundColor: "#F1F2F0",
  },
  statusText: {
    color: "#28734A",
    fontSize: 10,
    fontWeight: "800",
  },
  statusGuestText: {
    color: "#727B74",
  },
  signInButton: {
    minHeight: 52,
    backgroundColor: "#205B45",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  signOutButton: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8E5DB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signOutText: {
    color: "#B64A4A",
    fontSize: 14,
    fontWeight: "800",
  },
  success: {
    color: "#28734A",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 15,
  },
  error: {
    color: "#B64950",
    backgroundColor: "#FBECEE",
    borderRadius: 10,
    padding: 12,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
  connection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    marginTop: 22,
  },
  connectionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2E9B62",
  },
  connectionDotOffline: {
    backgroundColor: "#D39A43",
  },
  connectionText: {
    color: "#829087",
    fontSize: 11,
  },
  footer: {
    color: "#A1ABA3",
    fontSize: 9,
    textAlign: "center",
    letterSpacing: 0.7,
    marginTop: 18,
  },
});