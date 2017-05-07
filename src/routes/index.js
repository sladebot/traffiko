import CoreLayout from '../layouts/CoreLayout'
import LocationDash from './LocationDash'
// import CauseDashRoute from './CauseDash'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LocationDash,
  childRoutes: [
    // CauseDashRoute(store)
  ]
})

export default createRoutes