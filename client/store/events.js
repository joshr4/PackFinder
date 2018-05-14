import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const DELETE_EVENT = 'DELETE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const ADD_EVENT = 'ADD_EVENT';
const GET_NEARBY_EVENTS = 'GET_NEARBY_EVENTS';

/**
 * INITIAL STATE
 */
const defaultEvents = [];

/**
 * ACTION CREATORS
 */
const getAllEvents = events => ({ type: GET_EVENTS, events });
const delEvent = eventId => ({ type: DELETE_EVENT, eventId });
const updEvent = event => ({ type: UPDATE_EVENT, event });
const addNewEvent = event => ({ type: ADD_EVENT, event });
const getNearbyEvents = nearbyEvents => ({ type: GET_NEARBY_EVENTS, nearbyEvents })

/**
 * THUNK CREATORS
 */
export const getEvents = () => dispatch =>
  axios
    .get('/api/events')
    .then(res => dispatch(getAllEvents(res.data || defaultEvents)))
    .catch(err => console.log(err));

export const deleteEvent = eventId => dispatch =>
  axios
    .delete(`/api/events/${eventId}`)
    .then(() => dispatch(delEvent(eventId || defaultEvents)))
    .catch(err => console.log(err));

export const updateEvent = event => dispatch =>
  axios
    .put(`/api/events/${event.id}`, event)
    .then(res => dispatch(updEvent(res.data || defaultEvents)))
    .catch(err => console.log(err));

export const addEvent = event => dispatch =>
  axios
    .post(`/api/events/`, event)
    .then(async res => {
      console.log('before get', event)

      await dispatch(getEvents())
      history.push(`/event/${res.data.id}`)
    })
    .catch(err => console.log(err));

export const inviteUsers = (event, userIds) => dispatch =>
  axios
  .put(`/api/events/invite-users`, event, userIds)
  .then(res => dispatch(updEvent(res.data || defaultEvents)))
  .catch(err => console.log(err));

export const removeInvite = (event, userId) => dispatch =>
  axios
  .put(`/api/events/remove-invite`, event, userId)
  .then(res => dispatch(updEvent(res.data || defaultEvents)))
  .catch(err => console.log(err));

export const addAttendee = (event, userId) => dispatch =>
  axios
  .put(`/api/events/add-attendee`, event, userId)
  .then(res => dispatch(updEvent(res.data || defaultEvents)))
  .catch(err => console.log(err));

export const removeAttendee = (event, userId) => dispatch =>
  axios
  .put(`/api/events/remove-attendee`, event, userId)
  .then(res => dispatch(updEvent(res.data || defaultEvents)))
  .catch(err => console.log(err));

// Invite Users, Add User, Remove User, Retract Invite

export const getNearByEventsInfo = (location, dist) => dispatch =>
{
  console.log('here')
  let distance = dist || 8046
    return axios
      .get(`/api/events/${location.lat}/${location.lng}/${distance}`) //1 mile
      .then(res => dispatch(getNearbyEvents(res.data)))
      .catch(err => console.log(err));
  }

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
      return state.filter(event => action.eventId !== event.id);
    case ADD_EVENT:
      return [...state, action.event]; //we do a get all after adding a new event
    case GET_NEARBY_EVENTS:
      return action.nearbyEvents;

    default:
      return state;
  }
}
