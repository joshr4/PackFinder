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
import { getVisits, deleteVisit } from '../store';
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
      events: events,
      selectedEvent: {
        title:'',
      },
      calendar: [],
      showModal: false,
    };
    this.moveEvent = this.moveEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    console.log('realstate',this.state)
  }

  componentDidMount() {
    this.props.loadVisits();
    this.setState({
      calendar:this.props.events,
    })
  }

  toggleModal(event) {
    this.setState({
      showModal: !this.state.showModal,
      selectedEvent: event,
    });
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
    axios
      .put(`api/visits/${event.id}/change-times`, newTimes)
      .then(response => {
        this.setState({
          events: nextEvents,
        });
      });
  }

  removeEvent(event) {
    this.toggleModal();
    this.props.removeVisit(event)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents,
    });
  };

  render() {
    return (
      <div style={{ height: '1000px' }}>
        <EventModal
          show={this.state.showModal}
          onClose={this.toggleModal}
          onDelete={this.removeEvent}
          selEvent={this.state.selectedEvent}
        />
        <DragAndDropCalendar
          selectable
          culture="en-GB"
          events={this.state.calendar}
          onEventDrop={this.moveEvent}
          resizable
          onDoubleClickEvent={event => this.toggleModal(event)}
          onEventResize={this.resizeEvent}
          defaultView="week"
          defaultDate={new Date(2015, 3, 12)}
        />
      </div>
    );
  }
}

const mapState = state => {
  console.log('state',state)
  // let loadedEvents = [];
  // if(state.calendar.length) state.calendar.forEach(visit => {
  //   loadedEvents.push({
  //     start: new Date(visit.start),
  //     end: new Date(visit.end),
  //     title: visit.title,
  //     id: visit.id,
  //   });
  // });

  return {
    events: state.calendar,
  };
};

const mapDispatch = dispatch => {
  return {
    loadVisits() {
      dispatch(getVisits());
    },
    removeVisit(visit) {
      console.log('delvisits');
      dispatch(deleteVisit(visit));
    },
  };
};

export default connect(mapState, mapDispatch)(DragDropContext(HTML5Backend)(Dnd));
