const {
  getTrackunitTailwindConfig,
} = require('@trackunit/iris-app-build-utilities');

module.exports = {
  ...getTrackunitTailwindConfig({ appDir: __dirname }),
  // your custom stuff here
};
