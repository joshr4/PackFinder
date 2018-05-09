import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS';
const DELETE_FRIEND = 'DELETE_FRIEND';
const UPDATE_FRIEND = 'UPDATE_FRIEND';
const ADD_FRIEND = 'ADD_FRIEND';

/**
 * INITIAL STATE
 */
const defaultFriends = [];

/**
 * ACTION CREATORS
 */
const getAllFriends = friends => ({ type: GET_FRIENDS, friends });
const delFriend = friend => ({ type: DELETE_FRIEND, friend });
const updFriend = friend => ({ type: UPDATE_FRIEND, friend });
const addNewFriend = friend => ({ type: ADD_FRIEND, friend });

/**
 * THUNK CREATORS
 */
export const getFriends = () => dispatch =>
  axios
    .get('/api/user/friends')
    .then(res => dispatch(getAllFriends(res.data || defaultFriends)))
    .catch(err => console.log(err));

export const deleteFriend = friend => dispatch =>
  axios
    .delete(`/api/friends/${friend.id}`)
    .then(() => dispatch(delFriend(friend || defaultFriends)))
    .catch(err => console.log(err));

export const updateFriend = friend => dispatch =>
  axios
    .put(`/api/friends/${friend.id}`, friend)
    .then(res => dispatch(updFriend(res.data || defaultFriends)))
    .catch(err => console.log(err));

export const addFriend = friend => dispatch =>
  axios
    .post(`/api/friends/`, friend)
    .then(res => dispatch(addNewFriend(res.data || defaultFriends)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultFriends, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends;
    case UPDATE_FRIEND:
      return state.map(
        friend => (action.friend.id !== friend.id ? friend : action.friend)
      );
    case DELETE_FRIEND:
      return state.filter(friend => action.friend.id !== friend.id);
    case ADD_FRIEND:
      return [...state, action.friend];
    default:
      return state;
  }
}
