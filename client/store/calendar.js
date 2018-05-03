import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_VISITS = 'GET_VISITS';
const DELETE_VISIT = 'DELETE_VISIT';

/**
 * INITIAL STATE
 */
const defaultVisits = {};

/**
 * ACTION CREATORS
 */
const getAllVisits = visits => ({ type: GET_VISITS, visits });
const delVisit = visit => ({ type: DELETE_VISIT, visit });

/**
 * THUNK CREATORS
 */
export const getVisits = () => dispatch =>
  axios
    .get('api/visits')
    .then(res => dispatch(getAllVisits(res.data || defaultVisits)))
    .catch(err => console.log(err));

export const deleteVisit = visit => dispatch =>
  axios
    .delete(`api/visits/${visit.id}`)
    .then(res => dispatch(delVisit(res.data || defaultVisits)))
    .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function(state = defaultVisits, action) {
  switch (action.type) {
    case GET_VISITS:
      return action.visits;
    case DELETE_VISIT:
      return state.filter(visit => action.visit.id !== visit.id);
    default:
      return state;
  }
}
