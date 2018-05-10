import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { NearbyUsers, UserHomeCalendar, NearbyParks } from '.';

/**
 * COMPONENT
 */

class UserHome extends Component {

  constructor(props) {
    super(props);
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

    return (
      <div className="container">
        <Grid columns={3} centered style={{ padding: '2em' }}>
          <Grid.Column>
            <Card>
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
      };
    };

const mapDispatch = dispatch => {
  return {
          // getEveryAddresses() {
          //   dispatch(getParksAddresses());
          // },
          // getUserLocation() {
          //   dispatch(getGeolocation())
          // },
          // getNearbyParks(lat, lng, dist){
          //   dispatch(getNearByParksAddresses(lat, lng, dist))
          // },
          // getNearByUsers(location){
          //   dispatch(getNearByUsersInfo(location))
          // }
        };
      };

      export default connect(mapStateToProps, mapDispatch)(UserHome);

      /**
       * PROP TYPES
       */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
