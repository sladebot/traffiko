import React, { Component } from 'react'
import d3 from 'd3'

class Arc extends Component {
  constructor(props) {
    super(props)
    this.arc = d3.svg.arc()
  }

  // componentWillMount() {
  //   this.updateD3(this.props)
  // }

  // componentWillReceiveProps(newProps) {
  //   this.updateD3(newProps)
  // }

  updateD3(innerRadius, outerRadius) {
    this.arc.innerRadius(innerRadius)
    this.arc.outerRadius(outerRadius)
  }

  render() {
    const { innerRadius, outerRadius } = this.props
    this.updateD3(innerRadius, outerRadius)
    debugger
    return <path d={this.arc(this.props.data)}
                 style={{fill: this.props.color}}></path>
  }
}

export default Arc