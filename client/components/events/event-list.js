import React, { Component } from 'react';
import { Map, ParkListItem, EventM, EventEditModal, SingleParkMap, EventItem } from '../index.js';
import moment from 'moment';
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Card, Item, Label, Embed, Form, Input, Radio, Select, TextArea, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import {
  addEvent,
  updateEvent,
  deleteEvent,
  getEvents
} from '../../store';
import { connect } from 'react-redux';

export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      map: {},
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
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
    return allEvents.map( event => <EventItem key={event.id} event={event} />);
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
export default connect(mapState, mapDispatch)(EventList);
