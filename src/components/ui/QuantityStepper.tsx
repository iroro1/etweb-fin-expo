import { Pressable, StyleSheet, Text, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: QuantityStepperProps) {
  const { colors } = useTheme();

  const decrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const increment = () => {
    if (value >= max) return;
    onChange(value + 1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceSecondary,
          borderColor: colors.borderSecondary,
        },
      ]}
    >
      <Pressable onPress={decrement} style={styles.button}>
        <Minus color={colors.textSecondary} size={16} />
      </Pressable>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Pressable onPress={increment} style={styles.button}>
        <Plus color={colors.textSecondary} size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    minWidth: 24,
    textAlign: "center",
  },
});


