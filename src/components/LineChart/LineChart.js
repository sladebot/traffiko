import React, { Component } from 'react'
import d3 from 'd3'
import Spinner from 'react-spinkit'

class LineChart extends Component {

  _datasetSelected(datasetLineChart, cause="ALL") {
    const filtered = datasetLineChart
      .sort((a, b) => a['total'] - b['total'])
      .filter(d => d['cause'] == cause)
    
    let result = {}
    filtered.map(data => {
      let borough = data['borough']
      let hash = null
      if(borough in result) {
        hash = result[borough]
        hash['total'] += data['total']
        hash['injured'] += data['injured']
        hash['killed'] += data['killed']
      } else {
        hash = {
          total: data['total'],
          injured: data['injured'],
          killed: data['killed']
        }
      }
      result[borough] = hash
    })

    let final = []

    Object.keys(result).map(borough => {
      let h = {}
      h['borough'] = borough
      h['total'] = result[borough]['total']
      h['injured'] = result[borough]['injured']
      h['killed'] = result[borough]['killed']
      final.push(h)
    })

    return final

  }

  render() {
    const { height, width, fetched, fetching, borough_cause_dash_borough, selectedCause } = this.props
    const filteredData = this._datasetSelected(borough_cause_dash_borough, selectedCause)

    const margin = {top: 20, right: 10, bottom: 0, left: 50}
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const yScale = d3.scale.linear()
	    .domain([0, d3.max(filteredData, function(d) { return d.total; })])
	    .range([chartHeight - 50, 0])
    
    var xScale = d3.scale.linear()
	    .domain([0, filteredData.length-1])
	    .range([0, chartWidth - 50])
    
    const boroughs = [
      'STATEN ISLAND',
      'BRONX',
      'MANHATTAN',
      'QUEENS',
      'BROOKLYN'
    ]

    const path = d3.svg.line()
        .x(d => {
          return boroughs.indexOf(d.borough) * 80
        })
        .y(d => {
          return yScale(d.total)
        })
        .interpolate(false)


    const total = filteredData.map(d => d.total).reduce((a, b) => a + b, 0)

    const circles = filteredData.map((d, i) => {
      return (
        <circle key={`circle-${i}`}
                className='dot'
                fill='white'
                stroke='white'
                r={3.5}
                cx={path.x()(d)}
                cy={path.y()(d)}
                 />
      )
    })

    const translate = `translate(${margin.left}, ${margin.top})`
    if(fetched) {
      return (
        <svg id='lineChart' height={chartHeight} width={chartWidth}>
          <g transform={translate}>
            <text
              id="lineChartTotal"
              fill="white"
              x={chartWidth/2 - 50}
              y={chartHeight/2}
              >{total}</text>
            <path d={path(filteredData)} fill='transparent' stroke='white'/>
            {circles}
            <text id="lineChartTitle"
                  x={margin.left + ((chartWidth)/2) - 100}
                  y={10}>
              {'Accident distribution by location'}
              </text>
          </g>
        </svg>
      )
    } else {
      return (
        <div style={{height: (chartHeight), width:  (chartWidth)}}>
          <Spinner 
            spinnerName="cube-grid"
            className='lineSpinner'
            />
        </div>
      )
    }
  }
}



export default LineChart