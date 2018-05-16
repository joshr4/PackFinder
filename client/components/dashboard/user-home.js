import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Card, Feed, Button, Header, Dimmer, Loader, } from 'semantic-ui-react';
import faker from 'faker';
import {
  FriendsList,
  UserHomeCalendar,
  NearbyParksList,
  EventsList,
  EventMini,
  EventEditModal,
} from '../';

import {
  getParksAddresses,
  getGeolocation,
  getNearByParksAddresses,
  getNearByUsersInfo,
  findUsersByName,
  getNearByEventsInfo,
  addEvent,
} from '../../store';

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      location: {
        lat: 41.895266,
        lng: -87.6412237,
      },
      isHover: -1,
      showAddEventModal: false,
      loading: true,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ showAddEventModal: !this.state.showAddEventModal });
  }

  componentDidMount() {
    if (!this.props.parkList.length){
      this.props.getNearbyParks(this.state.location, 3218); //3218 = 2 miles in meters
    }

    this.props.getNearByUsers(this.state.location); //3218 = 2 miles in meters
    // this.props.getNearByUsers(this.state.location)

    if (!this.props.events.length){
      this.props.getNearByEvents(this.state.location, 8046)
    }

    if (!this.props.userPosition.latitude){
      this.props.getUserLocation();
    }

    if (this.state.loading && !this.props.userPosition.latitude){
      setTimeout(() => {
        this.setState({loading: false})
      }, 5000)
    }
    else if (this.state.loading){
      this.setState({loading: false})
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userPosition !== this.props.userPosition) {
      this.setState(
        {
          location: {
            lat: nextProps.userPosition.latitude,
            lng: nextProps.userPosition.longitude,
          },
        },
        () => {

          this.props.getNearbyParks(this.state.location, 3218); //3218 = 2 miles in meters
          this.props.getNearByUsers(this.state.location); //3218 = 2 miles in meters
          this.props.getNearByEvents(this.state.location, 8046);

          this.setState({loading: false})
        }
      );
    }
  }

  render() {
    const { parkList, user, dropDownParks } = this.props;
    const { showAddEventModal } = this.state;
    const styles = {
      dashboardList: {
        boxShadow:
          '  rgba(0, 0, 0, 0.2) 2px 3px 11px, rgba(0, 0, 0, 0.2) 1px 2px 9px',
        width: '100%',
      },
    };


    return (
      <div className="container">

      {this.state.loading ? <Dimmer active>
        <Loader className="massive" content="Loading" />
      </Dimmer>
      :
      <Dimmer>
        <Loader className="massive" content="Loading" />
      </Dimmer>
    }

        <EventEditModal
          onClose={this.toggleModal}
          showModal={showAddEventModal}
          handleSubmit={() => {}}
          parkDropDownList={dropDownParks}
          handleEvent={this.props.addEvent}
          user={user}
        />
        <Grid columns={3} centered style={{ padding: '0em 0.2em' }}>
          <Grid.Column mobile={16} tablet={8} computer={5} largeScreen={5}>
            <Card style={styles.dashboardList}>
              <Card.Content>
                <Card.Header>Pack List</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0' }}>
                {user && <FriendsList className="pack-list" user={user} />}
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column
            only={'computer'}
            tablet={8}
            computer={5}
            largeScreen={5}
          >
            <Card style={styles.dashboardList}>
              <Card.Content>
                <Card.Header>Nearby Parks</Card.Header>
              </Card.Content>
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                <Feed className="overflow-scroll dashboard-feed">
                  {parkList && (
                    <NearbyParksList
                      className="pack-list"
                      parkList={parkList}
                    />
                  )}
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column only={'computer'} tablet={8} computer={5}>
            <Card
              style={styles.dashboardList}
              className="dashboard-list-shadow"
            >
              <Card.Content>
                <div style={{ display: 'flex' }}>
                  <Header style={{ padding: 0, margin: 0 }}>
                    Upcoming Events
                  </Header>
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
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                {user && <EventsList className="event-list" user={user} />}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name,
    };
    return newPark;
  });
  return {
    email: state.user.email.toString(),
    parkList: state.parkList,
    dropDownParks: dropDownParks,
    nearbyUsers: state.nearbyUsers,
    user: state.user,
    events: state.events,
    usersList: state.usersList,
    userPosition: state.location.coords,
  };
};

const mapDispatch = dispatch => {
  return {
    getEveryAddresses() {
      dispatch(getParksAddresses());
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
    getNearbyParks(lat, lng, dist) {
      dispatch(getNearByParksAddresses(lat, lng, dist));
    },
    getNearByUsers(location) {
      dispatch(getNearByUsersInfo(location));
    },
    // findUsers(name){
    //   dispatch(findUsersByName(name));
    // }
    getNearByEvents(location, dist) {
      dispatch(getNearByEventsInfo(location, dist));
    },
    addEvent(event) {
      dispatch(addEvent(event));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
