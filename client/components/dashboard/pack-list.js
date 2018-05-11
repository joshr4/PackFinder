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
import faker from 'faker';
import { getNearByUsersInfo, getGeolocation } from '../../store';
import {PackListTab} from '../'
/**
 * COMPONENT
 */

export const PackList = props => {
  console.log('inside packList')
  const {user, nearbyUsers} = props
  const panes = [
    {
      menuItem: { key: 'pack', content: 'pack' },
      render: () => <Tab.Pane><PackListTab items={user.friends} /></Tab.Pane>,
    },
    {
      menuItem: { key: 'requests', content: 'requests' },
      render: () => <Tab.Pane><PackListTab items={user.Requesters}/></Tab.Pane>,
    },
    {
      menuItem: {
        key: 'suggested',
        content: 'suggested',
      },
      render: () => <Tab.Pane><PackListTab items={nearbyUsers}/></Tab.Pane>,
    },
    {
      // menuItem: (
      //   <Menu.Item key="requests">
      //     Messages<Label>15</Label>
      //   </Menu.Item>
      // ),
      // render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];
  // const { email, pets, imageUrl, address } = props.user;
  return (
      <Tab panes={panes} />
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
