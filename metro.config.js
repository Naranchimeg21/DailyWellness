const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'ts', 'tsx'],
    extraNodeModules: {
      '@': './src',
    },
  },
});
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
