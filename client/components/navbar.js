import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu, Image, Header, Grid } from 'semantic-ui-react';
import { SubNavbar } from '.';
// https://logomakr.com/4zlisz

const styles = {
  image: {
    maxWidth: '357px',
    height: '100px',
  },
  menu: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'fixed',
    top: '0px',
    zIndex: 1,
    width: '100vw',
    color: '#54B8BF',
    height: '85px',
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

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Menu stackable style={styles.menu}>
      {/* <Image style={styles.image} src={'/images/logo.png'} /> */}
      <Header as="h1" style={styles.titleText}>
        {' '}
        Pack Finder{' '}
      </Header>
      {isLoggedIn ? (
        <Menu.Menu position="right" style={{ color: '#54B8BF' }}>
          {/* The navbar will show these links after you log in */}
          <Menu.Item as={Link} name="home" to="/home" />
          <Menu.Item onClick={handleClick} name="logout" to="/home" />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          {/* The navbar will show these links before you log in */}
          <Menu.Item
            style={styles.menuItem}
            as={Link}
            name="login"
            to="/login"
          />
          <Menu.Item
            style={styles.menuItem}
            as={Link}
            name="signup"
            to="/signup"
          />
        </Menu.Menu>
      )}
    </Menu>
    {isLoggedIn ? <SubNavbar /> : <div />}
  </div>
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

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
