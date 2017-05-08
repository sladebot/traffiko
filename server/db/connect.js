const mongoose = require('mongoose')
const loadModels = require('./models')
let project = require('../../config/project.config')

let mongo_uri = `mongodb://${project.mongodb_host}:${project.mongodb_port}/${project.mongodb_database}`

module.exports = () => {
  const connect = () => {
    mongoose.connect(mongo_uri, (err) => {
      if(err) {
        console.log(`Error connecting to ${mongo_uri}`)
        console.log(`Reason ${JSON.stringify(err)}`)
      } else {
        console.log(`Connected to ${mongo_uri}`)
      }
    })
  }

  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', console.log)

  loadModels()
}