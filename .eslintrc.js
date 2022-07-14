module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 0,
  },
  ignorePatterns: ['e2e/', 'coverage/', 'jest.setup.js'],
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '__tests__/**',
        'e2e/**',
        '**/*.driver.tsx',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
      env: {jest: true},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
