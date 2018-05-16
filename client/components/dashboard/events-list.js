import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Menu, Label, Button, Card } from 'semantic-ui-react';
import {
  getNearByEventsInfo,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getEvents,
} from '../../store';
import { EventsListTab } from '../';

/**
 * COMPONENT
 */

export class EventsList extends Component {
  state = { activeIndex: 0, loading: false };
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const {
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
          <Menu.Item key="Your Events" style={styles.menuItem}>
            Your Events<Label style={styles.menuLabels}>
              {userEvents.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              items={userEvents}
              submit={deleteEvent}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Nearby Events" style={styles.menuItem}>
            Nearby<Label style={styles.menuLabels}>{nearbyEvents.length}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
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
          <Menu.Item key="Attending" style={styles.menuItem}>
            Attending<Label style={styles.menuLabels}>
              {attendingEvents.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              items={attendingEvents}
              submit={removeAttendee}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Invite" style={styles.menuItem}>
            Invites<Label style={styles.menuLabels}>
              {invitedEvents.length}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <EventsListTab
              activeIndex={this.state.activeIndex}
              items={invitedEvents}
              submit={addAttendee}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Card style={styles.dashboardList}>
        <Card.Content style={{ padding: '0px' }}>
          <div style={{ display: 'flex' }}>
            <h3 style={{ margin: '0.5em' }}>Upcoming Events</h3>
            <Button
              icon="plus"
              floated="right"
              style={{
                position: 'absolute',
                top: '5px',
                right: '6px',
                padding: '0.25em 0.2em',
                borderRadius: '50%',
                fontSize: '1.75em',
                color: 'rgb(83, 184, 191)',
                background: 'rgb(45, 66, 80)',
              }}
              onClick={this.toggleModal}
            />
          </div>
        </Card.Content>
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
  return {
    friendsList: state.friendsList,
    userEvents: state.events.filter(event => event.creatorId === state.user.id),
    user: state.user,
    attendingEvents: state.events.filter(
      event =>
        event.attendees.filter(invitee => invitee.id === state.user.id).length
    ),
    invitedEvents: state.events.filter(
      event =>
        event.invitees.filter(invitee => invitee.id === state.user.id).length
    ),
    nearbyEvents: state.nearbyEvents.filter(event =>
      event.attendees.filter(attendee => attendee.id !== state.user.id)
    ),
  };
};

const mapDispatch = dispatch => {
  return {
    removeAttendee(event, userId) {
      dispatch(removeAttendee(event, userId));
    },
    async addAttendee(event, userId) {
      await dispatch(addAttendee(event, userId));
      dispatch(getEvents());
    },
    removeInvite(event, userId) {
      //dispatch(removeInvite(event, userId));
    },
    deleteEvent(event, userId) {
      dispatch(deleteEvent(event.id));
    },
    getNearByEventsInfo() {
      return dispatch(getNearByEventsInfo());
    },
  };
};

export default connect(mapState, mapDispatch)(EventsList);
