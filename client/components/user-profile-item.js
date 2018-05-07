import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Image, List } from 'semantic-ui-react';

/**
 * COMPONENT
 */
export const UserProfileItem = props => {
  return (
        <Grid.Row>
          <Grid.Column width="4">
            <Image
              size="small"
              src="http://images.clipartpanda.com/sad-girl-stick-figure-image.png"
              circular
            />
          </Grid.Column>
          <Grid.Column width="12">
            <Segment>
              <List>
                <List.Item>Email: {props.info.email}</List.Item>
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
export default UserProfileItem;
// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
