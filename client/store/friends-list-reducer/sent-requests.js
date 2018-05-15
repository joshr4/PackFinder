import axios from 'axios';
import history from '../../history';
import socket from '../../socket';

/**
 * ACTION TYPES
 */
const GET_SENT_REQUESTS = 'GET_SENT_REQUESTS';
const REMOVE_SENT_REQUEST = 'REMOVE_SENT_REQUEST';
const SEND_REQUEST = 'SEND_REQUEST';

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */
const get = sentRequests => ({
  type: GET_SENT_REQUESTS,
  sentRequests,
});
const remove = (requesteeId) => ({
  type: REMOVE_SENT_REQUEST,
  requesteeId,
});
const send = (requestee) => ({
  type: SEND_REQUEST,
  requestee,
});

/**
 * THUNK CREATORS
 */
export const getSentRequests = (userId) => dispatch => {
  // console.log('hitting thunk getSent')
  return axios
    .get(`/api/users/${userId}/sent-requests`)
    .then(res => dispatch(get(res.data)))
    .catch(err => console.log(err));
}
export const addSentRequest = (userId, friendId) => dispatch => {
  // console.log('hitting thunk addSentRequest')
  return axios
    .post(`/api/users/${userId}/friend-request`, {
      friendId
    })
    .then(res => dispatch(send(res.data)))
    .catch(err => console.log(err));
}

export const removeSentRequest = (userId, friendId) => dispatch => {
  console.log('hitting thunk removeSentRequest')
  return axios
    .put(`/api/users/${userId}/cancel-request`, {
      friendId
    })
    .then(res => {
      dispatch(remove(res.data.id))
      socket.emit('cancel-sent-request', {
        friendId,
        userId
      })
    })
    .catch(err => console.log(err));
}
export const removeSentRequestSocket = (requestId) => dispatch =>
  axios
  .get(`/api/users/simple/${requestId}`)
  .then(res => dispatch(remove(res.data.id)))
  .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = defaultList, action) {
  switch (action.type) {
    case GET_SENT_REQUESTS:
      return action.sentRequests;
    case REMOVE_SENT_REQUEST:
      return state.filter(request => request.id !== action.requesteeId);
    case SEND_REQUEST:
      return [...state, action.requestee]
    default:
      return state;
  }
}
