import React, { Component } from 'react'
import d3 from 'd3'
import Spinner from 'react-spinkit'


class Pie extends Component {
  render() {
    const { fetching, fetched, borough_cause_dashboard_data } = this.props
    return (
      <svg></svg>
    )
  }
}

export default Pie