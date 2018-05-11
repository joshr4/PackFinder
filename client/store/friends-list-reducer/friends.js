import axios from 'axios';
import history from '../../history';

/**
 * ACTION TYPES
 */

const GET_FRIENDS_LIST = 'GET_FRIENDS_LIST';
const REMOVE_FRIEND = 'REMOVE_FRIEND';

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */
const get = friendsList => ({
  type: GET_FRIENDS_LIST,
  friendsList,
});
const remove = () => ({
  type: REMOVE_FRIEND,
});

/**
 * THUNK CREATORS
 */

export const getFriendsList = (userId) => dispatch =>
axios
  .get(`/api/users/${userId}/friends`)
  .then(res => dispatch(get(res.data || defaultList)))
  .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultList, action) {
  switch (action.type) {
    case GET_FRIENDS_LIST:
    return action.friendsList;
    default:
      return state;
  }
}
