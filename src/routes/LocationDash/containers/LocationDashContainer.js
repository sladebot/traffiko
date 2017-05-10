import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard } from '../actions/heatMapActions'
import HeatMapContainer from './HeatMapContainer'
import CauseBarChart from '../components/CauseBarChart'
import BoroughCauseDashboard from './BoroughCauseDashboard'

class LocationDash extends Component {
  componentWillMount() {
    const { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard } = this.props
    fetchHeatMapData()
    fetchAccidentCauseData()
    fetchBoroughCauseDashboard()
  }

  render() {
    const { heatmap_data, accident_reasons_data, borough_cause_dashboard_data, fetching, fetched } = this.props
    console.log(`Data in redux container ${heatmap_data.length}`)
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
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800" style={{border: '1px solid white'}}>
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
      </div>
    )
  }
}

const mapStateToProps = ({ heatMap }) => {
  const {heatmap_data, accident_reasons_data, borough_cause_dashboard_data, fetching, fetched} = heatMap
  return {
    heatmap_data,
    accident_reasons_data,
    borough_cause_dashboard_data,
    fetching,
    fetched
  }
}


export default connect(mapStateToProps, { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard })(LocationDash)