import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Search,
  ChevronRight,
  Send,
  CheckCircle,
} from "lucide-react-native";
import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQ[] = [
  {
    id: "1",
    question: "How do I track my order?",
    answer:
      "Go to the Orders tab in your profile. Select any order to view its current status and delivery timeline.",
    category: "Orders",
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer:
      "We accept major cards, bank transfers, and mobile money through our secure Paystack gateway.",
    category: "Payment",
  },
  {
    id: "3",
    question: "How long does delivery take?",
    answer:
      "Delivery takes 2-5 business days within Lagos and 3-7 business days across other Nigerian states.",
    category: "Delivery",
  },
  {
    id: "4",
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within one hour of placement. After that, please contact support for help.",
    category: "Orders",
  },
  {
    id: "5",
    question: "How do I return a product?",
    answer:
      "Initiate returns within 7 days of delivery from the order details page using the Return Item action.",
    category: "Returns",
  },
  {
    id: "6",
    question: "Is my payment information secure?",
    answer:
      "Yes. Payments are processed by Paystack which is PCI DSS compliant and uses bank-grade encryption.",
    category: "Payment",
  },
];

const FAQ_CATEGORIES = [
  "All",
  "Orders",
  "Payment",
  "Delivery",
  "Returns",
  "Account",
];

const INITIAL_CONTACT_STATE = {
  name: "",
  email: "",
  subject: "",
  message: "",
  category: "general",
};

export default function SupportScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState(INITIAL_CONTACT_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      const needle = search.trim().toLowerCase();
      if (!needle) {
        return matchesCategory;
      }

      const matchesSearch =
        faq.question.toLowerCase().includes(needle) ||
        faq.answer.toLowerCase().includes(needle);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleLink = useCallback((url: string) => {
    Linking.openURL(url).catch(() => null);
  }, []);

  const handleSubmit = useCallback(async () => {
    const requiredFilled = [contact.name, contact.email, contact.subject, contact.message].every(
      (value) => value.trim().length > 0
    );

    if (!requiredFilled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setContact(INITIAL_CONTACT_STATE);
    }, 3000);
  }, [contact, isSubmitting]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Help &amp; Support</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          We are here to help. Browse common questions or reach out to our support team.
        </Text>
      </View>

      <View style={styles.contactGrid}>
        <View
          style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.primary + "1A" }]}>
            <MessageSquare color={colors.primary} size={28} />
          </View>
          <Text style={[styles.contactTitle, { color: colors.text }]}>Live Chat</Text>
          <Text style={[styles.contactDescription, { color: colors.textSecondary }]}
          >
            Get instant assistance from our marketplace team.
          </Text>
          <Pressable
            onPress={() => handleLink("https://et-marketplace.com/support/chat")}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}
            >
              Start Chat
            </Text>
          </Pressable>
        </View>

        <View
          style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.primary + "1A" }]}>
            <Phone color={colors.primary} size={28} />
          </View>
          <Text style={[styles.contactTitle, { color: colors.text }]}>Phone Support</Text>
          <Text style={[styles.contactDescription, { color: colors.textSecondary }]}
          >
            Call us for immediate order or payment enquiries.
          </Text>
          <Pressable
            onPress={() => handleLink("tel:+2348001234567")}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}
            >
              +234 800 123 4567
            </Text>
          </Pressable>
        </View>

        <View
          style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.primary + "1A" }]}>
            <Mail color={colors.primary} size={28} />
          </View>
          <Text style={[styles.contactTitle, { color: colors.text }]}>Email Support</Text>
          <Text style={[styles.contactDescription, { color: colors.textSecondary }]}
          >
            Send a detailed request and we&apos;ll respond in hours.
          </Text>
          <Pressable
            onPress={() => handleLink("mailto:support@easytrade.com")}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}
            >
              support@easytrade.com
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.supportHours, { backgroundColor: colors.surfaceSecondary, borderColor: colors.borderSecondary }]}
      >
        <View style={styles.supportHeader}>
          <Clock color={colors.primary} size={22} />
          <Text style={[styles.supportTitle, { color: colors.text }]}>Support Hours</Text>
        </View>
        <View style={styles.hoursRow}>
          <View style={styles.hoursColumn}>
            <Text style={[styles.hoursHeading, { color: colors.text }]}>Live Chat &amp; Phone</Text>
            <Text style={[styles.hoursText, { color: colors.textSecondary }]}
            >
              Mon - Fri: 8:00 AM - 8:00 PM
            </Text>
            <Text style={[styles.hoursText, { color: colors.textSecondary }]}
            >
              Saturday: 9:00 AM - 6:00 PM
            </Text>
            <Text style={[styles.hoursText, { color: colors.textSecondary }]}
            >
              Sunday: 10:00 AM - 4:00 PM
            </Text>
          </View>
          <View style={styles.hoursColumn}>
            <Text style={[styles.hoursHeading, { color: colors.text }]}>Email</Text>
            <Text style={[styles.hoursText, { color: colors.textSecondary }]}
            >
              24/7 with 2-4 hour response time
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.faqSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>

        <View style={styles.searchRow}>
          <View style={[styles.searchWrapper, { borderColor: colors.border }]}
          >
            <Search color={colors.textSecondary} size={18} style={styles.searchIcon} />
            <TextInput
              placeholder="Search FAQs..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
        </View>

        <View style={styles.categoryRow}>
          {FAQ_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.border,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: active ? colors.textInverse : colors.text },
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {filteredFaqs.length > 0 ? (
          <View style={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <View
                key={faq.id}
                style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={styles.faqHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary + "1A" }]}
                  >
                    <Text style={[styles.categoryBadgeText, { color: colors.primary }]}
                    >
                      {faq.category}
                    </Text>
                  </View>
                  <ChevronRight color={colors.textSecondary} size={16} />
                </View>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
                <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}
                >
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <HelpCircle color={colors.textSecondary} size={54} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No FAQs found</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Try a different search term or reset your filters.
            </Text>
            <Pressable
              onPress={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}
              >
                Clear Filters
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={[styles.contactSection, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>

        {isSubmitted ? (
          <View style={styles.successState}>
            <CheckCircle color="#16a34a" size={56} />
            <Text style={[styles.successTitle, { color: colors.text }]}>Message sent!</Text>
            <Text style={[styles.successSubtitle, { color: colors.textSecondary }]}
            >
              Thanks for reaching out. Our team will reply within a few hours.
            </Text>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.formRow}>
              <View style={styles.formColumn}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Full Name *</Text>
                <TextInput
                  value={contact.name}
                  onChangeText={(value) => setContact((prev) => ({ ...prev, name: value }))}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                />
              </View>
              <View style={styles.formColumn}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Email Address *</Text>
                <TextInput
                  value={contact.email}
                  onChangeText={(value) => setContact((prev) => ({ ...prev, email: value }))}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                />
              </View>
            </View>

            <View style={styles.formColumn}>
              <Text style={[styles.formLabel, { color: colors.text }]}>Subject *</Text>
              <TextInput
                value={contact.subject}
                onChangeText={(value) => setContact((prev) => ({ ...prev, subject: value }))}
                placeholder="Brief description of your issue"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              />
            </View>

            <View style={styles.formColumn}>
              <Text style={[styles.formLabel, { color: colors.text }]}>Category</Text>
              <TextInput
                value={contact.category}
                onChangeText={(value) => setContact((prev) => ({ ...prev, category: value }))}
                placeholder="general"
                autoCapitalize="none"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              />
            </View>

            <View style={styles.formColumn}>
              <Text style={[styles.formLabel, { color: colors.text }]}>Message *</Text>
              <TextInput
                value={contact.message}
                onChangeText={(value) => setContact((prev) => ({ ...prev, message: value }))}
                placeholder="Please provide detailed information about your request"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, styles.textArea, { color: colors.text, borderColor: colors.border }]}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.submitButton,
                {
                  backgroundColor: colors.primary,
                  opacity: isSubmitting ? 0.6 : pressed ? 0.85 : 1,
                },
              ]}
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator color={colors.textInverse} size="small" />
                  <Text style={[styles.submitButtonText, { color: colors.textInverse }]}
                  >
                    Sending...
                  </Text>
                </>
              ) : (
                <>
                  <Send color={colors.textInverse} size={18} />
                  <Text style={[styles.submitButtonText, { color: colors.textInverse }]}
                  >
                    Send Message
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 340,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 28,
  },
  contactCard: {
    flexBasis: "48%",
    flexGrow: 1,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 12,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  contactDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  supportHours: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
    gap: 20,
  },
  supportHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  hoursRow: {
    flexDirection: "row",
    gap: 32,
    flexWrap: "wrap",
  },
  hoursColumn: {
    flexBasis: "45%",
    flexGrow: 1,
    gap: 6,
  },
  hoursHeading: {
    fontSize: 15,
    fontWeight: "600",
  },
  hoursText: {
    fontSize: 14,
  },
  faqSection: {
    gap: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  searchRow: {
    marginTop: 8,
  },
  searchWrapper: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    gap: 14,
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: 280,
  },
  contactSection: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 20,
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  formColumn: {
    flexBasis: "48%",
    flexGrow: 1,
    gap: 6,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 140,
  },
  submitButton: {
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  successState: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 32,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: 280,
  },
});


