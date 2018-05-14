import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { Grid, Button, Image, Label, Header, Segment } from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const FriendsListItem = props => {
  const { imageUrl, address, fullName, pets, id } = props.item;
  const { submit, user, activeIndex, decline } = props;
  const buttonText = {
    0: 'Remove',
    1: 'Accept',
    2: 'Send Request',
    3: 'Cancel',
  };
  return (
    <Segment style={{ margin: '0px', width: '100%' }}>
      <Grid>
        <Grid.Row style={{ padding: '0.25em', alignItems: 'center' }}>
          <Header style={{ flex: 2, margin: '0' }} as={NavLink} to={`/profile/${id}`}>
            {fullName}
          </Header>
          {address &&
            address.location.distance && (
              <Label
                style={{ flex: 1, padding: '0.5em 0.5em' }}
                icon="globe"
                content={`${address.location.distance} mi away`}
              />
            )}
          {activeIndex === 1 ? (
            <Button
              style={{ flex: 1, padding: '0.5em 0.5em' }}
              onClick={() => decline(user.id, id)}
              size="tiny"
              name="decline"
            >
              Decline
            </Button>
          ) : (
            <div />
          )}
          <Button
            style={{ flex: 1, padding: '0.5em 0.5em' }}
            onClick={() => submit(user.id, id)}
            size="tiny"
            name="add"
          >
            {buttonText[activeIndex]}
          </Button>
        </Grid.Row>
        <Grid.Row columns={2} style={{ padding: '1.5em 0px' }}>
          <Grid.Column width={4}>
            <Grid.Row style={{ padding: '0' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{ width: '60px', borderRadius: '6em' }}
                  src={imageUrl}
                />
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid>
              <Grid.Row style={{}}>
                {pets &&
                  pets.map(pet => (
                    <div
                      key={pet.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{
                          height: '60px',
                          width: '60px',
                          borderRadius: '50%',
                        }}
                        rounded
                        src={pet.imageUrls[0]}
                      />
                      <h4 style={{ margin: '0px' }}>{pet.name}</h4>
                    </div>
                  ))}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
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
