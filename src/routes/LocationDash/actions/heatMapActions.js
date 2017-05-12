import axios from 'axios'

function filterParams(filter) {
  return Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
}


export function fetchHeatMapData(filter={'type': null,'timeframe': null}) {
  return (dispatch) => {
    let filteredParams = filterParams(filter)
    axios.get(`/api/v1/heatmap?${filteredParams}`)
      .then(response => {
        dispatch({type: 'FETCH_HEATMAP_DATA_FULFILLED', payload: response.data.data})
      })
      .catch(err => {
        console.log('error')
        dispatch({type: 'FETCH_HEATMAP_DATA_REJECTED', payload: err})
      })
  }
}

export function fetchAccidentCauseData(filter={'type': null,'timeframe': null}) {
  return (dispatch) => {
    let filteredParams = filterParams(filter);
    axios.get(`/api/v1/cause_bar?${filteredParams}`)
      .then(response => {
        dispatch({type: 'FETCH_CAUSE_BAR_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        console.log('error')
        dispatch({type: 'FETCH_CAUSE_BAR_DATA_REJECTED', payload: err})
      })
  }
}

export function fetchBoroughCauseDashboard(filter={}) {
  return (dispatch) => {
    let filteredParams = filterParams(filter)
    axios.get(`/api/v1/dashboard/borough_cause?${filteredParams}`)
      .then(response => {
        dispatch({type: 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        console.log('error')
        dispatch({type: 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_REJECTED', payload: err})
      })
  }
}


export function fetchParallelCoordinatePlotData() {
  return (dispatch) => {
    axios.get(`/api/v1/parallelCoordinatesData`)
      .then(response => {
        dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        console.log('error')
        dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_REJECTED', payload: err})
      })
  }
}

export function filterByAccidentCause(cause="ALL") {
  console.log(`Just action triggered`)
  return (dispatch) => {
    console.log(`Click happened dispatching`)
    // let filteredParams = filterParams(filter)
    axios.get(`/api/v1/dashboard/borough_cause?cause=${cause}`)
      .then(response => {
        dispatch({type: 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        console.log('error')
        console.log(err)
        dispatch({type: 'FETCH_BOROUGH_CAUSE_DASHBOARD_DATA_REJECTED', payload: err})
      })
  }
}