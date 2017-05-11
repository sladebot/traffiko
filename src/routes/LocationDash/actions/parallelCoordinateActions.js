import axios from 'axios'

export function fetchParallelCoordinatePlotData() {
  console.log(`Action called !`)
  return (dispatch) => {
    console.log('Sending get request')
    let cachedData = localStorage.getItem('parallelCoordinates')
    if(cachedData) {
      dispatch({type: 'GOT_PARALLEL_COORDINATES_DATA_CACHED', payload: cachedData})
    } else {
      axios.get(`/api/v1/parallelCoordinatesData`)
        .then(response => {
          console.log('Got response')
          let cachedData = localStorage.setItem('parallelCoordinates', response)
          dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_FULFILLED', payload: response.data})
        })
        .catch(err => {
          console.log('Got error')
          dispatch({type: 'FETCH_PARALLEL_COORDINATES_DATA_REJECTED', payload: err})
        })
    }

  }
}