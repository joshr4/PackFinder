import { combineReducers } from 'redux';
import nearbyUsers from './nearby-users';
import sentRequests from './sent-requests';
import receivedRequests from './received-requests';
import friendsList from './friends-list';

export const reducer = combineReducers({
  nearbyUsers,
  sentRequests,
  receivedRequests,
  friendsList,
});

export default reducer;

export * from './nearby-users';
export * from './sent-requests';
export * from './received-requests';
export * from './friends-list';
