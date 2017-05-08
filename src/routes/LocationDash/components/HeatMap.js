import React, { Component } from 'react'
import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import DeckGLOverlay from './DeckGLOverlay'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpzaGluIiwiYSI6ImNqMXVkaXBiZTAwN3cycnBwcHF0N3MyOXkifQ.IyHqcYVK0COvUWFKnhcZGA'

class HeatMap extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...props,
      viewport: {
        ...DeckGLOverlay.defaultViewport
      }
    }
    console.log(`Setting default viewport to - ${JSON.stringify(this.state.viewport)}`)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  _resize() {
    let element = document.getElementById('heatmap')
    this._onChangeViewport({
      width: element.offsetWidth,
      height: element.offsetHeight
    })
  }

  _onChangeViewport(viewport) {
    console.log(`While viewport changing state -  ${JSON.stringify(this.state)}`)
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  render() {
    console.log(`Starting to render`)
    const { data } = this.props
    const { viewport } = this.state
    return (
      <MapGL 
        {...viewport}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay 
          viewport={viewport}
          data={data || []}
          />
        </MapGL>
    )
  }
}

export default HeatMap