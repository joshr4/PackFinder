import React, { Component } from 'react';
import { Map, ParkListItem, EventM, EventModal } from '../index.js';
import moment from 'moment';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Item,
  Label,
  Embed,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import axios from 'axios';
import {
  addEvent,
  updateEvent,
  deleteEvent
} from '../../store';
import { connect } from 'react-redux';

export class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isUpdateModal: false,
      map: {}
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    let {addEvent, updateEvent, deleteEvent} = this.props
    let {showModal, isUpdateModal} = this.state
    return (
      <div>
        <EventModal
        onClose={this.toggleModal}
        showModal={showModal}
        onSubmit={isUpdateModal ? updateEvent : addEvent}
        onDelete={deleteEvent}
        />
        <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
          <Container text style={{ marginBottom: '2em' }}>
            <Header as="h3" style={{ fontSize: '3em' }} textAlign="center">
              {}
            </Header>
          </Container>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment attached>
                  <b>
                    Address: <br />
                  </b>
                  {}
                </Segment>
                <Segment attached>{}</Segment>
                <Segment attached>
                  <b>
                    Description!!!: <br />
                  </b>
                  {}
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <p>MAP HERE</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment>
                  <h4>What goes here</h4>
            <Button positive style={{marginRight: 20, marginTop: 20}} onClick={() => this.toggleModal()}>Add Event</Button>
            <Button color="blue" style={{marginRight: 20, marginTop: 20}} onClick={() => updateEvent({id: 1, private: true, description: 'teafasfasd'})}>Edit Event</Button>
            <Button negative style={{marginRight: 20, marginTop: 20}} onClick={() => deleteEvent({id: 3})}>Delete Event</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br /> <br /> <br />
        </Segment>
      </div>
    );
  }
}
const mapState = state => {

  return {
    state: state
  };
};

const mapDispatch = dispatch => {
  return {
    addEvent(event) {
      dispatch(addEvent(event));
    },
    deleteEvent(event) {
      dispatch(deleteEvent(event));
    },
    updateEvent(event) {
      dispatch(updateEvent(event));
    },
  };
};
export default connect(mapState, mapDispatch)(EventDetail);
