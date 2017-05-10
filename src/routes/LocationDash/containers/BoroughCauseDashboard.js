import React, { Component } from 'react'
// import styles from '../../../styles/components/borough_cause_dashboard'
import * as d3 from 'd3'
import BarChart from '../components/BarChart'

class BoroughCauseDashboard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props,
      barChartOptions: {}
    }
  }

  dsPieChart() {
    const vis = d3.select('#pieChart')
  }

  _initialize() {

  }

  componentDidMount() {
    this._initialize()
  }

  render() {
    const { fetching, fetched, borough_cause_dashboard_data } = this.props
    return (
      <div>
        <div id="pieChart"></div>
        {/*<Pie 
          fetching={fetching}
          fetched={fetched}
          chartOptions={chartOptions}/>*/}
        <BarChart
          fetching={fetching}
          fetched={fetched}
          borough_cause_dashboard_data={borough_cause_dashboard_data}
          chartOptions={this.state.barChartOptions}
          />
        <div id="lineChart"></div>
      </div>
    )
  }
}

export default BoroughCauseDashboard