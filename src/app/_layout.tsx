import { Stack } from "expo-router";
import { useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { CompareProvider } from "@/contexts/compare-context";
import { queryClient } from "@/lib/query-client";

function Providers({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();

  const statusBarStyle = useMemo(() => (mode === "dark" ? "light" : "dark"), [mode]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={statusBarStyle} animated />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CompareProvider>
          <WishlistProvider>
            <CartProvider>
              <Providers>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: "fade",
                  }}
                />
              </Providers>
            </CartProvider>
          </WishlistProvider>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}


