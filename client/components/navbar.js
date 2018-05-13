import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store';
import { Menu, Header, Responsive, Icon } from 'semantic-ui-react';
import { SubNavbar } from '.';
import history from '../history';
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
    fontSize: 25,
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
  hamburger: {
    fontSize: 50,
    color: '#55b9bf',
    textShadow: '2px 5px 6px rgba(0,0,0,0.2)',
    letterSpacing: '2px',
    fontWeight: 100,
    padding: '10px'
  },
};

export const Navbar = props => {
  const path = history.location.pathname;
  const { isLoggedIn, handleClick, toggleSidebar } = props;
  if (path === '/') {
    styles.menu = {
      ...styles.menu,
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: '0 0 0',
      border: '0px',
    };
  } else {
    styles.menu = { ...styles.menu, backgroundColor: 'rgb(44, 66, 80)' };
  }
  return (
    <div>
      <Menu style={styles.menu}>
        {/* <Image style={styles.image} src={'/images/logo.png'} /> */}
        <NavLink to="/">
          <Header as="h1" style={styles.titleText}>
            {' '}
            Pack Finder{' '}
          </Header>
        </NavLink>
        {isLoggedIn ? (
          <Menu.Menu position="right" style={{ color: '#54B8BF' }}>
            {/* The navbar will show these links after you log in */}
            <NavLink to="/home">
              <Responsive
                as={Menu.Item}
                minWidth={768}
                style={styles.menuItem}
                name="home"
              />
            </NavLink>
            <div>
              <Responsive
                as={Menu.Item}
                minWidth={768}
                style={styles.menuItem}
                onClick={handleClick}
                name="logout"
              />
            </div>
            <Responsive
              as={Menu.Item}
              maxWidth={768}
              icon="sidebar"
              style={styles.hamburger}
              onClick={toggleSidebar}
            />
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            {/* The navbar will show these NavLinks before you log in */}
            <NavLink to="/parkList">
              <Responsive
                as={Menu.Item}
                minWidth={768}
                style={styles.menuItem}
                name="home"
              />
            </NavLink>
            <NavLink to="/login">
              <Responsive
                as={Menu.Item}
                minWidth={768}
                style={styles.menuItem}
                name="login"
              />
            </NavLink>
            <NavLink to="/signup">
              <Responsive
                as={Menu.Item}
                minWidth={768}
                style={styles.menuItem}
                name="signup"
              />
            </NavLink>
            <Responsive
              as={Menu.Item}
              maxWidth={768}
              icon="sidebar"
              style={styles.hamburger}
              onClick={toggleSidebar}
            />
          </Menu.Menu>
        )}
      </Menu>
      {path !== '/' && isLoggedIn ? (
        <Responsive as={SubNavbar} minWidth={768} />
      ) : (
        <div />
      )}
    </div>
  );
};
// }

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

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
