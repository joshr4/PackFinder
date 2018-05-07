import React from 'react';
import { Button } from 'semantic-ui-react';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import axios from 'axios';
import { EventModal, AddEventModal } from './index';
import { getVisits, deleteVisit, updateVisit, addVisit, getParksAddresses } from '../store';
import { connect } from 'react-redux';

// import '../../public/calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {},
      showModal: false,
      showAddModal: false,
      addFormFieldData: {
        park: 1,
        start: '14:00',
        end: '15:00',
        visitDate: '2018-06-09',
      },
    };
  this.moveEvent = this.moveEvent.bind(this);
  this.removeEvent = this.removeEvent.bind(this);
  this.toggleModal = this.toggleModal.bind(this);
  this.openModal = this.openModal.bind(this);
  this.toggleAddModal = this.toggleAddModal.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  openModal(event){
    console.log('modal',event)
    this.setState({
      selectedEvent: event,
    })
    this.toggleModal()
  }

  moveEvent({ event, start, end }) {
    const { events } = this.props;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    let newTimes = {
      start,
      end,
    };
    this.props.updateVisit(updatedEvent);
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
    this.props.updateVisit(updatedEvent[0])
  };

  toggleAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal,
    });
  }
  addEvent = () => {
    let stateVisit = this.state.addFormFieldData
    let year = parseInt(stateVisit.visitDate.split("-")[0]);
    let month = parseInt(stateVisit.visitDate.split("-")[1]) - 1;
    let day = parseInt(stateVisit.visitDate.split("-")[2]);
    let fromHour = parseInt(stateVisit.start.split(":")[0]);
    let fromMin = parseInt(stateVisit.start.split(":")[1]);
    let toHour = parseInt(stateVisit.end.split(":")[0]);
    let toMin = parseInt(stateVisit.end.split(":")[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(year, month, day, toHour, toMin);
    let newVisitInfo = {
      start: startTime,
      end: endTime,
      parkId: stateVisit.park,
      userId: 55,
      title: this.props.parkList.filter(park => park.key===stateVisit.park)[0].text
    }
    //ADD IN USER ID TO POST REQUEST
    this.props.addNewVisit(newVisitInfo)
    this.toggleAddModal()
  }
  handleChange = e => {
    this.setState({
        addFormFieldData: Object.assign(this.state.addFormFieldData, {[e.target.name]: e.target.value})
    })
  }

  handleFieldChange = data => {
    this.setState({
        addFormFieldData: Object.assign(this.state.addFormFieldData, {park: data.value})
    })
  }

  render() {
    return (
      <div style={{ height: '1000px' }}>
        <EventModal
          show={this.state.showModal}
          onClose={this.toggleModal}
          onDelete={this.removeEvent}
          item={this.state.selectedEvent}
        />
        <AddEventModal
          show={this.state.showAddModal}
          onClose={this.toggleAddModal}
          handleSubmit={this.addEvent}
          handleChange={this.handleChange}
          handleFieldChange={this.handleFieldChange}
          item={this.state.selectedEvent}
          parkList={this.props.parkList}
          addFormFieldData={this.state.addFormFieldData}
        />
        <Button onClick={() => this.toggleAddModal()}>Add Visit</Button>
        <DragAndDropCalendar
          selectable
          culture="en-GB"
          // events={this.props.events.filter(visit => visit.userId===this.props.user.id)}
          events={this.props.events}
          onEventDrop={this.moveEvent}
          resizable
          onDoubleClickEvent={event => this.openModal(event)}
          onEventResize={this.resizeEvent}
          defaultView="week"
          defaultDate={new Date(2018, 3, 12, 10, 0)}
          step={30}
          min={new Date(0, 0, 0, 6, 0)}
          max={new Date(0, 0, 0, 23, 0)}
          // max={new Date(0, 0, 0, 23, 0)}
        />
      </div>
    );
  }
}

const mapState = state => {
  let calEvents = state.calendar.map(visit => {
    let newVisit = {
    id: visit.id,
    title: visit.title,
    start: new Date(visit.start),
    end: new Date(visit.end),
    address: visit.park.address,
    userId: visit.userId
    }
    return newVisit
  })
  //{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
  let dropDownParks = state.parkList.map(park=>{
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })
  return {
    events: calEvents,
    user: state.user,
    parkList: dropDownParks
  };
};

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getVisits());
      dispatch(getParksAddresses());
    },
    removeVisit(visit) {
      dispatch(deleteVisit(visit));
    },
    updateVisit(visit) {
      dispatch(updateVisit(visit));
    },
    addNewVisit(visit) {
      dispatch(addVisit(visit));
    },
  };
};

export default connect(mapState, mapDispatch)(
  DragDropContext(HTML5Backend)(Dnd)
);
