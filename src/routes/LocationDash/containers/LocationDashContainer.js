import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard } from '../actions/heatMapActions'
import HeatMap from '../components/HeatMap'
// import DeckGLOverlay from '../components/DeckGLOverlay'
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
    const { heatmap_data, accident_reasons_data, borough_cause_dashboard_data } = this.props
    // console.log(`Length of borough_cause_dashboard_data data in smart container - ${borough_cause_dashboard_data.length}`)
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
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
              <BoroughCauseDashboard 
                  borough_cause_dashboard_data={borough_cause_dashboard_data}
                  height={400}
                  width={600}
                  />
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-color--grey-800">
                <CauseBarChart
                      title="Top 10 Causes of accidents"
                      height={400}
                      width={600}
                      accident_reasons_data={accident_reasons_data}/>
            </div>
          </div>  
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ heatMap }) => {
  const {heatmap_data, accident_reasons_data, borough_cause_dashboard_data} = heatMap
  // console.log(`Mapping State to Props in connected component - ${heatmap_data.length}`)
  // console.log(`Mapping State to Props cause bar chart data - ${accident_reasons_data.length}`)
  console.log(`Mapping State to Props BOUROUGH DASH - ${borough_cause_dashboard_data.length}`)
  return {
    heatmap_data,
    accident_reasons_data,
    borough_cause_dashboard_data
  }
}


export default connect(mapStateToProps, { fetchHeatMapData, fetchAccidentCauseData, fetchBoroughCauseDashboard })(LocationDash)