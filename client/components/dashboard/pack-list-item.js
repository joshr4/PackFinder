import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Card,
  Feed,
  Button,
  Image,
  Label,
  Menu,
  Tab,
} from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const PackListItem = props => {
  const { imageUrl, address, firstName, pets  } = props.item;
  console.log('props in list', props)
  console.log('inside pack list item')
  return (
    <Feed.Event>
      <Feed.Label image={imageUrl} />
      <Feed.Content>
        {/* <Feed.Date content={`${address.location.distance} mi away`} /> */}
        <Feed.Summary>{`${firstName}'s pack:`}</Feed.Summary>
        <Feed.Extra images>
          {/* <Image size="large" src={pets[0].imageUrls[0]} /> */}
        </Feed.Extra>
        <Feed.Extra>
          <Button size="tiny" name="add">
            request friend
          </Button>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

const mapDispatch = dispatch => {
  return {
    getSuggestedFriends(location) {
      dispatch(getNearByUsersInfo(location));
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
  };
};

export default connect(mapState, mapDispatch)(PackListItem);

/**
 * PROP TYPES
 */
PackListItem.propTypes = {
  email: PropTypes.string,
};
