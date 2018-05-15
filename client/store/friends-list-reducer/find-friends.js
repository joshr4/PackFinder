import axios from 'axios';
import history from '../../history';

/**
 * ACTION TYPES
 */

const FIND_USERS_BY_NAME = 'FIND_USERS_BY_NAME';

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */

export const findUsers = (usersList) => ({
  type: FIND_USERS_BY_NAME,
  usersList
});

/**
 * THUNK CREATORS
 */


export const findUsersByName = (name) => dispatch =>{
  var betterName = name.replace(/[^\w\s]/gi, '')
  betterName = betterName.split(' ').join('+')
  return axios
  .get(`/api/users/search/${betterName}`)
  .then(res => dispatch(findUsers(res.data)))
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */

export default function (state = defaultList, action) {
  switch (action.type) {
    case FIND_USERS_BY_NAME:
      return action.usersList;
    default:
      return state;
  }
}
