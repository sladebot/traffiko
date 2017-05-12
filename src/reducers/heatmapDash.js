const initialState = {
  heatmap_data: [],
  selectedCause: "ALL",
  accident_reasons_data: [],
  borough_cause_dash_borough: [],
  borough_cause_dash_causes: [],
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
    case 'FETCH_CAUSE_BAR_DATA_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        accident_reasons_data: action.payload
      }
    }
    case 'FETCH_CAUSE_BAR_DATA_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_FULFILLED': {
      console.log(`Borough dashboard reducer trigerred and got ${action.payload.selectedCause}`)
      return {
        ...state,
        fetching: false,
        fetched: true,
        selectedCause: action.payload.selectedCause,
        borough_cause_dash_borough: action.payload.borough,
        borough_cause_dash_causes: action.payload.causes
      }
    }
    case 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
  }
  return state
}