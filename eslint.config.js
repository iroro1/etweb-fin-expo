import defaultConfig from "@react-native/eslint-config";

export default [
  ...defaultConfig,
  {
    ignores: ["dist", "build"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    }
  }
];

