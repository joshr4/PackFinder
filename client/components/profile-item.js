import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Image, List } from 'semantic-ui-react';

/**
 * COMPONENT
 */
export const ProfileItem = props => {
  const { imageUrls, name, breed, bio, age, weight } = props.info;
  return (
    <Grid.Row>
      <Grid.Column width="4">
        <Image size="small" src={imageUrls[0]} circular />
      </Grid.Column>
      <Grid.Column width="12">
        <Segment>
          <List>
            <List.Item>Name: {name}</List.Item>
            <List.Item>Breed: {breed}</List.Item>
            <List.Item>Bio: {bio}</List.Item>
            <List.Item>Age: {age}</List.Item>
            <List.Item>Weight: {weight}</List.Item>
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
