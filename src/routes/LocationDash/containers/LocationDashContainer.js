import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHeatMapData, fetchAccidentCauseData } from '../actions/heatMapActions'
import HeatMap from '../components/HeatMap'
// import DeckGLOverlay from '../components/DeckGLOverlay'
import CauseBarChart from '../components/CauseBarChart'

class LocationDash extends Component {
  componentWillMount() {
    const { fetchHeatMapData, fetchAccidentCauseData } = this.props
    fetchHeatMapData()
    debugger
    fetchAccidentCauseData()
  }

  render() {
    const { heatmap_data, accident_reasons_data, borough_data } = this.props
    console.log(`Length of cause bar chart data in smart container - ${accident_reasons_data.length}`)
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
          <div className="mdl-grid mdl-color--teal-600">
            <div className="mdl-cell mdl-cell--12-col">
              <CauseBarChart
                title="Top 10 Causes of accidents"
                height={400}
                width={600}
                accident_reasons_data={accident_reasons_data}/>
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
  const {heatmap_data, accident_reasons_data, borough_data} = heatMap
  console.log(`Mapping State to Props in connected component - ${heatmap_data.length}`)
  console.log(`Mapping State to Props cause bar chart data - ${accident_reasons_data.length}`)
  return {
    heatmap_data,
    accident_reasons_data,
    borough_data
  }
}


export default connect(mapStateToProps, { fetchHeatMapData, fetchAccidentCauseData })(LocationDash)