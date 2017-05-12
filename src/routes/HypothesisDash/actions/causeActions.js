import axios from 'axios'

function filterParams(filter) {
  return Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
}

export function fetchAccidentCauseData(filter={'type': null,'timeframe': null}) {
  return (dispatch) => {
    console.log(`Calling API`)
    let filteredParams = filterParams(filter);
    axios.get(`/api/v1/cause_bar?${filteredParams}`)
      .then(response => {
        console.log(`Dispatching cause bar data action`)
        dispatch({type: 'FETCH_CAUSE_BAR_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        console.log('error')
        dispatch({type: 'FETCH_CAUSE_BAR_DATA_REJECTED', payload: err})
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