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
<<<<<<< HEAD
  // sendfriendRequest
=======
  removeSentRequest,
>>>>>>> 9cf6db217e4bf53ceab417d7503a1118527e80fa
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
<<<<<<< HEAD
      sendfriendRequest,
      user
=======
      user,
>>>>>>> 9cf6db217e4bf53ceab417d7503a1118527e80fa
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
<<<<<<< HEAD
      sendfriendRequest,
      user
=======
      sendFriendRequest,
      removeFriendRequest,
      user,
>>>>>>> 9cf6db217e4bf53ceab417d7503a1118527e80fa
    } = this.props;
    const sentRequestIds = sentRequests.map(sentRequest => sentRequest.id);
    const filteredNearbyUsers = nearbyUsers.filter(
      nearbyUser => !sentRequestIds.includes(nearbyUser.id)
    );
    const panes = [
      {
        menuItem: (
          <Menu.Item key="pack" style={{flex: '1', justifyContent: 'center'}}>
            pack<Label floating style={{zIndex: '0'}}>{friends.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab fetchData={fetchFriendsList} items={friends} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="requests" style={{flex: '1', justifyContent: 'center'}}>
            requests<Label floating style={{zIndex: '0'}}>{receivedRequests.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              fetchData={fetchReceivedRequests}
              items={receivedRequests}
              submit={submitApproveRequest}
              user={user}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="nearby users" style={{flex: '1', justifyContent: 'center'}}>
            nearby users<Label floating style={{zIndex: '0'}}>{filteredNearbyUsers.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              fetchData={fetchNearbyUsers}
              items={filteredNearbyUsers}
              submit={sendFriendRequest}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="sent" style={{flex: '1', justifyContent: 'center'}}>
            sent<Label floating style={{zIndex: '0'}}>{sentRequests.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <FriendsListTab
              fetchData={fetchSentRequests}
              items={sentRequests}
              remove={removeFriendRequest}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Tab
        // style={{alignItems: 'center' }}
        menu={{ attached: true, tabular: false }}
        renderActiveOnly
        // onTabChange={(e, data ) => console.log('tab chg', e, 'data', data)}
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
    sendfriendRequest(userId, senderId) {
      console.log('INSIDE SEND FRIEND REQUESTs')
      return dispatch(addSentRequest(userId, senderId));
    },
    submitApproveRequest(userId, senderId) {
      console.log('INSIDE SUBMIT APPROVE REQUEST')
      return dispatch(approveRequest(userId, senderId));
    },
    sendFriendRequest(userId, senderId) {
      // console.log('INSIDE APPROVE REQUEST')
      return dispatch(addSentRequest(userId, senderId));
    },
    removeFriendRequest(userId, senderId) {
      // console.log('INSIDE CANCEL REQUEST');
      return dispatch(removeSentRequest(userId, senderId));
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
