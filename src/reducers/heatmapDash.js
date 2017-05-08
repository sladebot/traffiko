const initialState = {
  heatmap_data: [],
  accident_reasons_data: [],
  borough_data: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function heatMapReducer(state=initialState, action) {
  switch(action.type) {
    case "FETCH_HEATMAP_DATA": {
      return {...state, fetching: true}
    }
    case "FETCH_HEATMAP_DATA_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_HEATMAP_DATA_FULFILLED": {
      const filter_heatmap_data = action.payload.map(d => ([Number(d[0]), Number(d[1])]))
      return {
        ...state,
        fetching: false,
        fetched: true,
        heatmap_data: filter_heatmap_data
      }
    }
  }
  return state
}