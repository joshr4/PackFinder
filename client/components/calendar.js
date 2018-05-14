import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
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

import { 
  getVisits, deleteVisit, updateVisit, addVisit, getParksAddresses, 
  getEvents, updateEvent, deleteEvent } 
from '../store';

import { connect } from 'react-redux';
import { timeDisplay, dateDisplay } from './global'
import { isNull } from 'util';

// import '../../public/calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {
        id: null,
        start: '',
        end: '',
        visitDate: '',
        park: null,
        address: {
          city: '',
          id: null,
          line_1: '',
          location: {
            lat: null,
            lng: null
          },
          state: '',
          zipcode: '',
        }
      },
      formErrors: {
        start: '',
        end: '',
        visitDate: '',
        park: '',
      },
      startValid: false,
      endValid: false,
      visitDateValid: false,
      parkValid: false,
      formValid: false,
      slider: 1,
      showModal: false,
      modalType: 'view',
      user: {},
      events: [],
    };
    this.moveEvent = this.moveEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  
  componentDidMount() {
    this.props.getData();
    axios.get('/api/events').then(response => {
      console.log("events from api test...: ", response.data);
      this.setState({
        events:this.props.events.concat(response.data)
      })
      // this.props.events = this.props.events.concat(response.data);
      console.log("New state.events: ", this.state.events);
    })
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  async openModal(event, type) {
    console.log("opening modal for: ", event);
    if (event.isEvent) {
      this.toggleModal()
      // TOGGLE "EVENT" MODAL HERE (NOT VISITS)
      return
    }
    let selEvent = event
    if (type === 'view') {
      let year = event.start.getFullYear();
      let month = event.start.getMonth();
      let day = event.start.getDate();
      let month0 = ''
      let day0 = ''
      if (month < 9) month0 = '0'
      if (day < 10) day0 = '0'
      selEvent.visitDate = `${year}-${month0}${month + 1}-${day0}${day}`
      selEvent.start = timeDisplay(event.start, true)
      selEvent.end = timeDisplay(event.end, true)
      await this.setState({
        selectedEvent: selEvent,
      })
    }
    if (type === 'add') {
      await this.setState({
        selectedEvent: {
          id: null,
          start: moment().format('HH:mm'),
          end: '',
          visitDate: moment().format('YYYY-MM-DD'),
          park: null,
          address: {
            city: '',
            id: null,
            line_1: '',
            location: {
              lat: null,
              lng: null
            },
            state: '',
            zipcode: '',
          }
        }
      })
    }
    await this.setState({
      modalType: type
    })
    if (type !== 'edit') this.toggleModal()
  }

  moveEvent({ event, start, end }) {
    console.log("moving event: ", event);
    const { events } = this.props;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    let newTimes = {
      start,
      end,
    };
    if (event.isEvent) {
      this.props.updateEvent(updatedEvent);
    }
    else {
      this.props.updateVisit(updatedEvent);
    }
  }

  removeEvent(event) {
    this.toggleModal();
    this.props.removeVisit(event);
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.props;
    const updatedEvent = events.filter(existingEvent => existingEvent.id == event.id);
    updatedEvent[0].start = start
    updatedEvent[0].end = end
    updatedEvent[0].id = event.id
    if (event.isEvent) {
      this.props.updateEvent(updatedEvent[0])
    }
    else {
      this.props.updateVisit(updatedEvent[0])
    }
  };

  addEvent = () => {
    console.log('startvalid', this.state.startValid)
    let stateVisit = this.state.selectedEvent
    let year = parseInt(stateVisit.visitDate.split('-')[0]);
    let month = parseInt(stateVisit.visitDate.split('-')[1]) - 1;
    let day = parseInt(stateVisit.visitDate.split('-')[2]);
    let fromHour = parseInt(stateVisit.start.split(':')[0]);
    let fromMin = parseInt(stateVisit.start.split(':')[1]);
    let toHour = parseInt(stateVisit.end.split(':')[0]);
    let toMin = parseInt(stateVisit.end.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(year, month, day, fromHour, fromMin + 30 * this.state.slider);
    let newVisitInfo = {
      start: startTime,
      end: endTime,
      parkId: stateVisit.park,
      title: this.props.parkList.filter(park => park.key === stateVisit.park)[0].text,
      userId: this.props.user.id,
    }
    this.props.addNewVisit(newVisitInfo)
    this.toggleModal()
  }
  updateEvent = () => {
    let stateVisit = this.state.selectedEvent
    let year = parseInt(stateVisit.visitDate.split('-')[0]);
    let month = parseInt(stateVisit.visitDate.split('-')[1]) - 1;
    let day = parseInt(stateVisit.visitDate.split('-')[2]);
    let fromHour = parseInt(stateVisit.start.split(':')[0]);
    let fromMin = parseInt(stateVisit.start.split(':')[1]);
    let toHour = parseInt(stateVisit.end.split(':')[0]);
    let toMin = parseInt(stateVisit.end.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(year, month, day, toHour, toMin);
    let newVisitInfo = {
      start: startTime,
      end: endTime,
      id: stateVisit.id,
      title: this.props.parkList.filter(park => park.key === stateVisit.park)[0].text,
    }

    this.props.updateVisit(newVisitInfo)
    this.toggleModal()
  }

  handleChange = e => {

    this.setState({
      selectedEvent: Object.assign(this.state.selectedEvent, { [e.target.name]: e.target.value },
        () => { this.validateField(e.target.name, e.target.value) })
    })
  }

  handleFieldChange = data => {
    this.setState({
      selectedEvent: Object.assign(this.state.selectedEvent, { park: data.value }),
    })
  }
  handleSliderChange = e => {
    this.setState({ slider: e.target.value })
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let startValid = this.state.startValid;
    let endValid = this.state.endValid;
    let parkValid = this.state.parkValid;
    let visitDateValid = this.state.visitDateValid;

    switch (fieldName) {
      case 'start':
        startValid = value.length === 5
        fieldValidationErrors.start = startValid ? '' : ' is invalid';
        break;
      case 'end':
        endValid = value.length === 5 //&& (value.slice(0,2)*60 + value.slice(-2))> this.state.selectedEvent.start.slice(0,2)*60 + this.state.selectedEvent.start.slice(-2);
        fieldValidationErrors.end = endValid ? '' : ' is invalid';
        break;
      case 'park':
        parkValid = value !== null;
        fieldValidationErrors.park = parkValid ? '' : ' is invalid';
        break;
      case 'visitDate':
        visitDateValid = value.length === 10;
        fieldValidationErrors.visitDate = visitDateValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      startValid: startValid,
      endValid: endValid,
      visitDateValid: visitDateValid,
      parkValid: parkValid,
    }, this.validateForm);
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        // borderRadius: '0px',
        // opacity: 0.8,
        // color: 'black',
        // border: '0px',
        // display: 'block'
    };
    return {
        style: style
    };
  };    

  render() {
    return (
      <div className="container" style={{ height: '700px', padding: 10, paddingTop: 130 }}>
        <VisitModal
          modalType={this.state.modalType}
          show={this.state.showModal}
          onClose={this.toggleModal}
          onDelete={this.removeEvent}
          item={this.state.selectedEvent}
          slider={this.state.slider}
          handleSubmit={this.addEvent}
          handleChange={this.handleChange}
          handleFieldChange={this.handleFieldChange}
          parkList={this.props.parkList}
          onEdit={this.openModal}
          handleEdit={this.updateEvent}
          handleSliderChange={this.handleSliderChange}
          noPark={false}
        />

        <DragAndDropCalendar
          // className="no-scroll"
          selectable
          culture="en-GB"
          events={this.props.events}
          eventPropGetter={(this.eventStyleGetter)}
          //events={this.props.events.filter(visit => visit.userId===this.props.user.id)}
          onEventDrop={this.moveEvent}
          resizable
          onDoubleClickEvent={event => this.openModal(event, 'view')}
          onEventResize={this.resizeEvent}
          defaultView="week"
          defaultDate={moment().toDate()}
          step={30}
          min={new Date(0, 0, 0, 6, 0)}
          max={new Date(0, 0, 0, 23, 0)}
        // max={new Date(0, 0, 0, 23, 0)}
        />
        <Grid>
          <Button positive style={{ margin: 20 }} onClick={() => this.openModal(this.state.selectedEvent, 'add')}>Add Visit</Button>
          <p style={{ marginTop: 30 }}>Double click an event on the calendar to edit/delete</p>
        </Grid>
      </div>
    );
  }
}

const mapState = state => {
  console.log("this user: ", state.user);
  console.log("state.events (from mapState): ", state.events);
  let userVisits = state.visits.filter(visit => visit.userId == state.user.id);
  let calEvents = state.events.map(event => {
    let calEvent = event;
    calEvent.isEvent = true;
    calEvent.title = event.description;
    calEvent.start = new Date(event.start);
    calEvent.end = new Date(event.end);
    calEvent.hexColor = "5fc627";
    return calEvent;
  })
  let calVisits = userVisits.map(visit => {
    let newVisit = {
      id: visit.id,
      title: visit.title,
      start: new Date(visit.start),
      end: new Date(visit.end),
      address: visit.park.address,
      park: visit.parkId,
      userId: visit.userId,
      hexColor: "3174ad",
    }
    return newVisit
  })
  console.log("calEvents vs calVisits: ", calEvents, calVisits);
  let calItems = calEvents.concat(calVisits);
  //{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })
  return {
    events: calItems,
    user: state.user,
    parkList: dropDownParks
  };
};

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getVisits());
      dispatch(getEvents());
      dispatch(getParksAddresses());
    },
    removeVisit(visit) {
      dispatch(deleteVisit(visit));
    },
    async updateVisit(visit) {
      await dispatch(updateVisit(visit));
      dispatch(getVisits());
    },
    async addNewVisit(visit) {
      await dispatch(addVisit(visit));
      dispatch(getVisits());
    },
    async updateEvent(event) {
      await dispatch(updateEvent(event));
      dispatch(getEvents());

    }
  };
};

export default connect(mapState, mapDispatch)(
  DragDropContext(HTML5Backend)(Dnd)
);
