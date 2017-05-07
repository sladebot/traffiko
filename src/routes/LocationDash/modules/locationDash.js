export const SELECT_ACCIDENT_TYPE = 'SELECT_ACCIDENT_TYPE'
export const SELECT_BOROUGH = 'SELECT_BOROUGH'

// Types => ['death', 'injury']
export function selectAccidentType(type=null) {
  return {
    type: SELECT_ACCIDENT_TYPE,
    payload: type
  }
}

export function selectBorough(borough=null) {
  return {
    type: SELECT_BOROUGH,
    payload: borough
  }
}

const initialState = {
  borough: null,
  type: null
}

const ACTION_HANDLERS = {
  [SELECT_ACCIDENT_TYPE] : (state, action ) => {
    // XHR
    return state
  },
  [SELECT_BOROUGH] : (state, action ) => {
    // XHR
    return state
  }
}

export default function locationDashReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}