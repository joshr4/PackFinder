import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button, Image } from 'semantic-ui-react';
import faker from 'faker';
import { getNearByUsersInfo, getGeolocation } from '../../store';
import history from '../../history';
import { NearbyParksListItem } from '../';

/**
 * COMPONENT
 */

export const NearbyParksList = props => {
  const { parkList } = props;
  return (
    <div>
      {parkList.map(park => <NearbyParksListItem key={park.id} park={park} />)}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    nearbyUsers: state.nearbyUsers,
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

export default connect(mapState, mapDispatch)(NearbyParksList);

/**
 * PROP TYPES
 */
// NearbyParksList.propTypes = {
//   email: PropTypes.string,
// };
