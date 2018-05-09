import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Segment,
  Grid,
  Image,
  List,
  Button,
} from 'semantic-ui-react';
import { EditUserModal } from '.';

/**
 * COMPONENT
 */
export class UserProfileItem extends React.Component {
  state = {
    showModal: false,
  };
  toggleEditUserModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  handleSubmit = e => {
    console.log('submitted E', e);
  };
  handleChange = e => {
    console.log('form Change EE', e)
  }
  render() {
    console.log('state instide userprofile item', this.state);

    return (
      <Grid.Row>
        <EditUserModal
          show={this.state.showModal}
          toggle={this.toggleEditUserModal}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
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
              <List.Item>Email: {this.props.info.email}</List.Item>
            </List>
          </Segment>
          <Button onClick={this.toggleEditUserModal}>Edit</Button>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

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
