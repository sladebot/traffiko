import React, { Component } from 'react'
import { browserHistory, Router, Route } from 'react-router'
import { Provider } from 'react-redux'

import CoreLayout from '../layouts/CoreLayout'
import Dash from '../routes/LocationDash'
import HypothesisDash from '../routes/HypothesisDash'

class AppContainer extends Component {

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={CoreLayout}>
            <Route path="/" component={Dash} />
            <Route path="/hypothesis" component={HypothesisDash} />
            
          </Route>
        </Router>
      </Provider>
    )
  }
}

export default AppContainer