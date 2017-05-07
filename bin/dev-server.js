const project = require('../config/project.config'),
  server = require('../server/app'),
  debug = require('debug')('app:bin:dev-server')

server.listen(project.server_port)
debug(`Server listening at http://localhost:${project.server_port}`)
