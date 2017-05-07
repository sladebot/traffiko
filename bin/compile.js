const fs = require('fs-extra'),
  webpack = require('webpack'),
  debug = require('debug')('app:bin:compile'),
  webpackConfig = require('../config/webpack.config'),
  project = require('../config/project.config')


const webpackCompiler = (webpackConfig) => 
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    
    compiler.run((err, stats) => {
      if(err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack compile finished.')
      debug(stats.toString(project.compiler_stats))

      if(jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if(jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings found')
      }
      resolve(jsonStats)
    })
  })

  const compile = () => {
    debug('Starting compiler')
    return Promise.resolve()
      .then(() => webpackCompiler(webpackConfig))
      .then(stats => {
        if (stats.warnings.length && project.compiler_fail_on_warning) {
          throw new Error('Config set to fail on warning, exiting with status code "1')
        }
        debug('Copying static assets to dist folder')
        fs.copySync(project.path_base.public(), project.path_base.dist())
      })
      .then(() => {
        debug('Compilation completed successfully')
      })
      .catch(err => {
        debug('Compilation encountered an error.', err)
        process.exit(1)
      })
  }

  compile()