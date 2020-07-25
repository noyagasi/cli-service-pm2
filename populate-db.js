#!/usr/bin/env node

const { fork } = require('child_process');
const { existsSync } = require('fs');
const apps = require('./apps');
const { tenant, scripts } = require('./config');
const flags = require('./flags');
const [ email, password ] = getCredentials(flags);

function getCredentials(flags) {
	return flags.hasOwnProperty("--credentials") ? 
					flags["--credentials"].split(":") :
					[process.env.EMAIL, process.env.PASSWORD];
}

runServicesPopulations();

function runServicesPopulations() {
  console.log('start populate data')
  Promise.all([
    runServicePopulate('content', apps.content.env),
    runServicePopulate('auth', { ...apps.auth.env, TENANT: tenant, EMAIL: email, PASSWORD: password })
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
  const isExists = existsSync(scripts[service]);
  if (!isExists) {
    console.log('script not exist for: ', service);
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const folder = scripts[service].split('/').slice(0, -1).join('/');

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
