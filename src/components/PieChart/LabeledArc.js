import React, { Component } from 'react'
import Arc from './Arc'
class LabeledArc extends Arc {
  render () {
    const { innerRadius, outerRadius, color, data } = this.props
    let d = data
    d.innerRadius = innerRadius
    d.outerRadius = outerRadius
    let [labelX, labelY] = this.arc.centroid(d)
    let labelTranslate = `translate(${labelX}, ${labelY})`
    return (
      <g fill='#F5F5F5' stroke='black'>
        {super.render()}
        <text transform={labelTranslate}
              onClick={this.props.onClick.bind(this, this.props.data.data.cause)}
              textAnchor="middle"
              stroke="transparent"
              fill={this.state.hovering ? "black": "#F5F5F5"}
              onMouseEnter={(e) => {this.setState({hovering: true})}}
              onMouseLeave={(e) => {this.setState({hovering: false})}}
              >
              {this.props.data.data.cause.split("/")[0]}
        </text>
      </g>
    )
  }
}

export default LabeledArc