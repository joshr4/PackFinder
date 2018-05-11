import axios from 'axios';
import history from '../../history';

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
const get = user => ({
  type: GET_SENT_REQUESTS,
  user,
});
const remove = () => ({
  type: REMOVE_SENT_REQUEST,
});
const send = () => ({
  type: SEND_REQUEST,
});



/**
 * THUNK CREATORS
 */

export const getSentRequests = (userId) => dispatch =>
axios
  .get(`/api/users/${userId}/sent-requests`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function(state = defaultList, action) {
  switch (action.type) {
    case GET_SENT_REQUESTS:
    return action.sentRequests;
    default:
      return state;
  }
}
