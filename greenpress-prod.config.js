const { excludedServices } = require('./config');
const apps = require('./apps');

module.exports = {
  apps: [
    apps.auth,
    apps.secrets,
    apps.content,
    apps.assets,
    apps.front,
    apps.admin
  ].filter(({ name }) => !excludedServices.includes(name)),
};
