import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';
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
    height: '6vh',
    borderRadius: '0 0 4px 4px',
  },
  menuItem: {
    color: '#2d4250',
    fontSize: 20,
    fontFamily: 'Veradana, sans-serif',
    fontWeight: 900,
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

class SubNavbar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { handleClick, isLoggedIn } = this.props;
    return (
      <Menu className="subnav" style={styles.menu} inverted widths={4}>
        <Menu.Item
          as={NavLink}
          style={styles.menuItem}
          to="/home"
          name="home"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          style={styles.menuItem}
          to="/parkList"
          name="parks"
           onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          style={styles.menuItem}
          to="/calendar"
          name="events"
           onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          style={styles.menuItem}
          to="/profile"
          name="profile"
           onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

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

export default withRouter(connect(mapState, mapDispatch)(SubNavbar));

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
