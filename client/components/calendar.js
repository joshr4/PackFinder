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
      selectedEvent: {},
      showModal: false,
    };
    this.moveEvent = this.moveEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    axios.get('api/visits').then(response => {
      let visits = response.data;
      let loadedEvents = [];
      visits.forEach(visit => {
        loadedEvents.push({
          start: new Date(visit.start),
          end: new Date(visit.end),
          title: visit.park.name,
          id: visit.id,
        });
      });
      this.setState({
        //   events:response.data
        events: loadedEvents,
      });
    });
  }

  toggleModal(){
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });

    //alert(`${event.title} was dropped onto ${event.start}`);
  }

  removeEvent(event) {
    let removeEventIndex = this.state.events.indexOf(event);
    let newEvents = this.state.events;
    newEvents.splice(removeEventIndex, 1);
    //open modal
    this.setState({
      events: newEvents,
      selectedEvent: event,
    });
    this.toggleModal()
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

    //alert(`${event.title} was resized to ${start}-${end}`);
  };

  render() {
    return (
      <div style={{ height: '1000px' }}>
        <EventModal show={this.state.showModal} onClose={this.toggleModal} onDelete={this.removeEvent} />
        <DragAndDropCalendar
          selectable
          culture="en-GB"
          events={this.state.events}
          onEventDrop={this.moveEvent}
          resizable
          onDoubleClickEvent={this.toggleModal}
          onEventResize={this.resizeEvent}
          defaultView="week"
          defaultDate={new Date(2015, 3, 12)}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Dnd);
