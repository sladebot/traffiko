const mongoose = require('mongoose')

const CauseSchema = new mongoose.Schema({
  cause: { type: String },
  total: { type: Number },
  killed: { type: Number },
  injured: { type : Number }
}, { collection: 'cause_hash'})

CauseSchema.methods = {}

CauseSchema.statics = {}

module.exports =  mongoose.model('Cause', CauseSchema)