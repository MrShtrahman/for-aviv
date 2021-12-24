export default {
    testMatch: [
      "<rootDir>/src/tests/**/*.{ts,tsx}"
    ],
    moduleNameMapper: {
      "\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    collectCoverage: true,
    moduleDirectories: ['node_modules', 'src']
  };