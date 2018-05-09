import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const DELETE_EVENT = 'DELETE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const ADD_EVENT = 'ADD_EVENT';

/**
 * INITIAL STATE
 */
const defaultEvents = [];

/**
 * ACTION CREATORS
 */
const getAllEvents = events => ({ type: GET_EVENTS, events });
const delEvent = event => ({ type: DELETE_EVENT, event });
const updEvent = event => ({ type: UPDATE_EVENT, event });
const addNewEvent = event => ({ type: ADD_EVENT, event });

/**
 * THUNK CREATORS
 */
export const getEvents = () => dispatch =>
  axios
    .get('/api/events')
    .then(res => dispatch(getAllEvents(res.data || defaultEvents)))
    .catch(err => console.log(err));

export const deleteEvent = event => dispatch =>
  axios
    .delete(`/api/events/${event.id}`)
    .then(() => dispatch(delEvent(event || defaultEvents)))
    .catch(err => console.log(err));

export const updateEvent = event => dispatch =>
  axios
    .put(`/api/events/${event.id}`, event)
    .then(res => dispatch(updEvent(res.data || defaultEvents)))
    .catch(err => console.log(err));

export const addEvent = event => dispatch =>
  axios
    .post(`/api/events/`, event)
    .then(res => dispatch(addNewEvent(res.data || defaultEvents)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case UPDATE_EVENT:
      return state.map(
        event => (action.event.id !== event.id ? event : action.event)
      );
    case DELETE_EVENT:
      return state.filter(event => action.event.id !== event.id);
    case ADD_EVENT:
      return [...state, action.event];
    default:
      return state;
  }
}
