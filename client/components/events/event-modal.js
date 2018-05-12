import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form } from 'semantic-ui-react';
import moment from 'moment'
import { AddEventForm } from '../index';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        description: props.item.description,
        date: moment(props.item.start).format('YYYY-MM-DD'),
        startTime: moment(props.item.start).format('HH:mm'),
        parkId: props.item.parkId,
        private: props.item.private,
      }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitModal = this.handleSubmitModal.bind(this)
  }

  handleChange = (e) => {
    let variable = e.target.name
    let value = e.target.value
    this.setState({ item: Object.assign(this.state.item, { [variable]: value }) })
  }

  handleSubmitModal = () => this.props.handleSubmit(this.state.item)

  render() {
    let { onClose, showModal, onDelete } = this.props
    let { description, item } = this.state
    return (
      <Modal open={showModal} onClose={onClose} style={{ width: 'console' }} >
        <Grid>
          <Button color="blue" style={{ marginLeft: 35, marginTop: 20 }} onClick={() => onClose()}>Close</Button>
          <Button negative style={{ marginRight: 20, marginTop: 20 }} onClick={() => onDelete(item.id)}>Delete Event</Button>
        </Grid>
        <Modal.Content image>

          <Modal.Description>
            <h3> {description}</h3>
            <AddEventForm
              item={item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmitModal}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default EventModal;
