module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      //require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        extensions: [
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.ios.ts',
          '.android.ts',
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
