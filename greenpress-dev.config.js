const apps = require('./apps');

module.exports = {
  apps: [
    apps.db,
    apps.auth,
    apps.secrets,
    apps.content,
    apps.assets,
    apps.admin,
    apps.front
  ]
};
