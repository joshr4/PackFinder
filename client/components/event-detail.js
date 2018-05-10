import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, ParkListItem, VisitModal } from './index.js';
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
  Label, Embed,
  Form, Input, Radio, Select, TextArea, Checkbox
} from 'semantic-ui-react'
import axios from 'axios'
var Chart = require('react-d3-core').Chart;
import { BarChart, LineChart } from 'react-d3-basic'
import AddVisitForm from './addvisitform';
import { getVisits, deleteVisit, updateVisit, addVisit, getParksAddresses } from '../store';
import { connect } from 'react-redux';

// var LineChart = require('react-d3-basic').LineChart;

export class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }


  render() {

    return (

      <div>
        <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
          <Container text style={{ marginBottom: '2em' }}>
            <Header as="h3" style={{ fontSize: '3em' }} textAlign="center">{}</Header>
          </Container>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment attached>
                  <b>Address: <br /></b>
                  {}
                </Segment>
                <Segment attached>
                  {}
                </Segment>
                <Segment attached>
                  <b>Description: <br /></b>
                  {}
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                {/* <Map
                  zoom={15}
                  center={this.state.park.address.location}
                  markers={markers}
                  mapMoved={this.mapMoved.bind(this)}
                  mapLoaded={this.mapLoaded.bind(this)}
                  zoomChanged={this.zoomChanged.bind(this)}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                /> */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment>
                  <h4>What goes here</h4>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br /> <br /> <br />
        </Segment>


        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">Religious Ceremonies</List.Item>
                    <List.Item as="a">Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Banana Pre-Order</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}
const mapState = state => {
  let calEvents = state.visits.map(visit => {
    let newVisit = {
      id: visit.id,
      title: visit.title,
      start: new Date(visit.start),
      end: new Date(visit.end),
      address: visit.park.address,
      parkId: visit.park.id,
      userId: visit.userId
    }
    return newVisit
  })
  //{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })
  return {
    events: calEvents,
    user: state.user,
    parkList: dropDownParks
  };
};

const mapDispatch = dispatch => {
  return {
    async getData() {
      await dispatch(getVisits());
      await dispatch(getParksAddresses());
    },
    removeVisit(visit) {
      dispatch(deleteVisit(visit));
    },
    updateVisit(visit) {
      dispatch(updateVisit(visit));
    },
    async addNewVisit(visit) {
      await dispatch(addVisit(visit));
      await dispatch(getVisits());
    },
  };
};
export default connect(mapState, mapDispatch)(EventDetail)
