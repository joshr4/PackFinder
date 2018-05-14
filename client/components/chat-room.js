import React, {Component} from 'react';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import axios from 'axios';
import { VisitModal } from './index';
import { getVisits, deleteVisit, updateVisit, addVisit, getParksAddresses, getMessages } from '../store';
import store, { getAllMessages, addMessage } from '../store';
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { timeDisplay, dateDisplay } from './global'
import { isNull } from 'util';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Card,
    Item,
    Label, Embed,
    Form, Input, Radio, Select, TextArea, Checkbox, Feed
} from 'semantic-ui-react'
import socket from '../socket';

// const socket = io(window.location.origin)

class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages:[],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state.messages = getAllMessages();
        this.state = store.getState();
        console.log("store state: ", this.state);
        console.log("store messages: ", this.state.messages);
    }

    componentDidMount () {
        this.props.getData();
        console.log("this.props: ", this.props);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    
    componentWillUnmount () {
        this.unsubscribe();
    }
        
    componentWillUpdate() {
        console.log("line 46");
        axios.get('/api/messages').then(response => {
            // console.log("response.data: ", response.data, response.data.length);
            // console.log("this.state.messages: ", this.state.messages, this.state.messages.length);
            let newData = response.data.length != this.state.messages.length;
            // console.log("data different? ", newData);
            // if (newData) {
            // console.log("data different is true");
            // this.setState({
            //     messages:response.data
            // })
        //         return
            // }
        //     return
        })
        return
    }
    handleSubmit(event) {
        console.log("SUBMITTING MESSAGE: (socket flow starts here)");
        console.log("message Body: ", event.target.messageBody.value);
        // socket.emit('new-message', 
        //     {"message content":event.target.messageBody.value}
        // );
        let postBody = {
            sent: new Date(Date.now()),
            content: event.target.messageBody.value,
            posterId: this.props.user.id,
            eventId: 1
        }
        this.props.addMessage(postBody);
        // axios.post('/api/messages', postBody).then(response => {
        //     console.log("created new message: ", response.data);
        //     this.setState({
        //         messages:[response.data].concat(this.state.messages),
        //     })
        // })
    }
    render() {
        console.log("rendering line 67");
        console.log("rendering props: ", this.props);
        let messages = [
            {id: 1,
            username: "username1",
            content: "message content 1",
            likes:5},
            {id: 2,
            username: "username2",
            content: "message content 2",
            likes:5},
            {id: 3,
            username: "username3",
            content: "message content 3",
            // timestring: (this.id + "Days ago"),
            likes:5},
            {id: 4,
            username: "username4",
            content: "message content 4",
            // timestring: (this.id + "Days ago"),
            likes:5},
            {id: 5,
            username: "username5",
            content: "message content 5",
            // timestring: (this.id + "Days ago"),
            likes:5},        
        ]
        return (
            <div className="container" style={{ padding: 10, paddingTop: 130, border: "1px solid black" }}>
            <Header>Group Posts</Header>
            <Form onSubmit={this.handleSubmit}>
            <TextArea style={{marginBottom:"10px"}} autoHeight placeholder='Write message' name="messageBody"/>
            <Button type="submit" positive>Post</Button>
            </Form>
              <Feed>
            {this.props.messages.map(message => {
                return(
                    <Feed.Event key={message.id}>
                    <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                    <Feed.Content>
                      <Feed.Summary>
                        <a>{message.poster.fullName}</a> posted to the group
                        <Feed.Date>{message.id} days ago</Feed.Date>
                      </Feed.Summary>
                      <Feed.Extra text>
                        {message.content}
                      </Feed.Extra>
                      <Feed.Meta>
                        <Feed.Like>
                          <Icon name='like' />
                          {message.id} Likes
                        </Feed.Like>
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>                      
                )                
            })}
          </Feed>        
    </div>)
    }
}

const mapState = state => {
    console.log("state user: ", state.user);
    console.log("state.event: ", state.event);
    console.log("state.messages: ", state.messages);
    let messages = state.messages.filter(message => (message.poster))
    return {
      messages: state.messages,
      user: state.user
    };
  };

const mapDispatch = dispatch => {
return {
    async getData() {
        await dispatch(getMessages());
        // dispatch()
    },
    addMessage(message) {
        dispatch(addMessage(message));
        // dispatch(getMessages());
      },
  };
};
  
export default connect(mapState, mapDispatch)(ChatRoom);  