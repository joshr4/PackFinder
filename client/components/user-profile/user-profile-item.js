import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Image, List, Button } from 'semantic-ui-react';
import { EditUserModal } from '../index.js';

/**
 * COMPONENT
 */
export class UserProfileItem extends React.Component {
  state = { showModal: false, showNestedModal: false };

  toggleEditUserModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  toggleNestedModal = () => {
    this.setState({ showNestedModal: !this.state.showNestedModal });
  };
  render() {
    const { user, updateFormFields } = this.props;
    return (
      <Grid.Row>
        {user && (
          <EditUserModal
            updateFormFields={updateFormFields}
            showModal={this.state.showModal}
            showNestedModal={this.state.showNestedModal}
            toggleModal={this.toggleEditUserModal}
            toggleNestedModal={this.toggleNestedModal}
          />
        )}
        <Grid.Column width="4">
          <Image size="small" src={user.imageUrl} circular />
        </Grid.Column>
        <Grid.Column width="12">
          <Segment>
            {user && (
              <List>
                <List.Item>Name: {user.fullName}</List.Item>
                <List.Item>Email: {user.email}</List.Item>
                <List.Item>Bio: {user.description}</List.Item>
                {user.address && <List.Item>Address: {user.address.fullAddress}</List.Item>}
              </List>
            )}
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
const mapState = ({ user }) => ({ user });
const mapDispatch = null;
export default connect(mapState, mapDispatch)(UserProfileItem);

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
