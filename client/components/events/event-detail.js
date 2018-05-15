import React, { Component } from 'react';
//  ewafofweifjwpoaiefjapwoiej
import { Map, ParkListItem, EventEditModal, SingleParkMap, ChatRoom } from '../index.js';
import moment from 'moment';
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
  Label,
  Embed,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import axios from 'axios';
import {
  addEvent,
  updateEvent,
  deleteEvent,
  getEvents
} from '../../store';
import { connect } from 'react-redux';

export class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      map: {},
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.props.getEvents();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleSubmit = (event) => {
    let stateEvent = event
    let year = parseInt(stateEvent.date.split('-')[0]);
    let month = parseInt(stateEvent.date.split('-')[1]) - 1;
    let day = parseInt(stateEvent.date.split('-')[2]);
    let fromHour = parseInt(stateEvent.startTime.split(':')[0]);
    let fromMin = parseInt(stateEvent.startTime.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let newEvent = Object.assign(stateEvent, { start: startTime, id: event.id });
    this.props.updateEvent(newEvent);
    this.toggleModal();
  }

  mapLoaded(map) {
    if (this.state.map !== null) {
      return
    }
    this.setState({ map })
  }

  render() {
    let { displayEvent, isOwner, coords } = this.props
    let { showModal } = this.state
    let displayEvent = allEvents.filter(event => event.id === Number(match.params.id))[0]
    let isEventOwner = false
    if (user.id && displayEvent.creator.id) isEventOwner = displayEvent.creator.id === this.props.user.id
    let coords = {lat: 41.954629, lng: -87.6572544}
    if (displayEvent 
      && displayEvent.park && 
    displayEvent.park.address) coords = displayEvent.park.address.location
    isEventOwner = true //OVERRIDING TO TRUE FOR TESTING

    return (
      displayEvent ?
        <Container className="container" style={{"overflowY":"scroll"}}>
        <EventEditModal
        onClose={this.toggleModal}
        showModal={showModal}
        handleSubmit={this.handleSubmit}
        onDelete={deleteEvent}
        item={displayEvent}
      />
      <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
        <Grid celled>
          <Grid.Row min-height="60%" >
            <Grid.Column width={8}>
            {displayEvent.private ? <Label floating color="red" style={{zIndex: '0'}}>Private</Label> : <div />}
              <Segment attached>
                <b>
                  Park Name: {displayEvent.park.name}<br />
                </b>
              </Segment>
              <Segment attached>
                <b>
                  Date: {moment(displayEvent.start).format('MMMM Do YYYY, h:mm a')}<br />
                </b>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <SingleParkMap
                zoom={15}
                center={coords}
                mapLoaded={this.mapLoaded.bind(this)}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row min-height="40%">
            <Grid.Column width={16}>
              <h4>Description:</h4><p>{displayEvent.description}</p>
              {isOwner ? <Button color="blue" style={{ marginRight: 20, marginTop: 20 }} onClick={() => this.toggleModal()}>Edit Event</Button>
              : <div />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={16}>
            <Header>Event Chat</Header>
            <ChatRoom height={674} eventId={parseInt(this.props.match.params.id)}/>
          </Grid.Column>
          </Grid.Row>
        </Grid>
        <br /> <br /> <br />
      </Segment>
    </Container>
        :
        <div />
    );
  }
}
const mapState = (state, ownProps) => {
  let eventDetail = state.events.filter(event => event.id === Number(ownProps.match.params.id))[0]
  let isOwner = false
  let coords = {lat: 41.954629, lng: -87.6572544}
  if (eventDetail) isOwner = eventDetail.creator.id === state.user.id
  if (eventDetail) coords = eventDetail.park.address.location

  isOwner = true //FOR TESTING - REMOVE LATER

  return {
    allEvents: state.events,
    attendees: [],
    user: state.user,
    displayEvent: eventDetail,
    isOwner: isOwner,
    coords: coords
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    addEvent(event) {
      dispatch(addEvent(event));
    },
    deleteEvent(eventId) {
      dispatch(deleteEvent(eventId));
      ownProps.history.push('/home')
    },
    updateEvent(event) {
      dispatch(updateEvent(event));
    },
    getEvents() {
      dispatch(getEvents());
    },
  };
};
export default connect(mapState, mapDispatch)(EventDetail);
