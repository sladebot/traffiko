import React, { Component } from 'react'
import HeatMap from './HeatMap'
import { fetchHeatMapData } from '../actions/heatMapActions'

class LocationDash extends Component {
  componentWillMount() {
    const {fetchHeatMapData} = this.props
    fetchHeatMapData()
  }

  render() {
    const {heatmap_data, accident_reasons_data, borough_data} = this.props
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col" id="heatmap">
              <HeatMap
                data={heatmap_data} />    
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              {/*<Binning />*/}
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              {/*<Pie />*/}
            </div>
          </div>  
        </div>
      </div>
    )
  }
}


export default LocationDash