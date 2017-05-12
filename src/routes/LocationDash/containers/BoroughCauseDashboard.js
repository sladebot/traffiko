import React, { Component } from 'react'
// import styles from '../../../styles/components/borough_cause_dashboard'
import d3 from 'd3'
import BarChart from '../components/BarChart'
import PieChart from '../../../components/PieChart'
import LineChart from '../../../components/LineChart'

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
    const { fetching, fetched, borough_cause_dashboard_data, filterByAccidentCause } = this.props
    debugger
    return (
      <div>
        <PieChart 
          fetching={fetching}
          fetched={fetched}
          height={200}
          width={200}
          filterByAccidentCause={filterByAccidentCause}
          borough_cause_dashboard_data={borough_cause_dashboard_data.causes} />

        <LineChart
          fetched={fetched}
          fetching={fetching}
          height={220}
          width={500}
          borough_cause_dashboard_data={borough_cause_dashboard_data.borough} />
          

        <BarChart
          fetching={fetching}
          fetched={fetched}
          borough_cause_dashboard_data={borough_cause_dashboard_data.borough}
          chartOptions={this.state.barChartOptions}
          height={250}
          width={600}
          />
      </div>
    )
  }
}

export default BoroughCauseDashboard