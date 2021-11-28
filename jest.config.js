export default {
    preset: "vite-jest",
    testMatch: [
      "<rootDir>/src/tests/**/*.{ts,tsx}"
    ],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      "\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    collectCoverage: true
  };