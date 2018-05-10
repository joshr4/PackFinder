import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { NearbyUsers, UserHomeCalendar, NearbyParks } from '.';
import {
  getParksAddresses,
  getGeolocation,
  getNearByParksAddresses,
  getNearByUsersInfo,
} from '../store';

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
    const users = [
      {
        user: {
          name: 'Jack',
          image: faker.image.avatar(),
          distance: '1 mile',
        },
        pet: {
          name: 'Nova',
          image: 'https://images.dog.ceo/breeds/kuvasz/n02104029_1313.jpg',
        },
      },
      {
        user: {
          name: 'Jim',
          image: faker.image.avatar(),
          distance: '1 mile',
        },
        pet: {
          name: 'Nicolette',
          image: 'https://images.dog.ceo/breeds/boxer/n02108089_1159.jpg',
        },
      },
      {
        user: {
          name: 'Dave',
          image: faker.image.avatar(),
          distance: '1 mile',
        },
        pet: {
          name: 'Rollin',
          image:
            'https://images.dog.ceo/breeds/pinscher-miniature/n02107312_6541.jpg',
        },
      },
    ];
    const {nearbyUsers, parkList} = this.props;
    return (
      <div className="container">
        <Grid columns={3} centered style={{ padding: '2em' }}>
          <Grid.Column>
            <Card style={{ width: '100%' }}>
              <Card.Content>
                <Card.Header>Suggested friends</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {users.map(user => <NearbyUsers key={user.id} user={user} />)}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>Suggested Parks</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  {users.map(user => <NearbyParks key={user.id} parks={parks} />)}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>Welcome , {this.props.email}</Card.Header>
                {/* <UserHomeCalendar /> */}
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
