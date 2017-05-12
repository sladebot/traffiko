import React, { Component } from 'react'
import d3 from 'd3'

class Arc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.arc = d3.svg.arc()
  }

  clickHandler = (e) => {
    debugger
    this.setState({
      clicked: this.state.clicked ? false : true
    })
    console.log(`Clicked on Path`)
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

    const fillColor = this.state.clicked ? '#1565C0' : this.props.color

    return <path d={this.arc(this.props.data)}
                 onClick={this.props.onClick || this.clickHandler.bind(this)}
                 style={{fill: fillColor}}></path>
  }
}

export default Arc