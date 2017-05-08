const mongoose = require('mongoose')

const MapSchema = new mongoose.Schema({
  date: { type: Date },
  borough: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
}, { collection: 'map'})

MapSchema.methods = {}

MapSchema.statics = {}

module.exports =  mongoose.model('Map', MapSchema)