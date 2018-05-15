import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { EventsListItem } from '../';
/**
 * COMPONENT
 */

export class EventsListTab extends Component {
  componentDidMount = () => {
  };

  render() {
    const { items, submit, decline, loading, activeIndex } = this.props;
    if (!items) return <div />;
    return (
      <Grid
        divided
        className="overflow-scroll friends-list"
        // style={{
        //   height: '60.5vh',
        //   alignItems: 'baseline',
        //   alignContent: 'baseline',
        // }}
      >
        {loading === 'true' ? (
          <Dimmer active>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        ) : (
          items.map(item => (
            <EventsListItem
              activeIndex={activeIndex}
              decline={decline}
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

export default connect(mapState, mapDispatch)(EventsListTab);
// export default FriendsListTab;

/**
 * PROP TYPES
 */
// FriendsListTab.propTypes = {
//   email: PropTypes.string,
// };
