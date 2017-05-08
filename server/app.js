const express       = require('express'),
  debug             = require('debug')('app:server'),
  path              = require('path'),
  webpack           = require('webpack'),
  webpackConfig     = require('../config/webpack.config'),
  project           = require('../config/project.config'),
  compress          = require('compression')

const app = express()

app.use(compress())

if(project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middlewares')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentbase: project.paths.client(),
    hot: true,
    quiet: project.compiler_quiet,
    noinfo: project.compiler_quiet,
    lazy: false,
    stats: project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  app.use(express.static(project.paths.public()))

  app.get('/api/v1/heatmap', (req, res) => {
    res.set('content-type', 'application/json').status(200)
    return res.json([[-73.9401,40.8163], [-73.892654,40.857395], [-73.9401,40.8163]])
  })

  app.use('/', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if(err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })

} else {
  debug('Server is being run outside of live development mode, meaning it will')

  app.use(express.static(project.paths.dist()))
}

module.exports = app