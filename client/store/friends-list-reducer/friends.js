import axios from 'axios';
import history from '../../history';

/**
 * ACTION TYPES
 */

const GET_FRIENDS_LIST = 'GET_FRIENDS_LIST';
const REMOVE_FRIEND = 'REMOVE_FRIEND';
const ADD_FRIEND = 'ADD_FRIEND';

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
export const add = (friend) => ({
  type: ADD_FRIEND, friend
});

/**
 * THUNK CREATORS
 */

// export const addFriend = (friend) => dispatch => dispatch(add(friend))

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
    case ADD_FRIEND:
    return [...state, action.friend];
    default:
      return state;
  }
}
