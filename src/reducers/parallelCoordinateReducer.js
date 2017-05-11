const initialState = {
  parallel_coordinate_data: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function parallelCoordinateReducer(state=initialState, action) {
  switch(action.type) {
    case "FETCH_PARALLEL_COORDINATES_DATA_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_PARALLEL_COORDINATES_DATA_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        parallel_coordinate_data: action.payload
      }
    }
    case 'GOT_PARALLEL_COORDINATES_DATA_CACHED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        parallel_coordinate_data: action.payload
      }
    }
  }
  return state
}