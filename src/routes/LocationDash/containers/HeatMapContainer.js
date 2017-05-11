import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import DeckGLOverlay from '../components/DeckGLOverlay'
import Spinner from 'react-spinkit'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpzaGluIiwiYSI6ImNqMXVkaXBiZTAwN3cycnBwcHF0N3MyOXkifQ.IyHqcYVK0COvUWFKnhcZGA'

class HeatMapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...props,
      viewport: {
        ...DeckGLOverlay.defaultViewport
      },
      heatmap_data: []
    }

    axios.get(`/api/v1/heatmap`)
      .then(response => {
        const data = response.data.map(d => ([Number(d.longitude), Number(d.latitude)]))
        this.setState({
          heatmap_data: data
        });
      })
      .catch(_err => {
        console.log(`Something went wrong in fetching map data`)
      })
  }


  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  _resize() {
    let element = document.getElementById('heatmap')
    this._onChangeViewport({
      width: 700,
      height: 600
    })
  }

  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  render() {
    const viewport = this.state.viewport

    if(this.state.heatmap_data.length > 0) {
      return (
        <MapGL
          {...viewport}
          height={600}
          width={700}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          perspectiveEnabled={false}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay
            viewport={viewport}
            heatmap_data={this.state.heatmap_data}
            />
          </MapGL>
      )
    } else {
      return (
        <div style={{height: (600), width:  (700)}}>
          <Spinner 
            spinnerName="cube-grid"
            className='center'
            />
        </div>
      )
    }
  }
}

export default HeatMapContainer