import axios from 'axios';
import history from '../../history';
import socket from '../../socket';

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
const remove = (removeId) => ({
  type: REMOVE_FRIEND,
  removeId
});
export const add = (friend) => ({
  type: ADD_FRIEND,
  friend
});

/**
 * THUNK CREATORS
 */

export const getFriendsList = (userId) => dispatch =>
  axios
  .get(`/api/users/${userId}/friends`)
  .then(res => dispatch(get(res.data || defaultList)))
  .catch(err => console.log(err));

// export const addFriend = (userId, friendId) => dispatch =>
//   axios
//   .put(`/api/users/${userId}/approve-request`, {
//     friendId
//   })
//   .then(res => dispatch(get(res.data || defaultList)))
//   .catch(err => console.log(err));

export const removeFriend = (userId, friendId) => dispatch =>
  axios
  .put(`/api/users/${userId}/friend-request/delete`, {
    friendId
  })
  .then(res => {
    dispatch(remove(res.data.id || defaultList))
    //
    socket.emit('delete-friend', {
      userId,
      friendId
    })
  })
  .catch(err => console.log(err));
export const removeFriendSocket = (friendId) => dispatch => dispatch(remove(friendId))


// router.post('/:id/friend-request/delete', async (req, res, next) => {

/**
 * REDUCER
 */
export default function (state = defaultList, action) {
  switch (action.type) {
    case GET_FRIENDS_LIST:
      return action.friendsList;
    case ADD_FRIEND:
      return [...state, action.friend];
    case REMOVE_FRIEND:
      return state.filter(request => request.id !== action.removeId);
    default:
      return state;
  }
}
