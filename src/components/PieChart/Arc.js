import React, { Component } from 'react'
import d3 from 'd3'

class Arc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      hovering: false
    }
    this.arc = d3.svg.arc()
  }


  clickHandler = (e) => {
    this.setState({
      clicked: this.state.clicked ? false : true
    })
    console.log(`Clicked on Path`)
  }

  updateD3(innerRadius, outerRadius) {
    this.arc.innerRadius(innerRadius)
    this.arc.outerRadius(outerRadius)
  }

  render() {
    const { innerRadius, outerRadius } = this.props
    this.updateD3(innerRadius, outerRadius)

    return <path d={this.arc(this.props.data)}
                 onMouseEnter={(e) => {this.setState({hovering: true})}}
                  onMouseLeave={(e) => {this.setState({hovering: false})}}
                 onClick={(e) => this.props.onClick(this.props.data.data.cause) || this.clickHandler.bind(this)}
                 style={{fill: this.state.hovering ? '#F5F5F5' : this.props.color}}></path>
  }
}

export default Arc