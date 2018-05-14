import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SELECTED_USER = 'GET_SELECTED_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = selectedUser => ({
  type: GET_SELECTED_USER,
  selectedUser,
});

/**
 * THUNK CREATORS
 */

export const getSelectedUser = (userId) => dispatch =>
  axios
    .get(`/api/users/simple/${userId}`)
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      return action.selectedUser;
    default:
      return state;
  }
}
