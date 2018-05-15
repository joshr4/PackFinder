import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { FriendsList, UserHomeCalendar, NearbyParks, EventList, EventMini, EventEditModal } from '../';

import {
  getParksAddresses,
  getGeolocation,
  getNearByParksAddresses,
  getNearByUsersInfo,
  findUsersByName,
  getNearByEventsInfo,
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

  render() {
    const { parkList, user, events } = this.props;
    const { showAddEventModal } = this.state;
    return (
      <div className="container">
        <EventEditModal onClose={this.toggleModal} showModal={showAddEventModal} onDelete={() => { }} handleSubmit={() => { }} />
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
                <Card.Header>Suggested Parks</Card.Header>
              </Card.Content>
              <Card.Content className="dashboard-card">
                <Feed className="overflow-scroll dashboard-feed">
                  {parkList ? (
                    parkList.map(park => (
                      <NearbyParks key={park.id} park={park} />
                    ))
                  ) : (
                      <div />
                    )}
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
              <Card.Content>
                <Feed>
                  {events ? (
                    events.map(event => (
                      <EventMini key={event.id} item={event} />
                    ))
                  ) : (
                      <div />
                    )
                  }
                </Feed>
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
  return {
    email: state.user.email.toString(),
    parkList: state.parkList,
    nearbyUsers: state.nearbyUsers,
    user: state.user,
    events: state.events,
    usersList: state.usersList
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
  };
};

export default connect(mapStateToProps, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
