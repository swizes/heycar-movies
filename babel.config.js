module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '@': './src',
            },
          },
        ],
        'react-native-reanimated/plugin',
      ],
    },
    production: {
      plugins: [
        'transform-remove-console',
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '@': './src',
            },
          },
        ],
        'react-native-reanimated/plugin',
      ],
    },
  },
};
