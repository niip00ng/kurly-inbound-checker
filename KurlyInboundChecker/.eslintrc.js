module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['warn'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-unused-styles': 0,
        'react-native/no-unused-bars': 0,
        'react-native/no-inline-styles': 0,
        'react-native/no-shadow': 0,
      },
    },
  ],
};
