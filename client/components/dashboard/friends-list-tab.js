import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
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
    const { items, submit, remove, loading } = this.props;
    if (!items) return <div />;
    return (
      <Grid
        divided
        style={{
          height: '75vh',
          overflow: 'scroll',
          alignItems: 'baseline',
          alignContent: 'baseline',
        }}
      >
        {loading === 'true' ? (
          <Dimmer active>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        ) : (
          items.map(item => (
            <FriendsListItem
              remove={remove}
              submit={submit}
              key={item.id}
              item={item}
            />
          ))
        )}
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
