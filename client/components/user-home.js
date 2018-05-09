import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';
import { NearbyUsers } from '.';
/**
 * COMPONENT
 */

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
export const UserHome = props => {
  const { email } = props;

  return (
    <div className="container">
      <Grid columns={2} centered style={{ padding: '2em' }}>
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
          <h3>Welcome , {email}</h3>
        </Grid.Column>
      </Grid>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
