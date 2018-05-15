import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_NEARBY_EVENTS = 'GET_NEARBY_EVENTS';

/**
 * INITIAL STATE
 */
const defaultEvents = [];
/*
 * ACTION CREATORS
 */
const getNearbyEvents = nearbyEvents => ({ type: GET_NEARBY_EVENTS, nearbyEvents })

/**
 * THUNK CREATORS
 */

export const getNearByEventsInfo = (location, dist) => dispatch =>
{
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
    case GET_NEARBY_EVENTS:
      return action.nearbyEvents;
    default:
      return state;
  }
}
