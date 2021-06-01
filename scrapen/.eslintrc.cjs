module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "no-await-in-loop": 0,
    "import/extensions": 0,
    "no-plusplus": 0,
    "import/no-unresolved": 0,
  },
};
