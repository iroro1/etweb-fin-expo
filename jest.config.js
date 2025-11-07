module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

