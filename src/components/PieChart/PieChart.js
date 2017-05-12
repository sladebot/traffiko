import React, { Component } from 'react'
import d3 from 'd3'
import Spinner from 'react-spinkit'
import LabeledArc from './LabeledArc'


const PieChart = ({ height, width, borough_cause_dashboard_data, filterByAccidentCause}) => {
  const key = 'total'
  const data = borough_cause_dashboard_data.filter(o => o.cause != 'ALL')
  const pie = d3.layout.pie()
    .value(d => {
      return d[key]
    })(data)
  

  const colors = d3.scale.category10()
  const innerRadius = Math.min(height - 10, width - 10) / 2 * .5
  const outerRadius = Math.min(height - 10, width - 10) / 2
  
  const arcs = pie.map((d, i) => {
      return (
        <LabeledArc key={`arc-${i}`}
                data={d}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                onClick={filterByAccidentCause}
                color={colors[i]} />
      )
    })
  const translate = `translate(${outerRadius}, ${outerRadius})`
  return (
    <svg height={height} width={width}>
      <g transform={translate}>
        {arcs}
      </g>
    </svg>
  )
}

export default PieChart