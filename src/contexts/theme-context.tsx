import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, type ColorSchemeName } from "@/styles/tokens";

type ThemeMode = ColorSchemeName;

interface ThemeContextValue {
  mode: ThemeMode;
  colors: (typeof colors)[ThemeMode];
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "et-marketplace-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = Appearance.getColorScheme() ?? "light";
  const [mode, setMode] = useState<ThemeMode>(colorScheme);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value === "light" || value === "dark") {
          setMode(value);
        }
      })
      .catch(() => {
        setMode(colorScheme);
      });
  }, [colorScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: colors[mode],
      toggleTheme: () => {
        setMode((current) => {
          const next = current === "light" ? "dark" : "light";
          AsyncStorage.setItem(STORAGE_KEY, next).catch(() => null);
          return next;
        });
      },
      setTheme: (nextMode) => {
        setMode(nextMode);
        AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => null);
      },
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return ctx;
}


