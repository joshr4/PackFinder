import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
// const UPDATE_USER = 'UPDATE_USER';
const SAVE_USER_CHANGES = 'SAVE_USER_CHANGES';

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

// const update = (value, type) => ({
//   type: UPDATE_USER,
//   update: {
//     type,
//     value,
//   },
// });

const save = userUpdate => ({
  type: SAVE_USER_CHANGES,
  userUpdate,
});

/**
 * THUNK CREATORS
 */

export const submiteUserUpdate = userUpdate => async dispatch => {
  try {
    await axios.put(
      `/api/users/${userUpdate.id}/updateAddress`,
      userUpdate.address
    );
    const updatedUser = await axios.put(
      `/api/users/${userUpdate.id}/updateUser`,
      userUpdate
    );
    dispatch(save(updatedUser.data || defaultUser));
  } catch (err) {
    console.log(err);
  }
};

// export const updateUserStore = (value, type) => dispatch => {
//   dispatch(update(value, type));
// };

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
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
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    // case UPDATE_USER:
    //   return typeof action.update.type === 'string'
    //     ? {
    //         ...state,
    //         [action.update.type]: action.update.value,
    //       }
    //     : {
    //         ...state,
    //         address: {
    //           ...state.address,
    //           [action.update.type.address]: action.update.value,
    //         },
    //       };
    case SAVE_USER_CHANGES:
      return action.userUpdate;
    default:
      return state;
  }
}
