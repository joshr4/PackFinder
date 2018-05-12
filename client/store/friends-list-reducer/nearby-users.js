import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const GET_NEARBY_USERS = 'GET_NEARBY_USERS';

/**
 * INITIAL STATE
 */
const nearbyUsers = [];

/**
 * ACTION CREATORS
 */
const getNearbyUsers = users => ({ type: GET_NEARBY_USERS, users });
/**
 * THUNK CREATORS
 */

export const getNearByUsersInfo = (location) => dispatch =>
    axios
      .get(`/api/users/${location.lat}/${location.lng}/1609`) //1 mile
      .then(res => dispatch(getNearbyUsers(res.data)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = nearbyUsers, action) {
  switch (action.type) {
    case GET_NEARBY_USERS:
      return action.users;
    default:
      return state;
  }
}
