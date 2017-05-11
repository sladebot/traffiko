import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchParallelCoordinatePlotData, fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard } from '../actions/heatMapActions'
// import { fetchParallelCoordinatePlotData } from '../actions/parallelCoordinateActions'
import HeatMapContainer from './HeatMapContainer'
import CauseBarChart from '../components/CauseBarChart'
import BoroughCauseDashboard from './BoroughCauseDashboard'
import ParallelCoordinateChart from '../../../components/ParallelCoordinateChart'

class LocationDash extends Component {
  componentWillMount() {
    const { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard, fetchParallelCoordinatePlotData} = this.props
    // fetchHeatMapData()
    fetchAccidentCauseData()
    fetchBoroughCauseDashboard()
    fetchParallelCoordinatePlotData()
  }

  render() {
    const { heatmap_data, accident_reasons_data, borough_cause_dashboard_data, parallel_coordinate_data, fetching, fetched } = this.props
    console.log(`Parent smart container - ${parallel_coordinate_data.length}`)
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
                  borough_cause_dashboard_data={borough_cause_dashboard_data}
                  height={800}
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
        <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
            <ParallelCoordinateChart 
              height={900}
              width={1400}
              fetching={fetching}
              fetched={fetched}
              parallel_coordinate_data={parallel_coordinate_data}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ heatMap, parallel }) => {
  const {heatmap_data, accident_reasons_data, borough_cause_dashboard_data, fetching, fetched} = heatMap
  const {parallel_coordinate_data} = parallel
  return {
    heatmap_data,
    accident_reasons_data,
    borough_cause_dashboard_data,
    parallel_coordinate_data,
    fetching,
    fetched
  }
}

const actions = {
  fetchHeatMapData,
  fetchAccidentCauseData,
  fetchBoroughCauseDashboard,
  fetchParallelCoordinatePlotData
}

export default connect(mapStateToProps, actions)(LocationDash)