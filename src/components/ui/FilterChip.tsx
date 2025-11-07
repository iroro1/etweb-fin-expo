import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/contexts/theme-context";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, active = false, onPress }: FilterChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: active ? colors.primary : colors.surfaceSecondary,
          borderColor: active ? colors.primary : colors.borderSecondary,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: active ? colors.textInverse : colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
});


