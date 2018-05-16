import React, { Component } from 'react';
//  ewafofweifjwpoaiefjapwoiej
import { Map, ParkListItem, EventEditModal, SingleParkMap, ChatRoom, AddAttendeeModal } from '../index.js';
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
  getEvents,
  inviteUsers
} from '../../store';
import { connect } from 'react-redux';

export class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showAttendeeModal: false,
      invitedClicked: false,
      invitedClickedText: "",
      map: {},
    };
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleAttendeeModal = this.toggleAttendeeModal.bind(this)
  }

  componentDidMount() {
    this.props.getEvents();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  toggleAttendeeModal() {
    this.setState({
      showAttendeeModal: !this.state.showAttendeeModal,
    })
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

  handleAttendeeSubmit = async (e) => {
    let friendIDs = [];
    for (let K in e.target) {
      if (e.target[K] && e.target[K].value && K != "classList"
        // && ('checked' in event.target[K])
      ) {
        if (typeof parseInt(K) == "number" && e.target[K].checked) {
          let relatedId = this.props.user.Friends[K].id;
          friendIDs.push(relatedId);
        }
      }
    }
    //axios.put here
    let invitedClickedText = friendIDs.length + " friends invited!";
    if (friendIDs.length == 1) {
      invitedClickedText = "1" + " friend invited!";
    }
    this.setState({
      invitedClicked: true,
      invitedClickedText
    })
    await this.props.inviteUsers(this.props.displayEvent, friendIDs);
    this.toggleAttendeeModal();
    // axios.put(`/api/events/${this.props.displayEvent.id}/invite-users`,
    //   {userIds: friendIDs}
    // ).then(response => {
    //   this.toggleAttendeeModal();
    // })
  }

  mapLoaded(map) {
    if (this.state.map !== null) {
      return
    }
    this.setState({ map })
  }

  render() {
    let { displayEvent, isOwner, coords, user, attendees, invitees } = this.props
    let { showModal, showAttendeeModal } = this.state;
    let friendstoInvite = this.props.uninvitedFriends;

    return (
      displayEvent ?
        <div className="container" style={{overflowY:"scroll"}}>
          <EventEditModal
            onClose={this.toggleModal}
            showModal={showModal}
            onDelete={deleteEvent}
            item={displayEvent}
            handleEvent={this.props.updateEvent}
          />
          <AddAttendeeModal
            onClose={this.toggleAttendeeModal}
            showModal={showAttendeeModal}
            handleSubmit={this.handleAttendeeSubmit}
            item={displayEvent}
            user={user}
            userFriends={friendstoInvite}
          />
          {/* <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical> */}
            <Grid columns={2} centered className="overflow-scroll" style={{ height: '80vh' }}>
              <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8}>
                  {displayEvent.private ? <Label floating color="red" style={{ zIndex: '0' }}>Private</Label> : <div />}
                  <Segment clearing size="large" attached>
                    <b>{displayEvent.description}</b>
                    {isOwner ? <Button size="tiny" floated="right" color="blue" onClick={() => this.toggleModal()}>Edit</Button>
                      : <div />}
                  </Segment>
                  <Segment attached>
                    <b>Park Name: </b>{displayEvent.park.name}
                  </Segment>
                  <Segment attached>
                    <b>Date: </b>{moment(displayEvent.start).format('MMMM Do YYYY, h:mm a')}
                    {isOwner ? <Button size="tiny" floated="right" color="blue" onClick={() => this.toggleAttendeeModal()}>Invite Friends</Button>
                      : <div />}
                  </Segment>
                  <Grid.Row >
                    <h4>Attending:</h4>
                    <List horizontal>
                      {attendees.map(attendee => {
                        return (
                          <List.Item width={1} key={attendee.id} style={{ paddingBottom: "10px" }}>
                            <Image avatar src={attendee.imageUrl} />
                            <List.Content>
                              <List.Header size="tiny" style={{ fontSize: "13px" }}>{attendee.fullName}</List.Header>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List>
                    <h4>Invited:</h4>
                    <List horizontal>
                      {invitees.map(invitee => {
                        return (
                          <List.Item width={1} key={invitee.id} style={{ paddingBottom: "10px" }}>
                            <Image avatar src={invitee.imageUrl} />
                            <List.Content>
                              <List.Header size="small" style={{ fontSize: "13px" }}>{invitee.fullName}</List.Header>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List>
                    {this.state.invitedClicked ?
                      (<span style={{ fontSize: "12px", color: "blue" }}><br />{this.state.invitedClickedText}</span>)
                      : null}
                  </Grid.Row>
                </Grid.Column>


                <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8}>
                  <SingleParkMap
                    zoom={15}
                    center={coords}
                    mapLoaded={this.mapLoaded.bind(this)}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header>Event Chat</Header>
                  <ChatRoom height={250} eventId={parseInt(this.props.match.params.id)} />
                </Grid.Column>
              </Grid.Row>

            </Grid>
            <br /> <br /> <br />
          {/* </Segment> */}
        </div>
        :
        <div />
    );
  }
}
const mapState = (state, ownProps) => {
  let eventDetail = state.events.filter(event => event.id === Number(ownProps.match.params.id))[0]
  let isOwner = false
  let coords = { lat: 41.954629, lng: -87.6572544 }
  let attendees = [];
  let invitees = [];
  let uninvitedFriends = [];

  if (eventDetail) {
    isOwner = eventDetail.creatorId === state.user.id;
    coords = eventDetail.park.address.location;
    attendees = eventDetail.attendees;
    invitees = eventDetail.invitees
    if (state.user.Friends) {
      let InvitedandAttendingIds = [];
      attendees.forEach(attendee => { InvitedandAttendingIds.push(parseInt(attendee.id)) });
      invitees.forEach(invitees => { InvitedandAttendingIds.push(parseInt(invitees.id)) });
      state.user.Friends.forEach(friend => {
        if (!InvitedandAttendingIds.includes(friend.id)) {
          uninvitedFriends.push(friend);
        }
      })
    }
  }

  isOwner = true //FOR TESTING - REMOVE LATER

  return {
    allEvents: state.events,
    attendees: attendees,
    invitees: invitees,
    uninvitedFriends,
    user: state.user,
    displayEvent: eventDetail,
    isOwner: isOwner,
    coords: coords
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async inviteUsers(event, userIds) {
      await dispatch(inviteUsers(event, userIds));
    },
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
