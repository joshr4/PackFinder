import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form } from 'semantic-ui-react';
import { AddVisitForm, AddEventForm } from '../index';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.item.description,
      start: props.item.start,
      end: props.item.end,
      park: props.item.park,
      private: props.item.private,
    };
  }
  render() {
    let { onClose, showModal, item, onDelete, isUpdateModal, onSubmit } = this.props
    console.log(this.props)
    let { description } = this.state
    return (
      <Modal open={showModal} onClose={onClose} style={{ width: '75vw' }} >
        <Grid>
          <Button color="blue" style={{ marginLeft: 35, marginTop: 20 }} onClick={() => onClose()}>Close</Button>
        </Grid>
        <Modal.Content image>
          <Button negative style={{ marginRight: 20, marginTop: 20 }} onClick={() => onDelete(item.id)}>Delete Event</Button>
          <Modal.Description>
            <h3> {description}</h3>
            <AddEventForm

            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default EventModal;
