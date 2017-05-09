import React, { Component } from 'react'
import d3 from 'd3'

class BarChart extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props
    }
  }

  _datasetBarChosen(datasetBarChart, cause="ALL") {
    const filtered = datasetBarChart
      .sort((a, b) => a['total'] - b['total'])
      .filter(d => d['cause'] == cause)
    console.log(`Filtered to - ${filtered.length}`)
	  return filtered;
  }

  _getBasicOptions() {
    const margin = {top: 30, right: 5, bottom: 20, left: 50},
		  width = 500 - margin.left - margin.right,
	    height = 250 - margin.top - margin.bottom,
		  colorBar = d3.scale.category20(),
		  barPadding = 1
    
    return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}	
  }

  drawBarChart() {
    console.log("DRAWING BAR CHART !!")
    const { borough_cause_dashboard_data, chartOptions } = this.props
    let basics = this._getBasicOptions()
    console.log(`Starting to draw chart with data length - ${borough_cause_dashboard_data.length}`)
    const margin = basics.margin,
      width = basics.width,
      height = basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding
 
    const xScale = d3.scale.linear()
      .domain([0, borough_cause_dashboard_data.length])
      .range([0, width])

    const yScale = d3.scale.linear()
			.domain([0, d3.max(borough_cause_dashboard_data, (d) => {return d.total})])
			.range([height, 0])
		
		
		const svg = d3.select('#barChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    const plot = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    plot.selectAll('rect')
      .data(borough_cause_dashboard_data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        console.log(`Data ${d}`)
        return xScale(i)
      })
      .attr('width', width/borough_cause_dashboard_data.length - barPadding)
      .attr('y', (d) => {return yScale(d.total)})
      .attr('height', (d) => {
        return height - yScale(d.total)
      })
      .attr('fill', 'lightgrey')
    
    plot.selectAll('text')
      .data(borough_cause_dashboard_data)
      .enter()
      .append('text')
      .text((d) => {
        return formatAsInteger(d3.round(d.total))
      })
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => {
        return (i * (width / borough_cause_dashboard_data.length)) + ((width / borough_cause_dashboard_data.length - barPadding) / 2);
      })
      .attr('y', (d) => {
        return yScale(d.total) + 14
      })
      .attr('class', 'yAxis')
      .attr('font-family', 'sans-seriff')
      .attr('fill', 'white')

    const xLabels = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)

    xLabels.selectAll('text.xAxis')  
      .data(borough_cause_dashboard_data)
      .enter()
      .append('text')
      .text((d) => {return d.borough})
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => {
        return (i * (width / borough_cause_dashboard_data.length)) + ((width / borough_cause_dashboard_data.length - barPadding) / 2);
      })
      .attr('y', 15)
      .attr('class', 'xAxis')
    
    svg.append('text')
      .attr("x", (width + margin.left + margin.right)/2)
      .attr("y", 15)
      .attr("class","title")				
      .attr("text-anchor", "middle")
      .text("Borough Overview")

  }

  // componentDidMount() {
  //   console.log("Component mounted")
  //   this.drawBarChart()
  // }
  
  render() {
    const { borough_cause_dashboard_data, chartOptions } = this.props
    console.log(`Sending for filtering - ${borough_cause_dashboard_data.length}`)
    const datasetBarSelected = this._datasetBarChosen(borough_cause_dashboard_data)
    let basics = this._getBasicOptions()
    console.log(`Starting to draw chart with data length - ${borough_cause_dashboard_data.length}`)
    const margin = basics.margin,
      width = basics.width,
      height = basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding


    const w = chartOptions.width - (margin.left + margin.right),
      h = chartOptions.height - (margin.top + margin.bottom)

    const xScale = d3.scale.linear()
      .domain([0, this._datasetBarChosen(datasetBarSelected).length])
      .range([0, chartOptions.width])

    const yScale = d3.scale.linear()
			.domain([0, d3.max(datasetBarSelected, (d) => {return d.total})])
			.range([chartOptions.height, 0])
    
    const transform='translate('+margin.left+','+margin.top+')';
    
    
    /*let backgroundRects = datasetBarSelected.map((d, i) => {
      return (
        <rect 
          key={d["_id"]}
          x={xScale(i)}
          width={60}
          y={margin.top - margin.bottom}
          height={chartOptions.height}
          fill="#596580"
          />
      )
    })*/
    
    let foregroundRects = datasetBarSelected.map((d, i) => {
      return (
        <rect 
          key={d["_id"]}
          x={xScale(i)}
          width={60}
          y={yScale(d.total)}
          height={chartOptions.height - yScale(d.total)}
          fill="#F5F5F5"
          />
      )
    })

    debugger;
    let yLabels = datasetBarSelected.map((d, i) => {
      debugger
      return (
        <text
          text-anchor='middle'
          x={(i * (width / datasetBarSelected.length) - 2 ) + ((width / datasetBarSelected.length) / 2)}
          y={yScale(d.total) + 14}
          className="yAxis"
          stroke="black"
          >
          {d['total']}
        </text>
      )
    })
    
    return (
      // <div id="barChart"></div>
      <div>
        <svg id={chartOptions.chartId || 'barChart'} 
          width={chartOptions.width || this.state.width}
          height={chartOptions.height || this.state.height}>
          <g transform={transform}>
            {/*{backgroundRects}*/}
            {foregroundRects}
            {yLabels}
          </g>
          {/*<g transform={transformXAxis}>

          </g>*/}
        </svg>
      </div>
    )
  }
}

export default BarChart