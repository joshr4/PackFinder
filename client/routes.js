import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, SinglePark, Example, ParkGraph, Dnd, Profile, ParkList, DogPark, Splash,
ChatRoom, EventDetail, EventList, FriendsList, EventsList, NearbyParksList} from './components'

import {me, getEvents} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile/:userId" component={Profile} />
        <Route exact path="/dog-park" component={SinglePark} />
        <Route path="/dog-park/:id" component={DogPark} />
        <Route path="/dog-park-graph" component={ParkGraph} />
        <Route path="/example" component={Example} />
        <Route path="/parkList" component={ParkList} />
        <Route path="/calendar" component={Dnd} />
        <Route path="/event/:id" component={EventDetail} />
        <Route path="/events" component={EventList} />
        <Route path="/chat-room" component={ChatRoom} />
        {/* Mobile specific routes */}
        <Route path="/mobile-home" component={FriendsList} />
        <Route path="/mobile-events" component={EventsList} />
        <Route path="/mobile-parks" component={NearbyParksList} />

        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getEvents())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
