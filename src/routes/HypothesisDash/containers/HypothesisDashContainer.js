import React, { Component } from 'react'
import { connect } from 'react-redux'


class HypothesisDashContainer extends Component {
  render() {
    const { 
      fetching, 
      fetched} = this.props
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col" id="heatmap">
              
            </div>
            <div className="mdl-cell mdl-cell--12-col" id="heatmap">
              <iframe src="http://localhost:3000/parallel.html" style={{height: 550, width: 1400, overflow: 'hidden'}} scrolling="no"></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {fetching, fetched} = state
  return {
    fetching,
    fetched
  }
}

const actions = {}

export default connect(mapStateToProps, actions)(HypothesisDashContainer)