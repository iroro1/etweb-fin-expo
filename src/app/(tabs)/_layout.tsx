import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/theme-context";
import {
  Home,
  ShoppingBag,
  Wrench,
  ShoppingCart,
  UserRound,
} from "lucide-react-native";

const tabsConfig = {
  "home/index": { label: "Home", Icon: Home },
  "products/index": { label: "Shop", Icon: ShoppingBag },
  "services/index": { label: "Services", Icon: Wrench },
  "cart/index": { label: "Cart", Icon: ShoppingCart },
  "profile/index": { label: "Account", Icon: UserRound },
} as const;

export const unstable_settings = {
  initialRouteName: "home/index",
};

function TabIcon({
  route,
  color,
  focused,
}: {
  route: keyof typeof tabsConfig;
  color: string;
  focused: boolean;
}) {
  const { colors } = useTheme();
  const { label, Icon } = tabsConfig[route];

  return (
    <View
      style={[
        styles.tabBadge,
        focused && { backgroundColor: colors.primary + "20" },
      ]}
    >
      <Icon
        color={focused ? colors.primary : color}
        size={20}
        strokeWidth={focused ? 2.4 : 2}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? colors.primary : colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const focusedColor = colors.primary;
        const unfocusedColor = colors.textSecondary;

        return {
          headerShown: false,
          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64 + insets.bottom,
            paddingTop: 10,
            paddingBottom: Math.max(insets.bottom, 10),
          },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              route={route.name as keyof typeof tabsConfig}
              color={color}
              focused={focused}
            />
          ),
        };
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="products/index"
        options={{ title: "Products" }}
      />
      <Tabs.Screen
        name="services/index"
        options={{ title: "Services" }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{ title: "Cart" }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{ title: "Profile" }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});

