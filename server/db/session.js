const session = require('express-session')
const connectMongo = require('connect-mongo')
const project = require('../../config/project.config')

const MongoStore = connectMongo(session)
const mongo_uri = `mongodb://${project.mongodb_host}:${project.mongodb_port}/${project.mongodb_database}`

module.exports = () => {
  new MongoStore(
    {
      url: mongo_uri,
      autoReconnect: true
    }
  )
}