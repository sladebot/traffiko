var fs = require('fs')


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

getCausePieData = (dataset) => {
  let borough_hash = {}
  dataset.map((data) => {
    let cause = data['cause']
    if(cause in borough_hash) {
      hash = borough_hash[cause]
      hash['total'] += data['total']
      hash['injured'] += data['injured']
      hash['killed'] += data['killed']
      borough_hash[cause] = hash
    } else {
      hash = {
        total: data['total'],
        killed: data['killed'],
        injured: data['injured']
      }
      borough_hash[cause] = hash
    }
  })
  return borough_hash
}

const getBoroughCauseDashboardData = (req, res) => {
  console.log(`Starting query at = ${Date.now()}`)
  let response = null

  const params = req.query
  const { cause } = params

  debugger

  let query = null

  if(cause) {
    // return res.status(200).json({
    //       borough: [],
    //       causes: []
    //     })
    query = BoroughCause.find({}).select({_id: 1, cause: 1, total: 1, killed: 1, injured: 1, borough: 1})
  } else {
    query = BoroughCause.find({}).select({_id: 1, cause: 1, total: 1, killed: 1, injured: 1, borough: 1})
  }


  if(true) {
    query
      .exec((err, borough_causes) => {
        if(err) {
          return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
        }
        
        debugger

        let causePieData = getCausePieData(borough_causes)

        let pieResponse = []
        let sortedAndFiltered = Object.keys(causePieData).map(key => {
          let h = {}
          h['cause'] = key
          h['total'] = causePieData[key]['total']
          h['injured'] = causePieData[key]['injured']
          h['killed'] = causePieData[key]['killed']
          pieResponse.push(h)
        })
        
        let sortedPieResponse = _.take(_.reverse(_.sortBy(pieResponse, (o) => { return o.total })), 6)
          
        let response = {
          borough: borough_causes,
          causes: sortedPieResponse,
          selectedCause: cause || "ALL"
        }
        console.log(`Responding at = ${Date.now()}`)
        global.boroughCauseDashboardCachedResponse = response
        return res.status(200).json(response)
      })
  } else {
    console.log(`Serving cached data`)
    return res.status(200).json(global.boroughCauseDashboardCachedResponse)
  }
}

// const getParallelCoordinateData = (req, res) => {
//   let response = null
//   console.log(`Starting query at = ${Date.now()}`)
  
//   if(global.parallel_coordinate_data != undefined) {
//       console.log(`Serving from cache`)
//       return res.status(200).json(global.parallel_coordinate_data)
//   } else {
//     Accident.find({}).select({
//       _id: 1,
//       numPedestriansKilled: 1,
//       numMotoristInjured: 1,
//       numPedestriansInjured: 1,
//       numMotoristKilled: 1,
//       numCyclistInjured: 1,
//       numPersonKilled: 1,
//       numCyclistKilled: 1,
//       numPersonInjured: 1,
//       zipCode: 1,
//       longitude: 1,
//       latitude: 1})
//       .limit(5000)
//       .exec((err, data) => {
//         if(err) {
//           console.log('Got error')
//           return res.status(500).json({error: {msg: 'Something went wrong', payload: err}, data: null })
//         }
//         console.log('Sending from DB')
//         global.parallel_coordinate_data = data


//         fs.writeFileSync('parallelCoordinates.json', JSON.stringify(data), (err) => {
//           if(!err) {
//             console.log('written')
//           }
//         })
//         return res.status(200).json(data)
//       })
//   }
// }

module.exports = {
  all,
  getCauseBarData,
  getBoroughCauseDashboardData,
  heatMapLocations
}