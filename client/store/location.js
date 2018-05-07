import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

/**
 * INITIAL STATE
 */
const INIT_STATE = {
  coords: {
    latitude: 0,
    longitude: 0
  }
}

/**
 * ACTION CREATORS
 */

const getUserLocation = payload => ({
  type: RECEIVE_LOCATION,
  payload: payload
})

/**
 * THUNK CREATORS
 */
export function getGeolocation() {
  return dispatch => {
      const geolocation = navigator.geolocation;
      geolocation.getCurrentPosition((position) => {
          // console.log(position.coords);
          dispatch({
              type: RECEIVE_LOCATION,
              payload: position
          });
      });
};
}

/**
 * REDUCER
 */
export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case RECEIVE_LOCATION:
      return action.payload;
    default:
      return state
    }
}
