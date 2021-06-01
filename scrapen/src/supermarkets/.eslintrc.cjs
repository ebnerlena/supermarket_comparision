module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 1,
    'import/no-extraneous-dependencies': 0,
    'no-await-in-loop': 0,
    'import/extensions': 0,
    'no-plusplus': 0,
    'import/no-unresolved': 0,
  },
};
