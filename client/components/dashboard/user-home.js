import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { FriendsList, UserHomeCalendar, NearbyParksList, EventsList, EventMini, EventEditModal } from '../';

import {
  getParksAddresses,
  getGeolocation,
  getNearByParksAddresses,
  getNearByUsersInfo,
  findUsersByName,
  getNearByEventsInfo,
  addEvent
} from '../../store';

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      location: {
        lat: 41.895266,
        lng: -87.6412237,
      },
      isHover: -1,
      showAddEventModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({ showAddEventModal: !this.state.showAddEventModal })
  }

  componentDidMount() {
    // this.props.getEveryAddresses();
    this.props.getUserLocation();
    this.props.getNearbyParks(this.state.location, 3218); //3218 = 2 miles in meters
    this.props.getNearByUsers(this.state.location); //3218 = 2 miles in meters
    // this.props.getNearByUsers(this.state.location)
    // this.props.findUsers('ricky li')
    this.props.getNearByEvents(this.state.location, 8046)
    // console.log(this.props)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userPosition !== this.props.userPosition){
      this.setState({location: {lat: nextProps.userPosition.latitude, lng: nextProps.userPosition.longitude}}, () => {
        this.props.getNearbyParks(this.state.location, 3218); //3218 = 2 miles in meters
        this.props.getNearByUsers(this.state.location); //3218 = 2 miles in meters
        this.props.getNearByEvents(this.state.location, 8046)
      })
    }
  }

  render() {
    const { parkList, user, dropDownParks } = this.props;
    const { showAddEventModal } = this.state;
    return (
      <div className="container">
        <EventEditModal onClose={this.toggleModal} showModal={showAddEventModal} handleSubmit={() => { }} parkDropDownList={dropDownParks} handleEvent={this.props.addEvent} user={user} />
        <Grid columns={3} centered style={{ padding: '0em 0.2em' }}>
          <Grid.Column mobile={16} tablet={8} computer={5} largeScreen={5}>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Pack List</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                {user && <FriendsList className="pack-list" user={user} />}
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column
            only={'computer'}
            tablet={8}
            computer={5}
            largeScreen={5}
          >
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Nearby Parks</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                <Feed className="overflow-scroll dashboard-feed">
                {parkList && <NearbyParksList className="pack-list" parkList={parkList} />}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column only={'computer'} tablet={8} computer={5}>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Upcoming Events</Card.Header>
                <Button positive floated="right" style={{ marginRight: 20, marginTop: 20 }} onClick={this.toggleModal}>+</Button>
              </Card.Content>
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                {/* <Feed> */}
                  {user && <EventsList className="event-list" user={user} />}
                {/* </Feed> */}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })
  return {
    email: state.user.email.toString(),
    parkList: state.parkList,
    dropDownParks: dropDownParks,
    nearbyUsers: state.nearbyUsers,
    user: state.user,
    events: state.events,
    usersList: state.usersList,
    userPosition: state.location.coords
  };
};

const mapDispatch = dispatch => {
  return {
    getEveryAddresses() {
      dispatch(getParksAddresses());
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
    getNearbyParks(lat, lng, dist) {
      dispatch(getNearByParksAddresses(lat, lng, dist));
    },
    getNearByUsers(location) {
      dispatch(getNearByUsersInfo(location));
    },
    // findUsers(name){
    //   dispatch(findUsersByName(name));
    // }
    getNearByEvents(location, dist) {
      dispatch(getNearByEventsInfo(location, dist));
    },
    addEvent(event) {
      dispatch(addEvent(event));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
