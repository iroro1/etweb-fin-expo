import { Platform } from "react-native";

export const colors = {
  light: {
    primary: "#007AFF",
    primaryDark: "#0056CC",
    primaryLight: "#4DA3FF",
    secondary: "#5856D6",
    secondaryDark: "#3634A3",
    secondaryLight: "#7A79E0",
    background: "#FFFFFF",
    backgroundSecondary: "#F2F2F7",
    backgroundTertiary: "#E5E5EA",
    surface: "#FFFFFF",
    surfaceSecondary: "#F9F9F9",
    surfaceTertiary: "#F2F2F7",
    text: "#0F172A",
    textSecondary: "#475569",
    textTertiary: "#94A3B8",
    textInverse: "#FFFFFF",
    border: "#CBD5F5",
    borderSecondary: "#E2E8F0",
    borderTertiary: "#F8FAFC",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    info: "#007AFF",
    sale: "#FF3B30",
    featured: "#FF9500",
    rating: "#FACC15",
    overlay: "rgba(15, 23, 42, 0.5)",
    overlayLight: "rgba(15, 23, 42, 0.1)",
    shadow: "rgba(15, 23, 42, 0.08)",
    shadowDark: "rgba(15, 23, 42, 0.2)",
  },
  dark: {
    primary: "#0A84FF",
    primaryDark: "#0056CC",
    primaryLight: "#4DA3FF",
    secondary: "#5E5CE6",
    secondaryDark: "#3634A3",
    secondaryLight: "#7A79E0",
    background: "#0A1428",
    backgroundSecondary: "#131C2E",
    backgroundTertiary: "#1E2740",
    surface: "#131C2E",
    surfaceSecondary: "#1E2740",
    surfaceTertiary: "#293351",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    textTertiary: "#64748B",
    textInverse: "#0A1428",
    border: "#1E293B",
    borderSecondary: "#334155",
    borderTertiary: "#475569",
    success: "#30D158",
    warning: "#FF9F0A",
    error: "#FF453A",
    info: "#0A84FF",
    sale: "#FF453A",
    featured: "#FF9F0A",
    rating: "#FACC15",
    overlay: "rgba(8, 47, 73, 0.7)",
    overlayLight: "rgba(15, 23, 42, 0.3)",
    shadow: "rgba(8, 47, 73, 0.4)",
    shadowDark: "rgba(8, 47, 73, 0.6)",
  },
};

export type ColorSchemeName = keyof typeof colors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  full: 999,
};

export const typography = {
  family: {
    regular: Platform.select({ ios: "SFProText-Regular", default: "System" }),
    medium: Platform.select({ ios: "SFProText-Medium", default: "System" }),
    semibold: Platform.select({ ios: "SFProText-Semibold", default: "System" }),
    bold: Platform.select({ ios: "SFProText-Bold", default: "System" }),
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
  },
};

export const shadows = {
  card: {
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  modal: {
    shadowColor: colors.light.shadowDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const tokens = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
};

export type Tokens = typeof tokens;


