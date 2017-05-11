import React, { Component } from 'react'
import Arc from './Arc'
class LabeledArc extends Arc {
  render () {
    const { innerRadius, outerRadius, color, data } = this.props
    let d = data
    d.innerRadius = innerRadius
    d.outerRadius = outerRadius
    debugger
    let [labelX, labelY] = this.arc.centroid(d)
    let labelTranslate = `translate(${labelX}, ${labelY})`

    return (
      <g fill='#F5F5F5' stroke='black'>
        {super.render()}
        <text transform={labelTranslate}
              textAnchor="middle"
              fill="black">
              {this.props.data.data.category}
        </text>
      </g>
    )
  }
}

export default LabeledArc