import axios from 'axios';
import history from '../history';
import socket from '../socket';
/**
 * ACTION TYPES
 */
const GET_MESSAGES = 'GET_MESSAGES';
const POST_MESSAGE = 'POST_MESSAGE';

/**
 * INITIAL STATE
 */
const defaultMessages = [];

/**
 * ACTION CREATORS
 */
const getAllMessages = messages => ({ type: GET_MESSAGES, messages });
const postMessage = message => ({ type: POST_MESSAGE, message });
// const delEvent = event => ({ type: DELETE_EVENT, event });
// const updEvent = event => ({ type: UPDATE_EVENT, event });
// const addNewEvent = event => ({ type: ADD_EVENT, event });

/**
 * THUNK CREATORS
 */
export const getMessages = () => dispatch =>
  axios
    .get('/api/messages')
    .then(res => dispatch(getAllMessages(res.data || defaultMessages)))
    .catch(err => console.log(err));

export const addMessage = event => dispatch => {
    console.log("addMessage from STORE");
    return axios
    .post(`/api/messages/`, event)
    .then(res => {
        let newMessage = res.data;
        const action = postMessage(newMessage || defaultMessages);
        console.log("res.data from addMessage: ", res.data);
        dispatch(action);
        // socket.emit('new-message', event);
        socket.emit('new-message', 
            {"message content":newMessage.content}
        );
    } 
    // dispatch(postMessage(res.data || defaultMessages))
    )
    // .then(res => dispatch(getAllMessages(res.data || defaultMessages)))
    .catch(err => console.log(err));
}

// const action = getMessage(newMessage);
// dispatch(action);
// socket.emit('new-message', newMessage);

/**
 * REDUCER
 */
export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case POST_MESSAGE:
        console.log("action.message: ", action.message);
      return [action.message, ...state];
    default:
      return state;
  }
}
