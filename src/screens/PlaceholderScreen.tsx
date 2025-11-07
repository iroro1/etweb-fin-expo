import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { useTheme } from "@/contexts/theme-context";

interface PlaceholderScreenProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PlaceholderScreen({ title, description, action }: PlaceholderScreenProps) {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
        {action}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    width: "80%",
  },
});


