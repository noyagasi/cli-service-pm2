const baseConfig = require('./base-config')
const { join } = require('path')
const { existsSync } = require('fs')
const extendConfigPath = join(__dirname, '../../../greenpress.config.js');
const extendConfig = existsSync(extendConfigPath) ? require(extendConfigPath) : { exists: false };

const config = typeof extendConfig === 'function' ? extendConfig(baseConfig) : {
  ...baseConfig,
  ...extendConfig,
  scripts: {
    ...baseConfig.scripts,
    ...extendConfig.scripts,
  }
}

module.exports = config
