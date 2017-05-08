import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHeatMapData } from '../actions/heatMapActions'

import LocationDash from '../components/LocationDash'

// const mapDispatchToProps = {
//   fetchHeatMapData: () => fetchHeatMapData()
// }

// const mapStateToProps = ({heatmap_data, top_accident_reason_bar_data, borough_data}) => {
//   console.log("Mapping state to props !")
//   return {
//     heatmap_data: heatmap_data,
//     accident_reasons_data: top_accident_reason_bar_data,
//     borough_data: borough_data
//   }
// }

const mapStateToProps = ({ heatMap }) => {
  const {heatmap_data, top_accident_reason_bar_data, borough_data} = heatMap
  console.log("Mapping state to props !")
  return {
    heatmap_data,
    top_accident_reason_bar_data,
    borough_data
  }
}

export default connect(mapStateToProps, { fetchHeatMapData })(LocationDash)