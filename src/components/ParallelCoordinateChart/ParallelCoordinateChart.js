import React, { Component } from 'react'
import d3 from 'd3'
import Spinner from 'react-spinkit'
import _ from 'lodash'
import axios from 'axios'
import {json as requestJSON} from 'd3-request';

class ParallelCoordinateChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      props,
      data: [],
      dimensions: [],
      y: {},
      x: d3.scale.ordinal().rangePoints([0, 900], 1),
      dragging: [],
      line: d3.svg.line(),
      axis: d3.svg.axis().orient("left")
    }
  }

  _getData = () => {
    requestJSON(`/parallelCoordinates.json`, (error, response) => {
      if (!error) {
        const data = response;
        this._drawParallelChart(data).bind(this)
      } else {
        console.log(`Someothing wrong happening while getting parallel coordinate data`)
      }
    })
  }

  _drawParallelChart = (data) => {
    var margin = {top: 30, right: 10, bottom: 10, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var x = d3.scale.ordinal().rangePoints([0, width], 1)

    
    var  background,
        foreground;

    var svg = d3.select("#parallelChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    let dimensions = _.without(_.keys(data[0]), '_id')
      
    this.setState({
      dimensions: dimensions
    })

    this.state.x.domain(dimensions.filter((d) => {
      return d != "_id" && (this.state.y[d] = d3.scale.linear()
          .domain(d3.extent(data, (p) => {
            return +p[d]; }))
          .range([height, 0]));
      }, this)).bind(this);


    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", this.path.bind(this));

    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", this.path.bind(this));

    // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", (d) => { return "translate(" + this.state.x(d) + ")"; })
      // .call(d3.behavior.drag()
      //   .origin((d) => { return {x: x(d)}; })
      //   .on("dragstart", (d) => {
      //     this.state.dragging[d] = x(d);
      //     background.attr("visibility", "hidden");
      //   })
      //   .on("drag", (d) => {
      //     this.state.dragging[d] = Math.min(width, Math.max(0, d3.event.x));
      //     foreground.attr("d", this.path.bind(this));
      //     dimensions.sort((a, b) => { return this.position(a, x).bind(this) - this.position(b).bind(this); });
      //     x.domain(dimensions);
      //     g.attr("transform", (d) => { return "translate(" + this.position(d).bind(this) + ")"; })
      //   })
      //   .on("dragend", (d) => {
      //     delete this.state.dragging[d];
      //     this.transition(d3.select(this)).bind(this).attr("transform", "translate(" + x(d) + ")");
      //     this.transition(foreground).bind(this).attr("d", this.path.bind(this));
      //     background
      //         .attr("d", this.path.bind(this))
      //       .transition()
      //         .delay(500)
      //         .duration(0)
      //         .attr("visibility", null);
      //   }));
    
     // Add an axis and title.

    let x = this.state.x
    let axis = this.state.axis

      
    g.append("g")
        .attr("class", "axis")
        // .each((d) => {
        //   return d3.select(this)
        // })
        .each(function(d) {
          debugger
          return d3.select(this).call(this.state.axis.scale(this.state.y[d]))
        })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text((d) => { return d; });

    // Add and store a brush for each axis.
    // g.append("g")
    //     .attr("class", "brush")
    //     .each((d) => {
    //       d3.select(this).call(this.state.y[d].brush = d3.svg.brush().y(this.state.y[d]).on("brushstart", brushstart).on("brush", brush));
    //     })
    //   .selectAll("rect")
    //     .attr("x", -8)
    //     .attr("width", 16);


  }

  position = (d) => {
    var v = this.state.dragging[d];
    return v == null ? this.state.x(d) : v;
  }

  transition = (g) => {
    return g.transition().duration(500);
  }

  // Returns the  path for a given data point.
  path = (d) => {
    return this.state.line(this.state.dimensions.map((p) => { 
      return [this.position(p), this.state.y[p](d[p])]; 
    }, this))
  }

  brushstart = () => {
    d3.event.sourceEvent.stopPropagation();
  }

  componentDidMount() {
    this._getData()
  }
   
  render() {
    return (
      <div id = "parallelChart"></div> 
    )
  }
}



export default ParallelCoordinateChart