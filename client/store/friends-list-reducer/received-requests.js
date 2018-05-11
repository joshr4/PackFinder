import axios from 'axios';
import history from '../../history';

/**
 * ACTION TYPES
 */
const GET_RECEIVED_REQUESTS = 'GET_RECEIVED_REQUESTS';
const REMOVE_RECEIVED_REQUEST = 'REMOVE_RECEIVED_REQUEST';

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */
const get = user => ({
  type: GET_RECEIVED_REQUESTS,
  user,
});
const remove = () => ({
  type: REMOVE_RECEIVED_REQUEST,
});

/**
 * THUNK CREATORS
 */

export const getRecivedRequests = (userId) => dispatch =>
axios
  .get(`/api/users/${userId}/received-requests`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function(state = defaultList, action) {
  switch (action.type) {
    case GET_RECEIVED_REQUESTS:
    return action.sentRequests;
    default:
      return state;
  }
}
