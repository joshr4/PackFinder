import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button, Image } from 'semantic-ui-react';
import faker from 'faker';
import { getNearByUsersInfo, getGeolocation } from '../../store';
import history from '../../history';

/**
 * COMPONENT
 */

export const NearbyParks = props => {
  const { park } = props;
  return (
    <Feed.Event>
      <Feed.Content>
      <Feed.Summary>{`${park.name}`}</Feed.Summary>
        <Feed.Date content={`Address: ${park.address.fullAddress}`} />
        <Feed.Summary>{`${park.description}`}</Feed.Summary>
        {/* <Feed.Extra images>
          <Image size="large" src={pet.image} />
        </Feed.Extra> */}
        <Feed.Extra>
          <Button size="tiny" name="add" onClick={() => history.push(`/dog-park/${park.id}`)} >
            Park Details
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
    nearbyUsers: state.nearbyUsers
  };
};

const mapDispatch = dispatch => {
  return {
    getSuggestedFriends(location) {
      dispatch(getNearByUsersInfo(location))
    },
    getUserLocation() {
      dispatch(getGeolocation())
    },
  };
};

export default connect(mapState, mapDispatch)(NearbyParks);

/**
 * PROP TYPES
 */
NearbyParks.propTypes = {
  email: PropTypes.string,
};
