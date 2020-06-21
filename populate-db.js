const { fork } = require('child_process');
const { fileExistsSync } = require('fs');
const apps = require('./apps');
const { tenant, scripts } = require('./config');

runServicesPopulations();

function runServicesPopulations() {
  console.log('start populate data')
  Promise.all([
    runServicePopulate('content', apps.content.env),
    runServicePopulate('auth', { ...apps.auth.env, TENANT: tenant })
  ]).then(() => {
    console.log('init data completed successfully!')
    process.exit(0)
  }, () => {
    console.log('init data failed!')
    process.exit(1)
  })
}

function runServicePopulate(service, env) {
  console.log('run', service)
  const isExists = fileExistsSync(scripts[service]);
  if (!isExists) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const folder = scripts[service].split('/').splice(-1, 1).join('/');

    const f = fork(folder + '/helpers/init.js', null, { env })

    f.on('close', () => {
      console.log(service, 'close')
      resolve()
    })
    f.on('error', () => {
      console.log(service, 'error')
      reject()
    })
  })

}
