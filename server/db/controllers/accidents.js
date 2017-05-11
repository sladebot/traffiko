const _ = require('lodash')
const Accident = require('../models/accident')
const Cause = require('../models/cause')
const BoroughCause = require('../models/borough_cause')
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
    if(global.all_accidents != undefined) {
      console.log(`Serving from cache`)
      data = global.all_accidents
    } else {
      data = accidents
      global.all_accidents = accidents
    }
    return res.status(200).json(data)
  })
}

const heatMapLocations = (req, res) => {
  console.log(`Starting query at = ${Date.now()}`)
  Map.find({}).select({_id: 0, longitude: 1, latitude: 1})
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

      console.log(`Filtering done at at = ${Date.now()}`)
      return res.status(200).json(response)
    })
}

const getCauseBarData = (req, res) => {
  console.log(`Starting query at = ${Date.now}`)
  Cause.find({}).select({_id: 0, cause: 1, total: 1, killed: 1, injured: 1})
    .exec((err, causes) => {
      if(err) {
        return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
      }
      const irrelevant_causes = ['', 'Unspecified', 'Other Vehicular']
      const sorted_causes = _.chain(causes)
        .filter(function(o) {return !irrelevant_causes.includes(o.cause) })
        .sortBy([function(o) {return o.total}])
        .reverse()
        .slice(0, 10)
      
      return res.status(200).json(sorted_causes)
    })
}

const getBoroughCauseDashboardData = (req, res) => {
  console.log(`Starting query at = ${Date.now()}`)
  let response = null
  if(global.boroughCauseDashboardCachedResponse == undefined) {
    BoroughCause.find({}).select({_id: 1, cause: 1, total: 1, killed: 1, injured: 1, borough: 1})
      .exec((err, borough_causes) => {
        if(err) {
          return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
        }
        console.log(`Got data at = ${Date.now()}`)
        global.boroughCauseDashboardCachedResponse = borough_causes
        return res.status(200).json(borough_causes)
      })
  } else {
    console.log(`Serving cached data`)
    return res.status(200).json(global.boroughCauseDashboardCachedResponse)
  }
}

module.exports = {
  all,
  getCauseBarData,
  getBoroughCauseDashboardData,
  heatMapLocations
}