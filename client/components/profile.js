import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Image, List } from 'semantic-ui-react';
import { ProfileItem } from '.';

/**
 * COMPONENT
 */
export const Profile = props => {
  return (
    <Container>
      <ProfileItem />
      <ProfileItem />
    </Container>
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
export default Profile;
// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
