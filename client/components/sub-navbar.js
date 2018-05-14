import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu, Image, Header, Grid } from 'semantic-ui-react';
// https://logomakr.com/4zlisz

const styles = {
  image: {
    maxWidth: '357px',
    height: '100px',
  },
  menu: {
    margin: 0,
    // backgroundColor: 'rgba(84, 184, 191)',
    position: 'fixed',
    top: '12vh',
    zIndex: 1,
    width: '100vw',
    background: '#54B8BF',
    height: '6vh'
  },
  menuItem: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Veradana, sans-serif',
    fontWeight: 500,
  },
  titleText: {
    fontFamily: 'Pacifico, cursive',
    fontSize: 50,
    color: '#55b9bf',
    textShadow: '2px 5px 6px rgba(0,0,0,0.2)',
    letterSpacing: '2px',
    fontWeight: 100,
    paddingTop: '10px',
    paddingLeft: '10px',
  },
};

const SubNavbar = ({ handleClick, isLoggedIn }) => (
  <Menu style={styles.menu} inverted widths={4}>
    <Menu.Item as={Link} to="/parkList" name="parks" />
    <Menu.Item as={Link} to="/calendar" name="calendar" />
    <Menu.Item as={Link} to="/events" name="Events" />
    <Menu.Item as={Link} to="/profile" name="Profile" />
  </Menu>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(SubNavbar);

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
