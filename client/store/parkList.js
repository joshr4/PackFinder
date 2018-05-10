import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PARKS = 'GET_PARKS';
const GET_NEARBY_PARKS = 'GET_NEARBY_PARKS';

/**
 * INITIAL STATE
 */
const nearbyParks = [];

/**
 * ACTION CREATORS
 */
const getAllAddresses = addresses => ({ type: GET_PARKS, addresses });
const getNearbyParks = addresses => ({ type: GET_NEARBY_PARKS, addresses });

/**
 * THUNK CREATORS
 */
export const getParksAddresses = () => dispatch =>
  axios
    .get('/api/parks')
    .then(res => dispatch(getAllAddresses(res.data)))
    .catch(err => console.log(err));


export const getNearByParksAddresses = (location, dist) => dispatch =>
    {let distance = dist || 1609;
      return axios
      .get(`/api/parks/${location.lat}/${location.lng}/${distance}`)
      .then(res => dispatch(getNearbyParks(res.data)))
      .catch(err => console.log(err));
    }

/**
 * REDUCER
 */
export default function(state = nearbyParks, action) {
  switch (action.type) {
    case GET_PARKS:
      return action.addresses;
    case GET_NEARBY_PARKS:
      return action.addresses;
    default:
      return state;
  }
}
