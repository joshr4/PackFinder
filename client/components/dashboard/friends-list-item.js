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
  Header,
  Segment,
  Divider,
  Item,
} from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const FriendsListItem = props => {
  const { imageUrl, address, fullName, pets, id } = props.item;
  const { submit, user } = props;
  // console.log('userID', user.id, 'senderID', id);

  return (
    <Grid.Row columns={2} style={{ padding: '1.5em 0px' }}>
      <Grid.Column width={4}>
        <img style={{ width: '60px', borderRadius: '6em' }} src={imageUrl} />
      </Grid.Column>
      <Grid.Column width={12}>
        <Grid>
          <Grid.Row style={{ padding: '0' }}>
            <Header as="a">{fullName}</Header>
            {pets && (
              <Image
                style={{ height: '80px', width: '80px' }}
                rounded
                src={pets[0].imageUrls[0]}
              />
            )}
          </Grid.Row>
          <Grid.Row style={{ padding: '0' }}>
            {address &&
              address.location && (
                <Label
                  icon="globe"
                  content={`${address.location.distance} mi away`}
                />
              )}
            <Button onClick={() => submit(user.id, id)} size="tiny" name="add">
              send request
            </Button>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
};

/**
 * CONTAINER
 */
const mapState = ({ user }) => ({ user });

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

export default connect(mapState, mapDispatch)(FriendsListItem);

/**
 * PROP TYPES
 */
FriendsListItem.propTypes = {
  email: PropTypes.string,
};
