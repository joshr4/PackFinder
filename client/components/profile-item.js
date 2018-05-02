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
              src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
              circular
            />
          </Grid.Column>
          <Grid.Column width="12">
            <Segment>
              <List>
                <List.Item>Name: Daniel Simandl</List.Item>
                <List.Item>
                  Interests: Technology, Current Events, Outdoors, Walks
                </List.Item>
                <List.Item>
                  Bacon ipsum dolor amet bresaola pork chop shank picanha strip
                  steak jowl kevin tri-tip salami frankfurter cow cupim jerky.
                  Shank turkey shoulder hamburger frankfurter jerky porchetta
                  sausage meatball bacon kevin ground round corned beef biltong.{' '}
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
