module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@model': './src/model',
          '@modules': './src/modules',
          '@pages': './src/pages',
          '@api': './src/api',
          '@storage': './src/storage',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
