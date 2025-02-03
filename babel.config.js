module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Jika menggunakan Expo
    plugins: ['react-native-reanimated/plugin'],
  };
};
