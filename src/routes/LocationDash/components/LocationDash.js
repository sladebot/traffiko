import React from 'react'
import HeatMap from './HeatMap'

export const LocationDash = ({heatmap_data, accident_reasons, borough_data}) => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--6-col">
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col" id="heatmap">
          <HeatMap data={heatmap_data} />    
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

export default LocationDash