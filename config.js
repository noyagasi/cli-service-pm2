const baseConfig = require('./base-config');
const projectConfigPath = '../../../greenpress.config.js';
const extendConfig = require('fs').existsSync(projectConfigPath) ? require(projectConfigPath) : {};

const config = typeof extendConfig === 'function' ? extendConfig(baseConfig) : {
  ...baseConfig,
  ...extendConfig,
  scripts: {
    ...baseConfig.scripts,
    ...extendConfig.scripts,
  }
};

module.exports = config;
