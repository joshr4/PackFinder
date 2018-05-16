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
  const styles = {
    dashboardList: {
      boxShadow:
        '  rgba(0, 0, 0, 0.2) 2px 3px 11px, rgba(0, 0, 0, 0.2) 1px 2px 9px',
      width: '100%',
    },
  };
  const { nearbyParks } = props;
  return (
    <Card style={styles.dashboardList}>
      <h3 style={{ margin: '0.5em' }}>Nearby Parks</h3>
      <Card.Content style={{ padding: '0' }} className="dashboard-card">
        <Feed className="overflow-scroll dashboard-feed">
          {nearbyParks && nearbyParks.map(park => (
            <NearbyParksListItem key={park.id} park={park} />
          ))}
        </Feed>
      </Card.Content>
    </Card>
  );
};

/**
 * CONTAINER
 */
const mapState = ({ nearbyParks }) => ({ nearbyParks });

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
