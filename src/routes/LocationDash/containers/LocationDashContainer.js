import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchParallelCoordinatePlotData, 
  fetchHeatMapData, 
  fetchAccidentCauseData, 
  fetchBoroughCauseDashboard,
  filterByAccidentCause
 } from '../actions/heatMapActions'
import HeatMapContainer from './HeatMapContainer'

import BoroughCauseDashboard from './BoroughCauseDashboard'

class LocationDash extends Component {
  componentWillMount() {
    const { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard, fetchParallelCoordinatePlotData} = this.props
    // fetchHeatMapData()
    fetchAccidentCauseData()
    fetchBoroughCauseDashboard()
  }

  render() {
    const { heatmap_data, 
      accident_reasons_data, 
      borough_cause_dash_borough, 
      borough_cause_dash_causes, 
      fetching, 
      fetched, 
      filterByAccidentCause,
      selectedCause } = this.props
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col" id="heatmap">
              <HeatMapContainer
                fetching={fetching}
                fetched={fetched}
                heatmap_data={heatmap_data} />
              <div className="labelHeader" style={{width: '106%'}}>3D view of accident heatmap</div>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-900">
              <BoroughCauseDashboard 
                  fetching={fetching}
                  fetched={fetched}
                  borough_cause_dash_borough={borough_cause_dash_borough}
                  borough_cause_dash_causes={borough_cause_dash_causes}
                  selectedCause={selectedCause}
                  filterByAccidentCause={filterByAccidentCause}
                  height={900}
                  width={600}
                  />
                <div className="labelHeader">Correlation between location and causes</div>
            </div>
          </div>  
        </div>
        <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
          <div className="labelHeader">Parallel Coordinate Graph</div>
          <iframe src="http://localhost:3000/parallel.html" style={{height: 550, width: 1400, overflow: 'hidden'}} scrolling="no"></iframe>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ heatMap }) => {
  const {heatmap_data, accident_reasons_data, borough_cause_dash_borough, borough_cause_dash_causes, fetching, fetched, selectedCause} = heatMap
  return {
    heatmap_data,
    accident_reasons_data,
    borough_cause_dash_borough,
    borough_cause_dash_causes,
    fetching,
    fetched,
    selectedCause
  }
}

const actions = {
  fetchHeatMapData,
  fetchAccidentCauseData,
  fetchBoroughCauseDashboard,
  filterByAccidentCause
}

export default connect(mapStateToProps, actions)(LocationDash)