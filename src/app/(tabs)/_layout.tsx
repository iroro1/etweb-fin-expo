import { Tabs } from "expo-router";
import { useTheme } from "@/contexts/theme-context";
import {
  Home,
  ShoppingBag,
  Blocks,
  ShoppingCart,
  UserRound,
} from "lucide-react-native";

const icons = {
  home: Home,
  products: ShoppingBag,
  services: Blocks,
  cart: ShoppingCart,
  profile: UserRound,
} as const;

export const unstable_settings = {
  initialRouteName: "home/index",
};

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const focusedColor = colors.primary;
        const unfocusedColor = colors.textSecondary;
        const IconComponent = icons[route.name as keyof typeof icons] ?? Home;

        return {
          headerShown: false,
          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => (
            <IconComponent color={color} size={size ?? 24} strokeWidth={2} />
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


