import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button, Image } from 'semantic-ui-react';
import faker from 'faker';
import { getNearByUsersInfo, getGeolocation } from '../store';

/**
 * COMPONENT
 */

export const PackList = props => {
  // console.log('props', props);
  const {
    email,
    pets,
    imageUrl,
    address,
  } = props.user;
  return (
    <Feed.Event>
      <Feed.Label image={imageUrl} />
      <Feed.Content>
        <Feed.Date content={`${address.location.distance} mi away`} />
        <Feed.Summary>{`${email.split('.')[0]}'s pack:`}</Feed.Summary>
        <Feed.Extra images>
          <Image size="large" src={pets[0].imageUrls[0]} />
        </Feed.Extra>
        <Feed.Extra>
          <Button size="tiny" name="add">
            request friend
          </Button>
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

const mapDispatch = dispatch => {
  return {
    getSuggestedFriends(location) {
      dispatch(getNearByUsersInfo(location));
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
  };
};

export default connect(mapState, mapDispatch)(PackList);

/**
 * PROP TYPES
 */
PackList.propTypes = {
  email: PropTypes.string,
};
