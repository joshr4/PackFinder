import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header,
} from 'semantic-ui-react';
import { Navbar } from './';
import Routes from '../routes';
import { logout, toggleSidebar } from '../store';
import { NavLink, withRouter } from 'react-router-dom';

const SidebarMenu = props => {
  const { visible, handleToggle, isLoggedIn, handleClick } = props;
  const styles = {
    sidebarMenuItem: {
      color: '#fff',
      fontSize: 25,
      fontFamily: 'Veradana, sans-serif',
      fontWeight: 500,
    },
    sidebarMenu: {
      height: '100vh',
      background: 'rgba(45, 66, 80, 0.9)',
      color: '#54B8BF',
      width: '80vw',
      paddingTop: '15vh'
    },
  };
  return (
    <div>
      <Sidebar.Pushable as={Segment} style={{border: '0'}}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={visible}
          icon="labeled"
          vertical
          inverted
          style={styles.sidebarMenu}
        >
          {isLoggedIn ? (
            <Menu.Menu>
              {/* The navbar will show these links after you log in */}
              {/* <Menu.Item
                as={NavLink}
                to="/home"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
                name="home"
              /> */}
              <Menu.Item
                as={NavLink}
                to="/home"
                name="Your Pack"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/parkList"
                name="Parks List"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                // as={NavLink}
                // to="/events-list"
                name="Events"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/calendar"
                name="Calendar"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/profile"
                name="Profile"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                style={styles.sidebarMenuItem}
                onClick={() => handleToggle(handleClick())}
                name="logout"
              />
            </Menu.Menu>
          ) : (
            <Menu.Menu>
              {/* The navbar will show these NavLinks before you log in */}
              <Menu.Item
                as={NavLink}
                to="/home"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
                name="home"
              />
              <Menu.Item
                as={NavLink}
                to="/login"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
                name="login"
              />
              <Menu.Item
                as={NavLink}
                to="/signup"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
                name="signup"
              />
              <Menu.Item
                as={NavLink}
                to="/friends"
                name="Friends"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/parks-list"
                name="Parks List"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/events-list"
                name="Events"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
              <Menu.Item
                as={NavLink}
                to="/profile"
                name="Profile"
                style={styles.sidebarMenuItem}
                onClick={handleToggle}
              />
            </Menu.Menu>
          )}
        </Sidebar>
        <Sidebar.Pusher>
          {/* <Navbar /> */}
          <Routes />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

// export default SidebarMenu;

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    visible: state.sidebar,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    handleToggle() {
      console.log('INSIDE TOGGLE THUNK');
      dispatch(toggleSidebar());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(SidebarMenu));
