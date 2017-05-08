'use strict'

import React, { Component } from 'react'
import { BarBrush } from 'react-d3-brush'


class BarChart extends Component {

  

  render() {
    const { accident_reasons_data, height, width, title } = this.props
    return (
      <BarBrush 
        data={accident_reasons_data}
        height={height}
        width={width}
        title={title}
        />
    )
  }
}


export default BarChart