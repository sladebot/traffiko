const _ = require('lodash')
const Accident = require('../models/accident')


const all = (req, res) => {
  
  Accident.find({}).exec((err, accidents) => {
  
  // Accident.find({_id: 0, longitude: 1, latitude: 1}).exec((err, accidents) => {
    if(err) {
      console.log('Got error')
      return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null });
    }
    console.log('Got data')
    return res.status(200).json(accidents)
  })
}

module.exports = {
  all
}