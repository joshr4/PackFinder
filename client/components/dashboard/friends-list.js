import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Menu, Label } from 'semantic-ui-react';
import {
  getNearByUsersInfo,
  getSentRequests,
  getFriendsList,
  getReceivedRequests,
  approveRequest,
  addSentRequest,
  removeSentRequest,
  sendFriendRequest,
  removeFriend,
  declineRequest,
} from '../../store';
import { FriendsListTab } from '../';

/**
 * COMPONENT
 */

export class FriendsList extends Component {
  componentDidMount = async () => {
    const {
      fetchFriendsList,
      fetchNearbyUsers,
      fetchReceivedRequests,
      fetchSentRequests,
      sendfriendRequest,
      user,
    } = this.props;
    let loadFriendsList = [
      fetchFriendsList(user.id),
      fetchReceivedRequests(user.id),
      fetchSentRequests(user.id),
    ];
    Promise.all(loadFriendsList).then(this.setState({ loading: false }));
  };

  state = { activeIndex: 0, loading: true };
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    // console.log('state', this.state);

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
      submitApproveRequest,
      sendFriendRequest,
      removeFriendRequest,
      deleteFriend,
      declineFriendRequest,
      user,
    } = this.props;
    const sentRequestIds = sentRequests.map(sentRequest => sentRequest.id);
    const filteredNearbyUsers = nearbyUsers.filter(
      nearbyUser => !sentRequestIds.includes(nearbyUser.id)
    );
    const styles = {
      menuLabels: {
        zIndex: '0',
        marginLeft: '0.3em',
        position: 'absolute',
        top: '-10px',
        right: '-3px',
        background: '#54b9bf',
      },
      menuItem: {
        padding: '1em 0.5em',
        flex: '1',
        justifyContent: 'center',
      },
    };
    const panes = [
      {
        menuItem: (
          <Menu.Item key="Your Pack" style={styles.menuItem}>
            Your Pack<Label style={styles.menuLabels}>{friends.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchFriendsList}
              items={friends}
              submit={deleteFriend}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Requests" style={styles.menuItem}>
            Requests<Label style={styles.menuLabels}>
              {receivedRequests.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchReceivedRequests}
              items={receivedRequests}
              submit={submitApproveRequest}
              decline={declineFriendRequest}
              user={user}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Nearby Users" style={styles.menuItem}>
            Nearby Users<Label style={styles.menuLabels}>
              {filteredNearbyUsers.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchNearbyUsers}
              items={filteredNearbyUsers}
              submit={sendFriendRequest}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Sent" style={styles.menuItem}>
            Sent<Label style={styles.menuLabels}>{sentRequests.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchSentRequests}
              items={sentRequests}
              submit={removeFriendRequest}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Tab
        menu={{ attached: true, tabular: false }}
        renderActiveOnly
        loading={this.state.loading.toString()}
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
const mapState = ({ friendsList, user }) => ({ friendsList, user });

const mapDispatch = dispatch => {
  return {
    fetchNearbyUsers(location) {
      // console.log('INSIDE FETCH NEARBY USERS')
      return dispatch(getNearByUsersInfo(location));
    },
    fetchFriendsList(userId) {
      // console.log('INSIDE FETCH FRIENDS')
      return dispatch(getFriendsList(userId));
    },
    fetchSentRequests(userId) {
      // console.log('INSIDE FETCH SENT REQS ')
      return dispatch(getSentRequests(userId));
    },
    fetchReceivedRequests(userId) {
      // console.log('INSIDE FETCH RECEIVED REQS')
      return dispatch(getReceivedRequests(userId));
    },
    submitApproveRequest(userId, senderId) {
      //console.log('INSIDE SUBMIT APPROVE REQUEST')
      return dispatch(approveRequest(userId, senderId));
    },
    sendFriendRequest(userId, senderId) {
      //console.log('INSIDE APPROVE REQUEST')
      return dispatch(addSentRequest(userId, senderId));
    },
    removeFriendRequest(userId, senderId) {
      // console.log('INSIDE CANCEL REQUEST');
      return dispatch(removeSentRequest(userId, senderId));
    },
    declineFriendRequest(userId, senderId) {
      // console.log('INSIDE CANCEL REQUEST');
      return dispatch(declineRequest(userId, senderId));
    },
    deleteFriend(userId, senderId) {
      console.log('INSIDE DELETE FRIEND');
      return dispatch(removeFriend(userId, senderId));
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
