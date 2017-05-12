import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchParallelCoordinatePlotData, 
  fetchHeatMapData, 
  fetchAccidentCauseData, 
  fetchBoroughCauseDashboard,
  filterByAccidentCause
 } from '../actions/heatMapActions'
import HeatMapContainer from './HeatMapContainer'
import CauseBarChart from '../components/CauseBarChart'
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
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
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
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
                <CauseBarChart
                      title="Top 10 Causes of accidents"
                      height={400}
                      width={600}
                      fetching={fetching}
                      fetched={fetched}
                      accident_reasons_data={accident_reasons_data}/>
            </div>
          </div>  
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