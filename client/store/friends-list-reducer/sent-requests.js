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
const remove = (requestee) => ({
  type: REMOVE_SENT_REQUEST,
  requestee,
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
  console.log('hitting thunk addSentRequest')
  return axios
    .post(`/api/users/${userId}/friend-request`, {friendId})
    .then(res => dispatch(send(res.data)))
    .catch(err => console.log(err));
}

export const removeSentRequest = (userId, friendId) => dispatch => {
  console.log('hitting thunk removeSentRequest')
  return axios
    .put(`/api/users/${userId}/cancel-request`, {friendId})
    .then(res => dispatch(remove(res.data)))
    .catch(err => console.log(err));
}
export const removeSentRequestSocket = (request) => dispatch => dispatch(remove(request))



/**
 * REDUCER
 */
export default function(state = defaultList, action) {
  switch (action.type) {
    case GET_SENT_REQUESTS:
      return action.sentRequests;
    case REMOVE_SENT_REQUEST:
      return state.filter(request => request.id !== action.requestee.id);
    case SEND_REQUEST:
      return [...state, action.requestee]
    default:
      return state;
  }
}
