// const { assetExts, sourceExts } = require('metro-config/src/defaults/defaults');
// const exclusionList = require('metro-config/src/defaults/exclusionList');
// const { getDefaultConfig, mergeConfig } = require('metro-config');
//
// const cfg = async () => await getDefaultConfig();
//
// module.exports = mergeConfig(cfg, {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//     blockList: exclusionList([/ios\/build\/.*/]),
//   },
// });

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
