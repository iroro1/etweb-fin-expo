import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import {
  Settings,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  HelpCircle,
  LogOut,
} from "lucide-react-native";

const ACTIONS = [
  {
    icon: ShoppingBag,
    label: "Orders",
    href: "/orders",
    description: "Track and manage your purchases",
  },
  {
    icon: MapPin,
    label: "Addresses",
    href: "/profile/addresses",
    description: "Manage delivery locations",
  },
  {
    icon: Settings,
    label: "Account Settings",
    href: "/profile/settings",
    description: "Profile, preferences, security",
  },
  {
    icon: ShieldCheck,
    label: "Privacy & Security",
    href: "/profile/privacy",
    description: "Protect your data and account",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    href: "/support",
    description: "Contact support or browse FAQs",
  },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <SectionHeader title="Profile" subtitle="Manage your marketplace account" />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
      >
        <Image
          source={{
            uri:
              user?.avatar ??
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email : "Guest"}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email ?? "Sign in to sync your data"}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push(user ? "/profile/settings" : "/auth/signin")}
          style={({ pressed }) => [
            styles.editButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.editButtonText, { color: colors.textInverse }]}>
            {user ? "Edit" : "Sign in"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Pressable
              key={action.label}
              onPress={() => router.push(action.href)}
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSecondary,
                  opacity: pressed ? 0.92 : 1,
                },
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}
              >
                <Icon color={colors.primary} size={18} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>{action.label}</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                  {action.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {user ? (
        <Pressable
          onPress={signOut}
          style={({ pressed }) => [
            styles.signOut,
            {
              borderColor: colors.borderSecondary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <LogOut color={colors.error} size={18} />
          <Text style={[styles.signOutText, { color: colors.error }]}>Sign out</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  userInfo: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
  },
  userEmail: {
    fontSize: 13,
  },
  editButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },
  list: {
    marginTop: 28,
    gap: 16,
  },
  row: {
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  rowSubtitle: {
    fontSize: 13,
  },
  signOut: {
    marginTop: 32,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "700",
  },
});


