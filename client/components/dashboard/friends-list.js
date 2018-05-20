import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Menu, Label, Card } from 'semantic-ui-react';
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
  findUsersByName,
} from '../../store';
import { FriendsListTab, FriendsListSearch } from '../';

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

    if (
      !this.props.friendsList.friends.length &&
      !this.props.friendsList.nearbyUsers.length &&
      !this.props.friendsList.receivedRequests.length &&
      !this.props.friendsList.sentRequests.length
    ) {
      let loadFriendsList = [
        fetchFriendsList(user.id),
        fetchReceivedRequests(user.id),
        fetchSentRequests(user.id),
      ];
    }
  };

  state = { activeIndex: 0, loading: true };
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const {
      nearbyUsers,
      friends,
      receivedRequests,
      sentRequests,
      search,
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
      searchUsers,
      user,
      userPosition,
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
        padding: '0.5em 0.5em',
        flex: '1',
        justifyContent: 'center',
      },
      dashboardList: {
        boxShadow:
          '  rgba(0, 0, 0, 0.2) 2px 3px 11px, rgba(0, 0, 0, 0.2) 1px 2px 9px',
        width: '100%',
      },
    };
    const panes = [
      {
        menuItem: (
          <Menu.Item key="Your Pack" style={styles.menuItem}>
            Your Pack
            {friends.length ? (
              <Label style={styles.menuLabels}>{friends.length}</Label>
            ) : null}
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
            Requests
            {receivedRequests.length ? (
              <Label style={styles.menuLabels}>{receivedRequests.length}</Label>
            ) : null}
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
            Nearby Users{filteredNearbyUsers.length ? (
              <Label style={styles.menuLabels}>
                {filteredNearbyUsers.length}
              </Label>
            ) : null}
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              activeIndex={this.state.activeIndex}
              mode={'fetchNearbyUsers'}
              userPosition={userPosition}
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
            Sent
            {sentRequests.length ? (
              <Label style={styles.menuLabels} content={sentRequests.length} />
            ) : null}
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
      {
        menuItem: (
          <Menu.Item key="Search" style={styles.menuItem}>
            Search
            {search.length ? (
              <Label style={styles.menuLabels}>{search.length}</Label>
            ) : null}
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListSearch
              activeIndex={this.state.activeIndex}
              fetchData={fetchSentRequests}
              items={search}
              submit={sendFriendRequest}
              searchUsers={searchUsers}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Card style={styles.dashboardList}>
        <h3 style={{ margin: '0.5em' }}>Pack List</h3>
        <Card.Content style={{ padding: '0' }}>
          <Tab
            menu={{ attached: true, tabular: false }}
            renderActiveOnly
            loading={this.state.loading.toString()}
            panes={panes}
            activeIndex={this.state.activeIndex}
            onTabChange={this.handleTabChange}
          />
        </Card.Content>
      </Card>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // ({ friendsList, user }) => ({ friendsList, user });

  return {
    friendsList: state.friendsList,
    user: state.user,
    userPosition: state.location.coords,
  };
};

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
      // console.log('INSIDE DELETE FRIEND');
      return dispatch(removeFriend(userId, senderId));
    },
    searchUsers(searchString) {
      // console.log('INSIDE DELETE FRIEND');
      return dispatch(findUsersByName(searchString));
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
