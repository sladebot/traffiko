'use strict'

import React, { Component } from 'react'
import { Brush, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts'
import Spinner from 'react-spinkit'

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
    const { accident_reasons_data, height, width, title, fetching, fetched } = this.props
    

    if(fetched) {
      return (
          <BarChart 
            data={accident_reasons_data}
            height={height}
            width={width}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
            <XAxis dataKey="cause" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <CartesianGrid />
            <Tooltip cursor={{fill: '#F5F5F5', fillOpacity: '0.5', stroke: '#FFFFFF'}} fill="#FFFFFF" stroke="#FFFFFF" itemStyle={{color: '#FFFFFF'}} wrapperStyle={{'background-color': '#757575'}} />
            <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}} />
            <ReferenceLine y={0} stroke='#004D40' onChange={(e) => {console.log('Brushing')}}/>
            <Brush dataKey='cause' height={30} stroke="#FFFFFF"/>
            <Bar dataKey='total' fill='#FFFFFF' onClick={this._handleBarClick} />
          </BarChart>
      )
    } else {
      return (
        <div style={{height: height, width: width}}>
          <Spinner 
            spinnerName="cube-grid"
            className='center'
            />
        </div>
      )
    }

  }
}


export default CauseBarChart