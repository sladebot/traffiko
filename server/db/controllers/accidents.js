const _ = require('lodash')
const Accident = require('../models/accident')
const Map = require('../models/map')

const all = (req, res) => {
  
  let query = Accident.find({}).select({_id: 0, longitude: 1, latitude: 1})
  console.log("Starting to query")
  query.exec((err, accidents) => {
    
  // Accident.find({_id: 0, longitude: 1, latitude: 1}).exec((err, accidents) => {
    if(err) {
      console.log('Got error')
      return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
    }
    console.log('Got data')
    let data = null
    if(global.all_accidents != null) {
      data = global.all_accidents
    } else {
      data = accidents
      global.all_accidents = accidents
    }
    return res.status(200).json({data: data})
  })
}

const heatMapLocations = (req, res) => {
  console.log(`Starting query at = ${Date.now()}`)
  Map.find({}).select({_id: 0, longitude: 1, latitude: 1}).limit(500)
    .exec((err, mapPoints) => {
      console.log(`Got data at = ${Date.now()}`)
      if(err) {
        console.log('Got error')
        return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
      }

      let response = null
      if(global.heatMapLocations != undefined && global.heatMapLocations.length > 0) {
        console.log('Reading from cache')
        response = global.heatMapLocations
      } else {
        response = mapPoints
        global.heatMapLocations = mapPoints
      }

      const filterData =  response.map(point => [point['latitude'], point['longitude']])
      console.log(`Filtering done at at = ${Date.now()}`)
      return res.status(200).json({data: filterData})
    })
}

module.exports = {
  all,
  heatMapLocations
}