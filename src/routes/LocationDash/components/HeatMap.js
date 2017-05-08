import React, { Component } from 'react'
// import { render } from 'react-dom'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import DeckGLOverlay from './DeckGLOverlay'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpzaGluIiwiYSI6ImNqMXVkaXBiZTAwN3cycnBwcHF0N3MyOXkifQ.IyHqcYVK0COvUWFKnhcZGA'

class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props,
      viewport: {
        ...this.props.viewport
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
    // console.log('Main props - ' + JSON.stringify(this.props))
    const { heatmap_data, viewport } = this.props
    // const  } = this.state
    // console.log("MAin Data - " + JSON.stringify(heatmap_data))
    return (
      <MapGL 
        {...viewport}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay
          viewport={viewport}
          heatmap_data={heatmap_data || []}
          />
        </MapGL>
    )
  }
}

// const mapStateToProps = ({ heatmap_data, viewport }) => {
//   return {
//     heatmap_data,
//     viewport
//   }
// }

export default HeatMap
// export default connect(mapStateToProps)(HeatMap)