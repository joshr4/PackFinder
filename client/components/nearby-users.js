import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button } from 'semantic-ui-react';
import faker from 'faker';

/**
 * COMPONENT
 */


export const NearbyUsers = props => {
    console.log('props', props)
    const {user, pet} = props.user
  return (
    <Feed.Event>
      <Feed.Label image={user.image} />
      <Feed.Content>
        <Feed.Date content={`${user.distance} away`} />
        <Feed.Summary>
         { `${user.name}'s pack:`}
        </Feed.Summary>
        <Feed.Extra images>
        <img src={pet.image} />
        </Feed.Extra>
        <Feed.Extra>
          <Button size="tiny" name="add">request friend</Button>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
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

export default connect(mapState)(NearbyUsers);

/**
 * PROP TYPES
 */
NearbyUsers.propTypes = {
  email: PropTypes.string,
};
