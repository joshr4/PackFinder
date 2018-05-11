import axios from 'axios';
import history from '../../history';
import {addFriend} from './'

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
const remove = (requester) => ({
  type: REMOVE_RECEIVED_REQUEST,
  requester,
});
const approve = () => ({
  type: APPROVE_RECEIVED_REQUEST,
});

/**
 * THUNK CREATORS
 */

export const approveRequest = (userId, senderId) => dispatch => 
axios.
  put(`/api/users/${userId}/approve-request`, {friendId:senderId})
  .then(res => {
    dispatch(remove(res.data))
    dispatch(add(res.data))
  })
  // .get(`/api/users/${userId}/received-requests`)

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
    case APPROVE_RECEIVED_REQUEST:
    return state.map(map => map.id !== action.requester.id)
    default:
      return state;
  }
}
