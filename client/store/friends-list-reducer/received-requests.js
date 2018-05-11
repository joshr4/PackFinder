import axios from 'axios';
import history from '../../history';

/**
 * ACTION TYPES
 */
const GET_RECEIVED_REQUESTS = 'GET_RECEIVED_REQUESTS';
const REMOVE_RECEIVED_REQUEST = 'REMOVE_RECEIVED_REQUEST';
const APPROVE_RECEIVED_REQUEST = 'APPROVE_RECEIVED_REQUEST';

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */
const get = receivedRequests => ({
  type: GET_RECEIVED_REQUESTS,
  receivedRequests,
});
const remove = () => ({
  type: REMOVE_RECEIVED_REQUEST,
});
const approve = () => ({
  type: APPROVE_RECEIVED_REQUEST,
});

/**
 * THUNK CREATORS
 */

export const getReceivedRequests = (userId) => dispatch =>
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
    return action.receivedRequests;
    default:
      return state;
  }
}
