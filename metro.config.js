const { exec } = require('child_process');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Automatically maintain ADB reverse for port 8000 (Backend API) & 8081 (Metro)
function ensureAdbReverse() {
  try {
    exec('adb reverse tcp:8000 tcp:8000 && adb reverse tcp:8081 tcp:8081', () => {});
  } catch (e) {}
}

ensureAdbReverse();
setInterval(ensureAdbReverse, 10000); // Keep alive every 10s even if USB reconnected

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native-metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
