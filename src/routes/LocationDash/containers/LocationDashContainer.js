import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHeatMapData } from '../actions/heatMapActions'
import HeatMap from '../components/HeatMap'
// import LocationDash from '../components/LocationDash'

class LocationDash extends Component {
  componentWillMount() {
    const {fetchHeatMapData} = this.props
    fetchHeatMapData()
  }

  render() {
    const { heatmap_data, accident_reasons_data, borough_data } = this.props
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col" id="heatmap">
              <HeatMap
                heatmap_data={heatmap_data} />
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

const mapStateToProps = ({ heatMap }) => {
  const {heatmap_data, top_accident_reason_bar_data, borough_data} = heatMap
    
  return {
    heatmap_data,
    top_accident_reason_bar_data,
    borough_data
  }
}

export default connect(mapStateToProps, { fetchHeatMapData })(LocationDash)