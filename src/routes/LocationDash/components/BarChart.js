import React, { Component } from 'react'
import d3 from 'd3'
import Bar from './Bar'
import Spinner from 'react-spinkit'

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
    const { borough_cause_dashboard_data, chartOptions } = this.props
    let basics = this._getBasicOptions()
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
    const { fetching, fetched, borough_cause_dashboard_data, chartOptions } = this.props
    const datasetBarSelected = this._datasetBarChosen(borough_cause_dashboard_data)
    const basics = this._getBasicOptions()
    const margin = basics.margin,
      width = basics.width,
      height = basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding

    const w = chartOptions.width - (margin.left + margin.right)
    const h = chartOptions.height - (margin.top + margin.bottom)

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
        <Bar 
          keyId={d['_id']}
          xScaleFn={xScale}
          yScaleFn={yScale}
          index={i}
          yMetric={d.total}
          width={60}
          height={chartOptions.height}
          fill={"#F5F5F5"}
          stroke={"#F5F5F5"}
        />
      )
    })

    let yLabels = datasetBarSelected.map((d, i) => {
      return (
        <text
          key={i}
          x={(i * (width / datasetBarSelected.length) - 2 ) + ((width / datasetBarSelected.length) / 2)}
          y={yScale(d.total) + 14}
          className="yAxis"
          stroke="black"
          >
          {d['total']}
        </text>
      )
    })

    console.log(`Fetched in component ${this.props.fetched}`)

    let chartBoxwidth = chartOptions.width || this.state.width
    let chartBoxheight = chartOptions.height || this.state.height

    if(this.props.fetched) {
      console.log(`Loading Component...`)
      return (
        // <div id="barChart"></div>
        <div>
          <svg id={chartOptions.chartId || 'barChart'} 
            width={chartOptions.width || this.state.width}
            height={chartOptions.height || this.state.height}>
            <g transform={transform}>
              {/*{backgroundRects}*/}
              {foregroundRects}
              {/*{yLabels}*/}
            </g>
            {/*<g transform={transformXAxis}>

            </g>*/}
          </svg>
        </div>
      )
    } else {
      console.log(`Loading Loader...`)
      return (
        <div style={{height: chartBoxheight, width: chartBoxwidth}}>
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