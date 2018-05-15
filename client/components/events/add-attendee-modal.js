import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form, List, Input } from 'semantic-ui-react';
import moment from 'moment'
import axios from 'axios'
import { AddEventForm } from '../index';

class AddAttendeeModal extends Component {
  constructor(props) {
    super(props);
    console.log("props.userFriends (attendee modal) ", props.userFriends);
    this.state = {
      isDirty: false,
      item: {
        description: props.item.description,
        date: moment(props.item.start).format('YYYY-MM-DD'),
        startTime: moment(props.item.start).format('HH:mm'),
        parkId: props.item.parkId,
        private: props.item.private,
        id: props.item.id,
      },
      user: props.user,
      userFriends:props.userFriends,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let variable = e.target.name
    let value
    if (variable === 'private') value = !this.state.item.private
    else value = e.target.value
    this.setState({ isDirty: true, item: Object.assign(this.state.item, { [variable]: value }) })
  }

  handleSubmit = (e) => {
    console.log("submitting add attendee modal: ", e.target);
    let friendIDs = [];
    for (let K in e.target) {
      if (e.target[K] && e.target[K].value && K != "classList"
        // && ('checked' in event.target[K])
      ) {
        console.log("K: ", K);
        console.log("value: ", e.target[K].value);
        console.log("checked: ", e.target[K].checked);
        if (typeof parseInt(K) == "number") {
          let relatedId = this.props.userFriends[K].id;
          console.log("relatedId: ", relatedId);
          friendIDs.push(relatedId);
        }
      }
    }
    console.log("friendIDs: ", friendIDs);
    //axios.put here
    axios.put(`/api/events/${this.props.item.id}/invite-users`, 
    {userIds: friendIDs}
    ).then(response => {
      this.props.onClose();
    })
  }

  render() {
    let { onClose, showModal, onDelete, handleSubmit, userFriends } = this.props
    let { description, item, isDirty, user, 
      // userFriends 
    } = this.state
    userFriends = (userFriends) ? (userFriends) : []; 
    console.log("attendeeModal userFriends: ", this.props.userFriends);
    return (
      <Modal open={showModal} onClose={() => onClose()} style={{ width: 'console' }} >
        <Button color="blue" style={{ marginLeft: 20, marginTop: 20 }} onClick={() => onClose()}>Close</Button>
        <Modal.Content image>

        <Form style={{width:"auto"}} onSubmit={this.handleSubmit}>          
          <Modal.Description>
          <h3>Invite Friends</h3>
          <Grid>
          <Grid.Row columns={16}>
              {userFriends.map(friend => {
                return (
                  <Grid.Column width={5}>
                  <Form.Field name={"friend-" + friend.id} value={{}} control='input' type='checkbox' style={{marginRight:"10px"}} />
                  <List.Item style={{paddingBottom:"10px"}}>
                  <Image avatar src={friend.imageUrl}/>
                  <List.Content>
                    <List.Header style={{fontSize:"13px"}}><b>{friend.fullName}</b></List.Header>
                  </List.Content>
                </List.Item>
                </Grid.Column>
              )
              })}
          </Grid.Row>
          </Grid>
          </Modal.Description>
          <Button positive floated="right" type="submit" style={{ marginRight: 20 }}>Invite Selected Friends</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
export default AddAttendeeModal;
