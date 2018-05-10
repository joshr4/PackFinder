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
  state = { showModal: false };

  toggleEditUserModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    const { user, updateFormFields } = this.props;
    return (
      <Grid.Row>
        {user.address && (
          <EditUserModal
            updateFormFields={updateFormFields}
            show={this.state.showModal}
            toggle={this.toggleEditUserModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
        <Grid.Column width="4">
          <Image size="small" src={user.imageUrl} circular />
        </Grid.Column>
        <Grid.Column width="12">
          <Segment>
            {user.address && (
              <List>
                <List.Item>Name: {user.fullName}</List.Item>
                <List.Item>Email: {user.email}</List.Item>
                <List.Item>Bio: {user.description}</List.Item>
                <List.Item>Address: {user.address.fullAddress}</List.Item>
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
