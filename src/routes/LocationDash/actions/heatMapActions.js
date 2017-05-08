import axios from 'axios'

export function fetchHeatMapData(filter={'type': null,'timeframe': null}) {
  return (dispatch) => {
    let filterParams = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
    axios.get(`/api/v1/heatmap?${filterParams}`)
      .then(response => {
        dispatch({type: 'FETCH_HEATMAP_DATA_FULFILLED', payload: response.data})
      })
      .catch(err => {
        dispatch({type: 'FETCH_HEATMAP_DATA_REJECTED', payload: err})
      })
  }
}