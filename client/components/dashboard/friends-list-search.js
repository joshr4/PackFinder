import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader, Search } from 'semantic-ui-react';
import { FriendsListItem } from '../';
/**
 * COMPONENT
 */

export class FriendsListSearch extends Component {
  state = { currentSearch: '' };

  handleSearchChange = (searchString) => {
    this.props.searchUsers(searchString)
    this.setState({currentSearch: searchString})
  }

  componentDidMount = () => {
    const { fetchData, user } = this.props;
    fetchData(user.id);
  };

  render() {
    const {
      items,
      submit,
      decline,
      loading,
      activeIndex,
      search,
      searchUsers,
    } = this.props;

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
        <Search onSearchChange={e => this.handleSearchChange(e.target.value)} value={this.state.currentSearch} />
        {loading === 'true' ? (
          <Dimmer active>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        ) : (
          search.map(item => (
            <FriendsListItem
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
const mapState = ({ friendsList, user }) => ({
  user,
  search: friendsList.search,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(FriendsListSearch);
// export default FriendsListSearch;

/**
 * PROP TYPES
 */
// FriendsListSearch.propTypes = {
//   email: PropTypes.string,
// };
