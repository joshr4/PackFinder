import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form, List, Input } from 'semantic-ui-react';
import moment from 'moment'
import axios from 'axios'
import history from '../../history'
import { AddEventForm } from '../index';

class AddAttendeeModal extends Component {
  constructor(props) {
    super(props);
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
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let variable = e.target.name
    let value
    if (variable === 'private') value = !this.state.item.private
    else value = e.target.value
    this.setState({ isDirty: true, item: Object.assign(this.state.item, { [variable]: value }) })
  }

  render() {
    let { onClose, showModal, onDelete, handleSubmit, userFriends, invitedFriends } = this.props
    let { description, item, isDirty, user,
      // userFriends
    } = this.state
    userFriends = (userFriends) ? (userFriends) : [];

    return (
      <Modal open={showModal} onClose={() => onClose()} style={{ width: 'console' }} closeIcon>
        <Modal.Content image>
        <Form style={{width:"100%"}} onSubmit={handleSubmit}>
        <h3>Already Invited</h3>
        <Grid style={{width:"100%"}}>
        <Grid.Row columns={16}>
            {invitedFriends.length ? invitedFriends.map(invited => {
              return (
                <Grid.Column width={5} key={invited.id} >
                <List.Item style={{paddingBottom:"10px"}}>
                <Image avatar src={invited.imageUrl}/>
                <List.Content>
                  <List.Header style={{fontSize:"13px"}}><b>{invited.fullName}</b></List.Header>
                </List.Content>
              </List.Item>
              </Grid.Column>
            )
            }) :
            <div style={{padding: '5px'}}><h4>No friends invited!</h4>
            </div>}
        </Grid.Row>
        </Grid>      
        
          <h3>Invite Friends</h3>
          <Grid style={{width:"100%"}}>
          <Grid.Row columns={16}>
              {userFriends.length ? userFriends.map(friend => {
                return (
                  <Grid.Column width={5} key={friend.id} >
                  <Form.Field name={"friend-" + friend.id} value={{}} control='input' type='checkbox' style={{marginRight:"10px"}} />
                  <List.Item style={{paddingBottom:"10px"}}>
                  <Image avatar src={friend.imageUrl}/>
                  <List.Content>
                    <List.Header style={{fontSize:"13px"}}><b>{friend.fullName + friend.id}</b></List.Header>
                  </List.Content>
                </List.Item>
                </Grid.Column>
              )
              }) :
              <div style={{padding: '5px'}}><h4>You have no friends, add some from the Home page!</h4>
              <Button color="blue" onClick={() => history.push(`/home`)}> Home Page </Button>
              </div>}
          </Grid.Row>
          </Grid>
          <Button positive floated="right" type="submit" style={{ marginRight: 20}}>Invite Selected Friends</Button>
        </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
export default AddAttendeeModal;
