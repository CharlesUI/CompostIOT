const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });

//changes for react reanimated
// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const {
//   wrapWithReanimatedMetroConfig,
// } = require("react-native-reanimated/metro-config");

// const config = getDefaultConfig(__dirname);

// const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

// // Wrap the configuration with React Reanimated's wrapper
// module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
