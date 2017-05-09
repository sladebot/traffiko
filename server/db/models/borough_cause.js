const mongoose = require('mongoose')

const BoroughCauseSchema = new mongoose.Schema({
  cause: { type: String },
  total: { type: Number },
  killed: { type: Number },
  injured: { type : Number },
  borough: { type: String }
}, { collection: 'cause_borough_dashboard'})

BoroughCauseSchema.methods = {}

BoroughCauseSchema.statics = {}

module.exports =  mongoose.model('BoroughCause', BoroughCauseSchema)