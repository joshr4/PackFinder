import React, { Component } from 'react';
import { Map, ParkListItem, EventM, EventModal, SingleParkMap } from '../index.js';
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
    this.props.getEvents()
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
    let newEvent = Object.assign(stateEvent, { start: startTime, id: event.id })
    this.props.updateEvent(newEvent)
    this.toggleModal()
  }

  mapLoaded(map) {
    if (this.state.map !== null) {
      return
    }
    this.setState({ map })
  }

  render() {
    let { addEvent, updateEvent, deleteEvent, match, allEvents } = this.props
    let { showModal } = this.state
    let displayEvent = allEvents.filter(event => event.id === Number(match.params.id))[0]
    let coords = { lat: 41.8781, lng: -87.6298 } //grab these from displayEvent.park.address.location
    return (
      displayEvent ?
        <Container className="container">
          <EventModal
            onClose={this.toggleModal}
            showModal={showModal}
            handleSubmit={this.handleSubmit}
            onDelete={deleteEvent}
            item={displayEvent}
          />
          <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={8}>
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
              <Grid.Row>
                <Grid.Column width={16}>
                  <h4>Description:</h4><p>{displayEvent.description}</p>
                  <Button color="blue" style={{ marginRight: 20, marginTop: 20 }} onClick={() => this.toggleModal()}>Edit Event</Button>
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
const mapState = state => {
  return {
    allEvents: state.events,
    attendees: [],
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
