const mongoose = require('mongoose')

const AccidentSchema = new mongoose.Schema({
  date: { type: Date },
  borough: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  zipCode: { type: Number },
  time: { time: Date},
  contributingFactorVehicle1: { type: String },
  contributingFactorVehicle2: { type: String },
  contributingFactorVehicle3: { type: String },
  contributingFactorVehicle4: { type: String },
  contributingFactorVehicle5: { type: String },
  crossStreetName: { type: String },
  offStreetname: { type: String },
  onStreetName: { type: String },
  numCyclistInjured: { type: Number },
  numCyclistKilled: { type: Number },
  numMotoristInjured: { type: Number },
  numMotoristKilled: { type: Number },
  numPedestriansInjured: { type: Number },
  numPedestriansKilled: { type: Number },
  numPersonInjured: { type: Number },
  numPersonKilled: { type: Number },
  vehicleTypeCode1: { type: String },
  vehicleTypeCode2: { type: String },
  vehicleTypeCode3: { type: String },
  vehicleTypeCode4: { type: String },
  vehicleTypeCode5: { type: String }
}, { collection: 'accidents'})

AccidentSchema.methods = {}

AccidentSchema.statics = {
  filterLatitudeLongiture() {}
}

module.exports =  mongoose.model('Accident', AccidentSchema)