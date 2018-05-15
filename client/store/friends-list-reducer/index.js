import { combineReducers } from 'redux';
import nearbyUsers from './nearby-users';
import sentRequests from './sent-requests';
import receivedRequests from './received-requests';
import friends from './friends';
import search from './find-friends'

export const reducer = combineReducers({
  nearbyUsers,
  sentRequests,
  receivedRequests,
  friends,
  search
});

export default reducer;

export * from './nearby-users';
export * from './sent-requests';
export * from './received-requests';
export * from './friends';
export * from './find-friends'
