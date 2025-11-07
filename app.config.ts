import type { ExpoConfig } from "expo/config";
import "dotenv/config";

const name = process.env.EXPO_APP_NAME ?? "ET Marketplace";
const slug = process.env.EXPO_APP_SLUG ?? "etweb-fin-expo";

const config: ExpoConfig = {
  name,
  slug,
  version: "1.0.0",
  orientation: "portrait",
  scheme: "etmarketplace",
  userInterfaceStyle: "automatic",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0F172A"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: process.env.EXPO_IOS_BUNDLE_IDENTIFIER ?? "com.et.marketplace"
  },
  android: {
    package: process.env.EXPO_ANDROID_PACKAGE ?? "com.et.marketplace",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0F172A"
    }
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/favicon.png"
  },
  plugins: [
    ["expo-router", { origin: "https://etmarketplace.app" }],
    [
      "expo-notifications",
      {
        icon: "./assets/notification-icon.png",
        color: "#2563EB"
      }
    ],
    "expo-secure-store"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    eas: {
      projectId:
        process.env.EAS_PROJECT_ID ?? "dfb1cd57-e38f-4b13-a907-3357d3fc6fb5",
    }
  },
  platforms: ["ios", "android", "web"],
  updates: {
    url: process.env.EAS_UPDATE_URL,
    fallbackToCacheTimeout: 0
  }
};

export default config;

