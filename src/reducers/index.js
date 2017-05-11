import { combineReducers } from 'redux'
import locationReducer from './location'
import heatMapReducer from './heatMapDash'
import parallelCoordinateReducer from './parallelCoordinateReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    heatMap: heatMapReducer,
    parallel: parallelCoordinateReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if(Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer