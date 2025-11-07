import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dummyNotifications } from "@/data/dummy-data";
import { useTheme } from "@/contexts/theme-context";

export default function NotificationsScreen() {
  const { colors } = useTheme();

  return (
    <Screen>
      <SectionHeader
        title="Notifications"
        subtitle="Stay on top of orders, messages, and promotions"
      />

      <View style={styles.list}>
        {dummyNotifications.map((notification) => (
          <View
            key={notification.id}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderSecondary }]}
          >
            <Text style={[styles.title, { color: colors.text }]}>{notification.title}</Text>
            <Text style={[styles.body, { color: colors.textSecondary }]}>
              {notification.message}
            </Text>
            <Text style={[styles.timestamp, { color: colors.textTertiary }]}>
              {new Date(notification.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    gap: 14,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  body: {
    fontSize: 13,
  },
  timestamp: {
    fontSize: 12,
  },
});


