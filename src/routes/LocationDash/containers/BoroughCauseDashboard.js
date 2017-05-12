import React, { Component } from 'react'
// import styles from '../../../styles/components/borough_cause_dashboard'
import d3 from 'd3'
import BarChart from '../components/BarChart'
import PieChart from '../../../components/PieChart'
import LineChart from '../../../components/LineChart'
import Spinner from 'react-spinkit'

class BoroughCauseDashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props,
      barChartOptions: {}
    }
  }

  render() {
    const { 
      fetching, 
      fetched, 
      borough_cause_dash_borough, 
      borough_cause_dash_causes, 
      filterByAccidentCause, 
      selectedCause } = this.props
    
    
    if(fetched) {
      return (
        <div>
          <PieChart 
            fetching={fetching}
            fetched={fetched}
            height={200}
            width={200}
            selectedCause={selectedCause}
            filterByAccidentCause={filterByAccidentCause}
            borough_cause_dashboard_data={borough_cause_dash_causes} />

          <LineChart
            fetched={fetched}
            fetching={fetching}
            height={220}
            width={500}
            borough_cause_dash_borough={borough_cause_dash_borough}
            selectedCause={selectedCause} />
            

          <BarChart
            fetching={fetching}
            fetched={fetched}
            borough_cause_dash_borough={borough_cause_dash_borough}
            chartOptions={this.state.barChartOptions}
            selectedCause={selectedCause}
            height={250}
            width={600}
            />
        </div>
      )
    } else {
      return (
        <div style={{height: 670, width: 600}}>
          <Spinner 
            spinnerName="cube-grid"
            className='lineSpinner'
            />
        </div>
      )
    }
  }
}

export default BoroughCauseDashboard