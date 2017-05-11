import React, { Component } from 'react'
import d3 from 'd3'
import Spinner from 'react-spinkit'

class ParallelCoordinateChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      props,
      dragging: {},
      line: d3.svg.line(),
      axis: d3.svg.axis().orient('left'),
      x: d3.scale.ordinal()
        .rangePoints([0, 900], 1),
      y: {}
    }
  }

  position(d) {
    var v = this.state.dragging[d]
    return v == null ? this.state.x(d) : v
  }


  path(d, dimensions) {
    return this.state.line(dimensions.map(p => {
      return [this.position(p), this.state.y[p](d[p])]
    }))
  }

  
  transition(g) {
    return g.transition().duration(500);
  }

  render() {
    const { height, width, fetched, fetching, parallel_coordinate_data } = this.props

    const margin = {top: 20, right: 10, bottom: 20, left: 50}
    const chartWidth = 900 - margin.left - margin.right
    const chartHeight = 600 - margin.top - margin.bottom

    

    let dragging = {}

    let background = null
    let foreground = null
    let dimensions = []

    console.log(parallel_coordinate_data.length)
    console.log(fetched)

    console.log(`Starting chart`)
    const keys = parallel_coordinate_data.length > 0 ? Object.keys(parallel_coordinate_data[0]) : []
    this.state.x.domain(dimensions = keys.filter(d => {
      return (d != '_id') &&(this.state.y[d] = d3.scale.linear()
        .domain(d3.extent(parallel_coordinate_data, p => {
          return +p[d]
        })))
        .range([chartHeight, 0])
    }))


    const backgroundLines = parallel_coordinate_data.map(d => {
      return (
        <path
          key={`pcplot-${d._id}`}
          stroke="grey"
          d={this.path(d, dimensions)}></path>
      )
    })

    const foregroundLines = parallel_coordinate_data.map(d => {
      return (
        <path
          key={`pcplot-${d._id}`}
          stroke="#0091EA"
          d={this.path(d, dimensions)}></path>
      )
    })

    const translate = `translate(${margin.left}, ${margin.top})`
    
    if(fetched) {
      console.log(`Fetching main element`)
      return (
        <svg id='parallelCoorChart' height={chartHeight} width={chartWidth}
          stroke='white'
          fill='transparent'>
          <g transform={translate}>
            <g className="background" >
              {backgroundLines}
            </g>
            <g className="foreground" >
              {foregroundLines}
            </g>
          </g>
        </svg>
      )
    } else {
      return (
        <div style={{height: (chartHeight), width:  (chartWidth)}}>
          <Spinner 
            spinnerName="cube-grid"
            className=''
            />
        </div>
      )
    }
  }
}



export default ParallelCoordinateChart