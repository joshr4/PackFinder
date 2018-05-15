import axios from 'axios';
import history from '../history';
import socket from '../socket';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
// const UPDATE_USER = 'UPDATE_USER';
const SAVE_USER_CHANGES = 'SAVE_USER_CHANGES';
const UPDATED_USER_ADDRESS = 'UPDATED_USER_ADDRESS';
const UPDATED_USER_INFO = 'UPDATED_USER_INFO';
/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({
  type: GET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const updatedAddress = address => ({
  type: UPDATED_USER_ADDRESS,
  address,
});

const updatedUser = user => ({
  type: UPDATED_USER_INFO,
  user,
});

/**
 * THUNK CREATORS
 */

export const updateUserAddresses = (userUpdate) => dispatch => {
  return axios
    .put(`/api/users/${userUpdate.id}/updateAddress`, userUpdate)
    .then(res => dispatch(updatedAddress(res.data)))
    .catch(err => console.log(err));
}

export const updateUserInfo = (userUpdate) => dispatch => {
  axios
    .put(`/api/users/${userUpdate.id}/updateUser`, userUpdate)
    .then(res => dispatch(updatedUser(res.data)))
    .catch(err => console.log(err));
}

export const me = () => dispatch =>
  axios
  .get('/auth/me')
  .then(res => {
    dispatch(getUser(res.data || defaultUser))
    socket.emit('join', {
      userId: res.data.id
    })
  })
  .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
  .post(`/auth/${method}`, {
    email,
    password,
  })
  .then(
    res => {
      dispatch(getUser(res.data));
      socket.emit('join', {
        userId: res.data.id
      })
      history.push('/home');
    },
    authError => {
      // rare example: a good use case for parallel (non-catch) error handler
      dispatch(
        getUser({
          error: authError,
        })
      );
    }
  )
  .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
  .post('/auth/logout')
  .then(_ => {
    dispatch(removeUser());
    history.push('/login');
  })
  .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case SAVE_USER_CHANGES:
      return action.userUpdate;
    case UPDATED_USER_ADDRESS:
      return { ...state,
        address: action.address
      }
      // return action.user;
    case UPDATED_USER_INFO:
      return action.user;
    default:
      return state;
  }
}
