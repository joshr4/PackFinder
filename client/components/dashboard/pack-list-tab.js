import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Card,
  Feed,
  Button,
  Image,
  Label,
  Menu,
  Tab,
} from 'semantic-ui-react';
import { PackListItem } from '../';
/**
 * COMPONENT
 */

export const PackListTab = props => {
  const { items } = props;
  return <Feed>{items && items.map(item => <PackListItem key={item.id} item={item} />)}</Feed>;
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

export default connect(mapState, mapDispatch)(PackListTab);

/**
 * PROP TYPES
 */
PackListTab.propTypes = {
  email: PropTypes.string,
};
