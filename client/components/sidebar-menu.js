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
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom';

class SidebarMenu extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const styles = {
      menuItem: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Veradana, sans-serif',
        fontWeight: 500,
      },
    };
    const { visible } = this.state;
    const { handleClick, isLoggedIn } = this.props;
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            {isLoggedIn ? (
              <Menu.Menu position="right" style={{ color: '#54B8BF' }}>
                {/* The navbar will show these links after you log in */}
                <NavLink to="/home">
                  <Menu.Item style={styles.menuItem} name="home" />
                </NavLink>
                <div>
                  <Menu.Item
                    style={styles.menuItem}
                    onClick={handleClick}
                    name="logout"
                  />
                </div>
              </Menu.Menu>
            ) : (
              <Menu.Menu position="right">
                {/* The navbar will show these NavLinks before you log in */}
                <NavLink to="/parkList">
                  <Menu.Item style={styles.menuItem} name="home" />
                </NavLink>
                <NavLink to="/login">
                  <Menu.Item style={styles.menuItem} name="login" />
                </NavLink>
                <NavLink to="/signup">
                  <Menu.Item style={styles.menuItem} name="signup" />
                </NavLink>
              </Menu.Menu>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Navbar toggleSidebar={this.toggleVisibility} />
            <Routes />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
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

export default withRouter(connect(mapState, mapDispatch)(SidebarMenu));
