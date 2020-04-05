const withSass = require('@zeit/next-sass');

const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase, { defaultConfig = defaultConfig }) => {
  let config = {
    cssModules: false
  };

  if (phase !== PHASE_PRODUCTION_BUILD) {
    // add css, less, sass, and stylus loaders
    config = withSass(config);
  }

  return config;
};
