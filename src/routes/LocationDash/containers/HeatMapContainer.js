import React, { Component } from 'react'
// import { render } from 'react-dom'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import DeckGLOverlay from '../components/DeckGLOverlay'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpzaGluIiwiYSI6ImNqMXVkaXBiZTAwN3cycnBwcHF0N3MyOXkifQ.IyHqcYVK0COvUWFKnhcZGA'

class HeatMapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props,
      viewport: {
        ...DeckGLOverlay.defaultViewport
      }
    }
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
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  render() {
    const { heatmap_data } = this.props
    // console.log(`HEATMAP DATA IN CONTAINER - ${heatmap_data.length}`)
    const viewport = this.state.viewport
    return (
      <MapGL
        {...viewport}
        height={600}
        width={700}
        mapStyle="mapbox://styles/mapbox/dark-v9"
		    perspectiveEnabled={true}
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay
          viewport={viewport}
          heatmap_data={heatmap_data}
          />
        </MapGL>
    )
  }
}

export default HeatMapContainer