import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { Search, X } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";

interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

export function SearchInput({ onClear, ...props }: SearchInputProps) {
  const { colors } = useTheme();
  const [value, setValue] = useState(props.value?.toString() ?? "");

  const handleChange = (text: string) => {
    setValue(text);
    props.onChangeText?.(text);
  };

  const clear = () => {
    setValue("");
    onClear?.();
    props.onChangeText?.("");
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
      <Search color={colors.textSecondary} size={18} />
      <TextInput
        {...props}
        value={value}
        onChangeText={handleChange}
        placeholderTextColor={colors.textTertiary}
        style={[styles.input, { color: colors.text }]}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length ? (
        <Pressable onPress={clear} style={styles.iconButton}>
          <X color={colors.textSecondary} size={16} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  iconButton: {
    padding: 4,
  },
});


