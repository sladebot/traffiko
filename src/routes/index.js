import CoreLayout from '../layouts/CoreLayout'
import Dash from './LocationDash'
// import CauseDashRoute from './CauseDash'

export default (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Dash,
  childRoutes: [
    // CauseDashRoute(store)
  ]
})