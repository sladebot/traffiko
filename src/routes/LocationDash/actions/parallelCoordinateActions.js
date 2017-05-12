import axios from 'axios'

export function fetchParallelCoordinatePlotData() {
  return (dispatch) => {
    let cachedData = localStorage.getItem('parallelCoordinates')
    if(cachedData) {
      dispatch({type: 'GOT_PARALLEL_COORDINATES_DATA_CACHED', payload: cachedData})
    } else {
      axios.get(`/api/v1/parallelCoordinatesData`)
        .then(response => {
          let cachedData = localStorage.setItem('parallelCoordinates', response)
          dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_FULFILLED', payload: response.data})
        })
        .catch(err => {
          dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_REJECTED', payload: err})
        })
    }

  }
}