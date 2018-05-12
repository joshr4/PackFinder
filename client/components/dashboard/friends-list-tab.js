import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { FriendsListItem } from '../';
/**
 * COMPONENT
 */

export class FriendsListTab extends Component {
  componentDidMount = () => {
    const { fetchData, user } = this.props;
    fetchData(user.id);
  };

  render() {
    const { items, submit } = this.props;
    console.log("submit: ", submit);
    return (
      <Grid divided style={{ height: '75vh', overflow: 'scroll' }}>
        {items &&
          items.map(item => <FriendsListItem submit={submit} key={item.id} item={item} />)}
      </Grid>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ user }) => ({ user });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(FriendsListTab);
// export default FriendsListTab;

/**
 * PROP TYPES
 */
// FriendsListTab.propTypes = {
//   email: PropTypes.string,
// };
