import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Image, List } from 'semantic-ui-react';

/**
 * COMPONENT
 */
export const ProfileItem = props => {
  return (
        <Grid.Row>
          <Grid.Column width="4">
            <Image
              size="small"
              src={props.info.imageUrls[0]}
              circular
            />
          </Grid.Column>
          <Grid.Column width="12">
            <Segment>
              <List>
                <List.Item>Name: {props.info.name}</List.Item>
                <List.Item>
                  Breed: {props.info.breed}
                </List.Item>
                <List.Item>
                  Bio: {props.info.bio}
                </List.Item>
                <List.Item>
                  Age: {props.info.age}
                </List.Item>
                <List.Item>
                  Weight: {props.info.weight}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     email: state.user.email
//   }
// }
export default ProfileItem;
// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
