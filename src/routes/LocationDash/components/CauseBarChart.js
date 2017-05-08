'use strict'

import React, { Component } from 'react'
import { Brush, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts'


class CauseBarChart extends Component {
  _x(data) {
    return data.cause
  }

  _handleBrush(e) {
    console.log('Brushed')
  }

  _handleBarClick(data, index) {
    console.log(`Clicked Bar`)
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const chartSeries = [
      {
        field: 'total',
        name: 'Total'
      }
    ]
    const xScale = 'ordinal'
    const xLabel = 'Total'
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
          <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}} />
          <ReferenceLine y={0} stroke='#004D40' onChange={(e) => {console.log('Brushing')}}/>
          <Brush dataKey='cause' height={30} stroke="#000000"/>
          <Bar dataKey='total' fill='#FFFFFF' onClick={this._handleBarClick} />
        </BarChart>
    )
  }
}


export default CauseBarChart