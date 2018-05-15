import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form } from 'semantic-ui-react';
import moment from 'moment'
import { AddEventForm } from '../index';

class EventEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      item: props.item ? {
        description: props.item.description,
        date: moment(props.item.start).format('YYYY-MM-DD'),
        startTime: moment(props.item.start).format('HH:mm'),
        parkId: props.item.parkId,
        private: props.item.private,
        id: props.item.id,
      } : {
          description: '',
          date: moment().format('YYYY-MM-DD'),
          startTime: moment().format('HH:mm'),
          parkId: 1,
          private: false,
        }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFieldChange = data => {
    this.setState({
      item: Object.assign(this.state.item, { parkId: data.value }),
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
    let newEvent
    if (this.props.user) newEvent = Object.assign(stateEvent, { start: startTime, creatorId: this.props.user.id })
    else newEvent = Object.assign(stateEvent, { start: startTime})
    this.props.handleEvent(newEvent)
    this.props.onClose()
  }

  handleChange = (e) => {
    console.log(e.target.value, e.target.name)
    let variable = e.target.name
    let value
    if (variable === 'private') value = !this.state.item.private
    else value = e.target.value
    this.setState({ isDirty: true, item: Object.assign(this.state.item, { [variable]: value }) })
  }

  render() {
    let { onClose, showModal, onDelete, parkDropDownList } = this.props
    let { description, item, isDirty } = this.state
    return (
      <Modal open={showModal} onClose={() => onClose()} style={{ width: 'console' }} >
        <Button color="blue" style={{ marginLeft: 20, marginTop: 20 }} onClick={() => onClose()}>Close</Button>

        <Button negative floated="right" style={{ marginRight: 20, marginTop: 20 }} onClick={() => onDelete(this.props.item.id)}>Delete Event</Button>
        <Modal.Content image>

          <Modal.Description>
            <h3> {description}</h3>
            <AddEventForm
              item={item}
              handleChange={this.handleChange}
              handleSubmit={() => isDirty ? this.handleSubmit(item) : onClose()}
              parkDropDownList={parkDropDownList}
              handleFieldChange={this.handleFieldChange}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default EventEditModal;
