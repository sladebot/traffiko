const express       = require('express'),
  debug             = require('debug')('app:server'),
  path              = require('path'),
  webpack           = require('webpack'),
  webpackConfig     = require('../config/webpack.config'),
  project           = require('../config/project.config'),
  compress          = require('compression'),
  session           = require('express-session')

const db = require('./db')
const controllers = db.controllers
const dbSession = db.session
const connect = db.connect

const accidentsController = controllers && controllers.accidents

connect()

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

  let sessionStore = null

  if(!dbSession) {
    console.log('Something wrong with session')
  } else {
    sessionStore = dbSession()
  }

  const sess = {
    resave: false,
    saveUninitialized: false,
    secret: 'Your Session Secret goes here',
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'traffikoSessionId',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  }

  app.use(session(sess))

  // app.get('/api/v1/heatmap', (req, res) => {
  //   res.set('content-type', 'application/json').status(200)
  //   return res.json([[-73.9401,40.8163], [-73.892654,40.857395], [-73.9401,40.8163]])
  // })

  
  app.get('/api/v1/heatmap', accidentsController.heatMapLocations)
  app.get('/api/v1/cause_bar', accidentsController.getCauseBarData)
  app.get('/api/v1/dashboard/borough_cause', accidentsController.getBoroughCauseDashboardData)
  // app.get(`/api/v1/parallelCoordinatesData`, accidentsController.getParallelCoordinateData)

  app.get(`/parallelFrame`, (req, res) => {
    const filename = path.resolve(__dirname, 'public/parallel.html')
    res.set('content-type', 'text/html')
    res.sendFile(filename)
    res.end()
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