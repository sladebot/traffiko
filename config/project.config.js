const path = require('path')
const debug = require('debug')('app:condig:project')
const argv = require('yargs').argv
const ip = require('ip')

debug('Building default config')

const config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_test: 'tests',
  server_host: ip.address(),
  server_port: process.env.PORT || 1337,
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ]
}

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

const pkg = require('../package.json')
config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if(pkg.dependencies[dep]) return true

    debug(`Package "${dep}" was not found in package.json`)
  })

function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
}

debug(`Looking for environment overrides for NODE_ENV "${config.env}"`)
const environments = require('./environments.config')
const overrides = environments[config.env]
if(overrides) {
  debug(`Found overrides, applying to default config`)
  Object.assign(config, overrides(config))
} else {
  debug(`No override found`)
}

module.exports = config