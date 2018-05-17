import axios from 'axios';

// import history from '../history';

/**
 * ACTION TYPES
 */
const GET_GOOGLE_MAP_LOCATION = 'GET_GOOGLE_MAP_LOCATION';
const MAP_API_ERROR = 'MAP_API_ERROR';

/**
 * INITIAL STATE
 */
const INIT_STATE = {
  coords: {
    latitude: 41.8781,
    longitude: -87.6298
  }
}

/**
 * ACTION CREATORS
 */

const getMapLocation = function (payload) {

  console.log(payload)
  if (payload.status === 'OK'){
  return (
  {
  type: GET_GOOGLE_MAP_LOCATION,
  payload: {coords: {
    latitude: payload.results[0].geometry.location.lat,
    longitude: payload.results[0].geometry.location.lng
  }
  }
})
  }
  else {
    return ({type: MAP_API_ERROR, error: payload.status})
  }
}

/**
 * THUNK CREATORS
 */

export function getGoogleMapLocation(address) {

  return dispatch => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY'
      }})
    .then(res => dispatch(getMapLocation(res.data)))
    .catch(err => dispatch({type: MAP_API_ERROR, error: err}));
};
}

/**
 * REDUCER
 */
export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_GOOGLE_MAP_LOCATION:
      return action.payload;
    default:
      return state
    }
}
