import React from 'react';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import axios from 'axios';
import { EventModal } from './index';
import { getVisits, deleteVisit, updateVisit } from '../store';
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
    };
  this.moveEvent = this.moveEvent.bind(this);
  this.removeEvent = this.removeEvent.bind(this);
  this.toggleModal = this.toggleModal.bind(this);
  this.openModal = this.openModal.bind(this);
  console.log('realstate',this.state)
  }

  componentDidMount() {
    this.props.getVisits();
    console.log("new props: ", this.props);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  openModal(event){
    this.setState({
      selectedEvent: event,
    })
    this.toggleModal()
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    let newTimes = {
      start,
      end,
    };
    // axios
    //   .put(`api/visits/${event.id}/change-times`, newTimes)
    //   .then(response => {
    //     this.setState({
    //       events: nextEvents,
    //     });
    //   });
  }

  removeEvent(event) {
    this.toggleModal();
    this.props.removeVisit(event);
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.props;

    // const nextEvents = events.map(existingEvent => {
    //   return existingEvent.id == event.id
    //     ? { ...existingEvent, start, end }
    //     : existingEvent;
    // });
    const updatedEvent = events.filter(existingEvent => existingEvent.id == event.id);

    updatedEvent[0].start = start
    updatedEvent[0].end = end
    updatedEvent[0].id = event.id
    this.props.updateVisit(updatedEvent[0])
  };

  render() {
    return (
      <div style={{ height: '1000px' }}>
        <EventModal
          show={this.state.showModal}
          onClose={this.toggleModal}
          onDelete={this.removeEvent}
          item={this.state.selectedEvent}
        />
        <DragAndDropCalendar
          selectable
          culture="en-GB"
          events={this.props.events}
          onEventDrop={this.moveEvent}
          resizable
          onDoubleClickEvent={event => this.openModal(event)}
          onEventResize={this.resizeEvent}
          defaultView="week"
          defaultDate={new Date(2018, 4, 10)}
        />
      </div>
      // : <div />
    );
  }
}

const mapState = state => {

  let calEvents = state.calendar.map(visit => {
    let newVisit = {
    id: visit.id,
    title: visit.title,
    start: new Date(visit.start),
    end: new Date(visit.end)
    }
    return newVisit
  })
  return {
    events: calEvents
  };
};

const mapDispatch = dispatch => {
  return {
    getVisits() {
      dispatch(getVisits());
    },
    removeVisit(visit) {
      dispatch(deleteVisit(visit));
    },
    updateVisit(visit) {
      console.log('updated visit', visit);
      dispatch(updateVisit(visit));
    },
  };
};

export default connect(mapState, mapDispatch)(
  DragDropContext(HTML5Backend)(Dnd)
);
