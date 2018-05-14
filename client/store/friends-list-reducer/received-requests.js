import axios from 'axios';
import history from '../../history';
import {
  add
} from './';
import socket from '../../socket';

/**
 * ACTION TYPES
 */
const GET_RECEIVED_REQUESTS = 'GET_RECEIVED_REQUESTS';
const REMOVE_RECEIVED_REQUEST = 'REMOVE_RECEIVED_REQUEST';
const APPROVE_RECEIVED_REQUEST = 'APPROVE_RECEIVED_REQUEST';

/**
 * INITIAL STATE
 */
const defaultList = [];

/**
 * ACTION CREATORS
 */
const get = receivedRequests => ({
  type: GET_RECEIVED_REQUESTS,
  receivedRequests,
});
const remove = requesterId => ({
  type: REMOVE_RECEIVED_REQUEST,
  requesterId,
});
const approve = () => ({
  type: APPROVE_RECEIVED_REQUEST,
});

/**
 * THUNK CREATORS
 */

export const approveRequest = (userId, friendId) => dispatch => {
  // console.log('approve req', userId ,senderId)
  axios
    .put(`/api/users/${userId}/approve-request`, {
      friendId,
    })
    .then(res => {
      console.log('res.data inside approve rew', res.data);
      dispatch(remove(friendId));
      dispatch(add(res.data));
      socket.emit('accept-request', {
        friend: res.data,
        friendId
      })
    });
};
export const acceptRequestSocket = (friend) => dispatch => dispatch(add(friend))

// .get(`/api/users/${userId}/received-requests`)

export const getReceivedRequests = userId => dispatch =>
  axios
  .get(`/api/users/${userId}/received-requests`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.log(err));

export const declineRequest = (userId, friendId) => dispatch =>
  axios
  .put(`/api/users/${friendId}/cancel-request`, {
    friendId: userId
  })
  .then(() => dispatch(remove(friendId)))
  .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultList, action) {
  switch (action.type) {
    case GET_RECEIVED_REQUESTS:
      return action.receivedRequests;
    case REMOVE_RECEIVED_REQUEST:
      return state.filter(request => request.id !== action.requesterId);
    case APPROVE_RECEIVED_REQUEST:
      return state.map(map => map.id !== action.requester.id);
    default:
      return state;
  }
}
