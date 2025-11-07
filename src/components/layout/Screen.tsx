import { type PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/theme-context";

interface ScreenProps {
  scrollable?: boolean;
  contentContainerStyle?: object;
}

export function Screen({
  children,
  scrollable = true,
  contentContainerStyle,
}: PropsWithChildren<ScreenProps>) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.root, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
          contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[styles.root, styles.content, { backgroundColor: colors.background }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});


