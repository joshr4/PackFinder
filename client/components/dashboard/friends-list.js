import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import {
  getNearByUsersInfo,
  getSentRequests,
  getFriendsList,
  getReceivedRequests,
} from '../../store';
import { FriendsListTab } from '../';

/**
 * COMPONENT
 */

export class FriendsList extends Component{

  componentDidMount = () => {
    const {
      fetchFriendsList,
      fetchNearbyUsers,
      fetchReceivedRequests,
      fetchSentRequests,
      user
    } = this.props;
    fetchFriendsList(user.id)
    fetchReceivedRequests(user.id)
    fetchSentRequests(user.id)
  };

  state = { activeIndex: 0 };
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    console.log('inside packList');
    const {
      nearbyUsers,
      friends,
      receivedRequests,
      sentRequests,
    } = this.props.friendsList;
    const {
      fetchFriendsList,
      fetchNearbyUsers,
      fetchReceivedRequests,
      fetchSentRequests,
    } = this.props;
    const panes = [
      {
        menuItem: { key: 'pack', content: 'pack' },
        render: () => (
          <Tab.Pane>
            <FriendsListTab fetchData={fetchFriendsList} items={friends} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: 'requests', content: 'requests' },
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              fetchData={fetchReceivedRequests}
              items={receivedRequests}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: 'nearby users',
          content: 'nearby users',
        },
        render: () => (
          <Tab.Pane>
            <FriendsListTab fetchData={fetchNearbyUsers} items={nearbyUsers} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: 'sent',
          content: 'sent',
        },
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              fetchData={fetchSentRequests}
              items={sentRequests}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Tab
        panes={panes}
        activeIndex={this.state.activeIndex}
        onTabChange={this.handleTabChange}
      />
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ friendsList }) => ({ friendsList });

const mapDispatch = dispatch => {
  return {
    fetchNearbyUsers(location) {
      console.log('INSIDE FETCH NEARBY USERS')
      return dispatch(getNearByUsersInfo(location));
    },
    fetchFriendsList(userId) {
      console.log('INSIDE FETCH FRIENDS')
      return dispatch(getFriendsList(userId));
    },
    fetchSentRequests(userId) {
      console.log('INSIDE FETCH SENT REQS ')
      return dispatch(getSentRequests(userId));
    },
    fetchReceivedRequests(userId) {
      console.log('INSIDE FETCH RECEIVED REQS')
      return dispatch(getReceivedRequests(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(FriendsList);

/**
 * PROP TYPES
 */
FriendsList.propTypes = {
  email: PropTypes.string,
};
