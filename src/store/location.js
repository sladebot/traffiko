import browserHistory from 'react-router/lib/browserHistory'

export const LOCATION_CHANGE = 'LOCATION_CHANGE'

export function locationChange ( location = '/' ) {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

export const updateLocation = ({dispatch}) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

const initialState = browserHistory.getCurrentLocation()
export default function locationReducer(state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}