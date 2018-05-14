import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { FriendsList, UserHomeCalendar, NearbyParks } from '../';
import {
  getParksAddresses,
  getGeolocation,
  getNearByParksAddresses,
  getNearByUsersInfo,
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
    };
  }

  componentDidMount() {
    // this.props.getEveryAddresses();
    this.props.getUserLocation();
    this.props.getNearbyParks(this.state.location, 3218); //3218 = 2 miles in meters
    this.props.getNearByUsers(this.state.location); //3218 = 2 miles in meters
    // this.props.getNearByUsers(this.state.location)
  }

  render() {
    const { parkList, user } = this.props;
    return (
      <div className="container">
        <Grid columns={3} centered style={{ padding: '0em 0.2em' }}>
          <Grid.Column mobile={16} tablet={8} computer={5} largeScreen={5}>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Pack List</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0px', height: '70vh' }}>
                {user && <FriendsList className="pack-list" user={user} />}
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column only={'computer'} tablet={8} computer={5} largeScreen={5}>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Suggested Parks</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0px', height: '70vh' }}>
                <Feed className="overflow-scroll" style={{ height: '70vh'}}>
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
          <Grid.Column only={'computer'} computer={5} largeScreen={5}>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Suggested Parks</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0px', height: '70vh' }}>
                <Feed className="overflow-scroll" style={{ height: '70vh'}}>
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
  };
};

export default connect(mapStateToProps, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
