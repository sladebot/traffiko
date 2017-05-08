'use strict'

import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'


class CauseBarChart extends Component {
  _x(data) {
    return data.cause
  }

  render() {
    const chartSeries = [
      {
        field: 'count',
        name: 'Count'
      }
    ]
    const xScale = 'ordinal'
    const xLabel = 'Count'
    const yTicks = [10]
    const { accident_reasons_data, height, width, title } = this.props
    console.log(`Props in bar chart ${JSON.stringify(this.props)}`)
    return (
        <BarChart 
          data={accident_reasons_data}
          height={height}
          width={width}
          fill='#C5CAE9'
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
          <XAxis dataKey="cause" stroke="#FFFFFF" />
          <YAxis stroke="#FFFFFF" />
          <CartesianGrid fill='#00897B'/>
          <Tooltip cursor={{fill: '#B2DFDB', fillOpacity: '0.5'}} fill="#FFFFFF" stroke="#FFFFFF" itemStyle={{color: '#FFFFFF'}} wrapperStyle={{'background-color': '#00695C'}} />
          <Legend />
          <Bar dataKey='count' fill='#FFFFFF' />
        </BarChart>
    )
  }
}


export default CauseBarChart