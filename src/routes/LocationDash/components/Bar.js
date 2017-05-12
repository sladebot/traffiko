import React, { Component } from 'react'

class Bar extends Component {
  render() {
    const { index, xScaleFn, yScaleFn, width, height, opacity, fill="black", stroke="black", yMetric } = this.props
    
    return (
      <rect
        x={xScaleFn(index)}
        y={yScaleFn(yMetric)}
        width={width}
        height={height - yScaleFn(yMetric)}
        fill={fill}
        opacity={opacity}
        stroke={stroke}
        />
    )
  }
}

export default Bar