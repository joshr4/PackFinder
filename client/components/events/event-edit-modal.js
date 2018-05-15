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
  }

  handleChange = (e) => {
    let variable = e.target.name
    let value
    if (variable === 'private') value = !this.state.item.private
    else value = e.target.value
    console.log('val',value)
    this.setState({ isDirty: true, item: Object.assign(this.state.item, { [variable]: value }) })
  }

  render() {
    let { onClose, showModal, onDelete, handleSubmit } = this.props
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
              handleSubmit={() => isDirty ? handleSubmit(item) : onClose()}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default EventEditModal;
