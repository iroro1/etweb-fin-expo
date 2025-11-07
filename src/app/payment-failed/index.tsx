import { useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ArrowLeft,
  CreditCard,
  MessageSquare,
  Phone,
  RefreshCw,
  Shield,
  Wallet,
  Wifi,
  Building,
  XCircle,
} from "lucide-react-native";
import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";

export default function PaymentFailedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ error?: string; orderId?: string }>();
  const { colors } = useTheme();

  const commonIssues = useMemo(
    () => [
      {
        icon: CreditCard,
        title: "Incorrect Card Details",
        description: "Double-check your card number, expiry date, and CVV.",
      },
      {
        icon: Wallet,
        title: "Insufficient Funds",
        description: "Ensure your account has sufficient balance.",
      },
      {
        icon: Shield,
        title: "Bank Security",
        description: "Your bank may have blocked the transaction for security.",
      },
      {
        icon: Wifi,
        title: "Network Issues",
        description: "Check your internet connection and try again.",
      },
    ],
    []
  );

  const alternativeMethods = useMemo(
    () => [
      {
        icon: CreditCard,
        title: "Try a Different Card",
        description: "Use another payment card to complete your order.",
      },
      {
        icon: Phone,
        title: "Mobile Money",
        description: "Switch to a supported mobile money provider.",
      },
      {
        icon: Building,
        title: "Bank Transfer",
        description: "Send the payment via bank transfer or USSD.",
      },
    ],
    []
  );

  const errorMessage =
    params.error ??
    "We couldn't process your payment. This could be due to insufficient funds, incorrect card details, or a temporary issue with the payment system.";

  const orderId = params.orderId;

  const handleRetry = () => {
    if (orderId) {
      router.push(`/checkout?orderId=${orderId}`);
    } else {
      router.push("/cart");
    }
  };

  return (
    <Screen scrollable={false}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 32, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={[styles.iconWrapper, { backgroundColor: "#fee2e2" }]}>
            <XCircle color="#dc2626" size={42} strokeWidth={2.5} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Payment Failed</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{errorMessage}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Common Issues & Solutions
          </Text>
          <View style={styles.gridTwo}>
            {commonIssues.map(({ icon: Icon, title, description }) => (
              <View
                key={title}
                style={[styles.card, { backgroundColor: colors.surfaceSecondary }]}
              >
                <View style={[styles.badge, { backgroundColor: "#fee2e2" }]}>
                  <Icon color="#dc2626" size={20} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                  {description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Alternative Payment Methods
          </Text>
          <View style={styles.gridThree}>
            {alternativeMethods.map(({ icon: Icon, title, description }) => (
              <View
                key={title}
                style={[styles.card, { backgroundColor: colors.surfaceSecondary }]}
              >
                <View style={[styles.badge, { backgroundColor: colors.primary + "20" }]}>
                  <Icon color={colors.primary} size={20} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                  {description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={handleRetry}
            style={[styles.actionPrimary, { backgroundColor: colors.primary }]}
          >
            <RefreshCw color={colors.textInverse} size={18} />
            <Text style={[styles.actionPrimaryLabel, { color: colors.textInverse }]}>
              Try Again
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/support")}
            style={[
              styles.actionSecondary,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <MessageSquare color={colors.text} size={18} />
            <Text style={[styles.actionSecondaryLabel, { color: colors.text }]}>
              Contact Support
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/cart")}
            style={[
              styles.actionSecondary,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <ArrowLeft color={colors.text} size={18} />
            <Text style={[styles.actionSecondaryLabel, { color: colors.text }]}>
              Back to Cart
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
  },
  section: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  gridTwo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridThree: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    flexBasis: "48%",
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
  },
  actionPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    paddingVertical: 14,
  },
  actionPrimaryLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  actionSecondaryLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});


