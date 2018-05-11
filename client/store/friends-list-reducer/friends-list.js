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
const defaultUser = []

/**
 * ACTION CREATORS
 */
const get = user => ({
  type: GET_FRIENDS_LIST,
  user,
});
const remove = () => ({
  type: REMOVE_FRIEND,
});
const add = () => ({
  type: REMOVE_FRIEND,
});



/**
 * THUNK CREATORS
 */


export const getFriendsList = () => dispatch =>
  axios
  .get(`/${id}/friends`)
  .then(res => dispatch(get(res.data || defaultUser)))
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
    case GET_NEARBY_USERS:
      return { ...state,
        nearbyUsers: action.nearbyUsers
      };
    case GET_RECEIVED_REQUESTS:
      return action.user;
    case REMOVE_FRIEND:
      return defaultUser;
    case UPDATE_USER:
      return typeof action.update.type === 'string' ?
        {
          ...state,
          [action.update.type]: action.update.value,
        } :
        {
          ...state,
          address: {
            ...state.address,
            [action.update.type.address]: action.update.value,
          },
        };
    case SAVE_USER_CHANGES:
      return action.userUpdate;
    default:
      return state;
  }
}
