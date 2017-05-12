import React, { Component } from 'react'

class Bar extends Component {
  render() {
    const { index, xScaleFn, yScaleFn, width, height, fill="black", stroke="black", yMetric } = this.props
    
    return (
      <rect
        x={xScaleFn(index)}
        y={yScaleFn(yMetric)}
        width={width}
        height={height - yScaleFn(yMetric)}
        fill={fill}
        stroke={stroke}
        />
    )
  }
}

export default Bar