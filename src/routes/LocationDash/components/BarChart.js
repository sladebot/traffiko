import React, { Component } from 'react'
import d3 from 'd3'
import Bar from './Bar'
import Spinner from 'react-spinkit'

class BarChart extends Component {
  
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     ...this.state,
  //     ...props
  //   }
  // }

  _datasetBarChosen(datasetBarChart, cause="ALL") {
    const filtered = datasetBarChart
      .sort((a, b) => a['total'] - b['total'])
      .filter(d => d['cause'] == cause)
	  return filtered;
  }

  _getBasicOptions() {
    const margin = {top: 30, right: 5, bottom: 20, left: 50},
		  width = 600 - margin.left - margin.right,
	    height = 300 - margin.top - margin.right,
		  colorBar = d3.scale.category20(),
		  barPadding = 20
    
    return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}	
  }
  
  render() {
    const { fetching, fetched, borough_cause_dashboard_data, chartOptions={} } = this.props

    const datasetBarSelected = this._datasetBarChosen(borough_cause_dashboard_data)
    const basics = this._getBasicOptions()

    
    const margin = basics.margin,
      width = chartOptions.width || basics.width,
      height =  chartOptions.height || basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding

    const xScale = d3.scale.linear()
      .domain([0, this._datasetBarChosen(datasetBarSelected).length])
      .range([0, width])

    const yScale = d3.scale.linear()
			.domain([0, d3.max(datasetBarSelected, (d) => {return d.total})])
			.range([height, 0])
    
    const transform='translate('+margin.left+','+margin.top+')'
    const transformXAxis=`translate(${margin.left}, ${margin.top + height})`
    
    let foregroundRects = datasetBarSelected.map((d, i) => {
      return (
        <Bar 
          key={d['_id']}
          xScaleFn={xScale}
          yScaleFn={yScale}
          index={i}
          yMetric={d.total}
          width={(width/datasetBarSelected.length - barPadding)}
          height={height}
          fill={"#F5F5F5"}
          stroke={"#F5F5F5"}
        />
      )
    })

    let yLabels = datasetBarSelected.map((d, i) => {
      return (
        <text
          key={i}
          textAnchor='middle'
          x={(i * (width / datasetBarSelected.length) - 2 ) + ((width / datasetBarSelected.length - barPadding) / 2)}
          y={yScale(d.total) + 14}
          className="yAxis"
          stroke="black">{d['total']}</text>
      )
    })

    let xLabels = datasetBarSelected.map((d, i) => {
      return (
        <text
          key={i}
          textAnchor='middle'
          x={(i * (width / datasetBarSelected.length)) + ((width / datasetBarSelected.length - barPadding) / 2)}
          y={15}
          className="xAxis"
          fill="white">{d['borough']}</text>
      )
    })

    if(fetched) {
      return (
        <div>
          <svg id='barChart' 
            width={(width + margin.left + margin.right)}
            height={(height + margin.top + margin.bottom)}>
            <g transform={transform}>
              {foregroundRects}
              {yLabels}
            </g>
            <g transform={transformXAxis}>
              {xLabels}
            </g>
            <text 
              fill="white">{}</text>
          </svg>
        </div>
      )
    } else {
      return (
        <div style={{height: (height), width:  (width)}}>
          <Spinner 
            spinnerName="cube-grid"
            className='center'
            />
        </div>
      )
    }
  } 
}

export default BarChart