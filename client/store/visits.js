import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_VISITS = 'GET_VISITS';
const DELETE_VISIT = 'DELETE_VISIT';
const UPDATE_VISIT = 'UPDATE_VISIT';
const ADD_VISIT = 'ADD_VISIT';

/**
 * INITIAL STATE
 */
const defaultVisits = [];

/**
 * ACTION CREATORS
 */
const getAllVisits = visits => ({ type: GET_VISITS, visits });
const delVisit = visit => ({ type: DELETE_VISIT, visit });
const updVisit = visit => ({ type: UPDATE_VISIT, visit });
const addNewVisit = visit => ({ type: ADD_VISIT, visit });

/**
 * THUNK CREATORS
 */
export const getVisits = () => dispatch =>
  axios
    .get('/api/visits')
    .then(res => dispatch(getAllVisits(res.data || defaultVisits)))
    .catch(err => console.log(err));

export const deleteVisit = visit => dispatch =>
  axios
    .delete(`/api/visits/${visit.id}`)
    .then(() => dispatch(delVisit(visit || defaultVisits)))
    .catch(err => console.log(err));

export const updateVisit = visit => dispatch =>
  axios
    .put(`/api/visits/${visit.id}/change-times`, visit)
    .then(res => dispatch(updVisit(res.data || defaultVisits)))
    .catch(err => console.log(err));

export const addVisit = visit => dispatch =>
  axios
    .post(`/api/visits/`, visit)
    .then(res => dispatch(addNewVisit(res.data || defaultVisits)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultVisits, action) {
  switch (action.type) {
    case GET_VISITS:
      return action.visits;
    case UPDATE_VISIT:
      return state.map(
        visit => (action.visit.id !== visit.id ? visit : action.visit)
      );
    case DELETE_VISIT:
      return state.filter(visit => action.visit.id !== visit.id);
    case ADD_VISIT:
      return Object.assign(state, action.visit);
    default:
      return state;
  }
}
