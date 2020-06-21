const apps = require('./apps');

module.exports = {
  apps: [
    apps.db,
    apps.auth,
    apps.secrets,
    apps.content,
    apps.assets,
    {
      ...apps.admin,
      script: 'cd admin && npm run serve',
    },
    {
      ...apps.front,
      script: 'cd blog-front && npm run dev'
    }
  ]
};
