module.exports = {
  extends: [
    '../.eslintrc.base.js', // Path to your base configuration
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
};
