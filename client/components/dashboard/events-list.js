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
  removeFriend,
  declineRequest,
  getNearByEventsInfo,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getEvents
} from '../../store';
import { EventsListTab } from '../';

/**
 * COMPONENT
 */

export class EventsList extends Component {
  componentDidMount = async () => {
    const {
      fetchFriendsList,
      fetchReceivedRequests,
      fetchSentRequests,
      user,
    } = this.props;
    let loadFriendsList = [
      fetchFriendsList(user.id),
      fetchReceivedRequests(user.id),
      fetchSentRequests(user.id),
    ];
    getNearByEventsInfo()
    Promise.all(loadFriendsList).then(this.setState({ loading: false }));
  };

  state = { activeIndex: 0, loading: true };
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    // console.log('state', this.state);
    // console.log('state events', this.state);

    const {
      nearbyUsers,
      sentRequests,
    } = this.props.friendsList;


    const {
      fetchFriendsList,
      fetchNearbyUsers,
      fetchReceivedRequests,
      fetchSentRequests,
      declineFriendRequest,
      user,
      userEvents,
      nearbyEvents,
      attendingEvents,
      invitedEvents,
      deleteEvent,
      addAttendee,
      removeAttendee,

    } = this.props;
    const styles = {
      menuLabels: {
        zIndex: '0',
        marginLeft: '0.3em',
        position: 'absolute',
        top: '-10px',
        right: '-3px',
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
          <Menu.Item
            key="Your Events"
            style={styles.menuItem}
          >
            Your Events<Label style={styles.menuLabels}>{userEvents.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchFriendsList}
              items={userEvents}
              submit={deleteEvent}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item
            key="Nearby Events"
            style={styles.menuItem}
          >
            Nearby<Label style={styles.menuLabels}>
              {nearbyEvents.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchReceivedRequests}
              items={nearbyEvents}
              submit={addAttendee}
              decline={declineFriendRequest}
              user={user}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item
            key="Attending"
            style={styles.menuItem}
          >
            Attending<Label style={styles.menuLabels}>
              {attendingEvents.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchNearbyUsers}
              items={attendingEvents}
              submit={removeAttendee}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Invited" style={styles.menuItem}>
            Invited<Label style={styles.menuLabels}>{invitedEvents.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              fetchData={fetchSentRequests}
              items={invitedEvents}
              submit={addAttendee}
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
// const mapState = ({ friendsList, user, events }) => ({ friendsList, user, events });

const mapState = state => {
  return {
    friendsList: state.friendsList,
    userEvents: state.events.filter(event => event.creatorId === state.user.id),
    user: state.user,
    attendingEvents: state.events.filter(event => event.attendees.filter(invitee => invitee.id === state.user.id).length),
    invitedEvents: state.events.filter(event => event.invitees.filter(invitee => invitee.id === state.user.id).length),
    nearbyEvents: state.nearbyEvents.filter(event => event.attendees.filter(attendee => attendee.id   !== state.user.id))
  };
}

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
    removeAttendee(event, userId) {
      dispatch(removeAttendee(event, userId));
    },
    async addAttendee(event, userId) {
      await dispatch(addAttendee(event, {userId: userId}));
      dispatch(getEvents())
    },
    removeInvite(event, userId) {
      //dispatch(removeInvite(event, userId));
    },
    deleteEvent(event, userId) {
      dispatch(deleteEvent(event.id));
    },
    getNearByEventsInfo() {
      return dispatch(getNearByEventsInfo());
    }
  };
};

export default connect(mapState, mapDispatch)(EventsList);
