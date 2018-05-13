import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';


/**
 * INITIAL STATE
 */
const defaultSidebar = false;

/**
 * ACTION CREATORS
 */
const toggle = () => ({
  type: TOGGLE_SIDEBAR
});


/**
 * THUNK CREATORS
 */
export const toggleSidebar = () => dispatch => dispatch(toggle());

/**
 * REDUCER
 */
export default function (state = defaultSidebar, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
}
