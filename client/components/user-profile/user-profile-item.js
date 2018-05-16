import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Image, List, Button, Header } from 'semantic-ui-react';
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
    const { user, updateFormFields, readOnly, selectedUser } = this.props;
    return (
      <Grid.Row style={{ padding: '0.25em', alignItems: 'center' }}>
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
          <div>
            {readOnly ? (
              <div>
                <h2>{selectedUser.fullName}</h2>
                <Image size="small" src={selectedUser.imageUrl} circular />
              </div>
            ) : (
              <div>
                <h2>{user.fullName}</h2>
                <Image size="small" src={user.imageUrl} circular />
              </div>
            )}
          </div>
        </Grid.Column>
        <Grid.Column width="12">
          {readOnly ? (
            <Segment>
              {selectedUser && (
                <List>
                  <List.Item>Name: {selectedUser.fullName}</List.Item>
                  <List.Item>Email: {selectedUser.email}</List.Item>
                  <List.Item>Bio: {selectedUser.description}</List.Item>
                </List>
              )}
            </Segment>
          ) : (
            <Segment>
              {user && (
                <List>
                  <List.Item>Name: {user.fullName}</List.Item>
                  <List.Item>Email: {user.email}</List.Item>
                  <List.Item>Bio: {user.description}</List.Item>
                  {user.address && (
                    <List.Item>Address: {user.address.fullAddress}</List.Item>
                  )}
                </List>
              )}
            </Segment>
          )}
          {readOnly ? null : (
            <Button onClick={this.toggleEditUserModal}>Edit</Button>
          )}
        </Grid.Column>
      </Grid.Row>

      // <Segment style={{ margin: '0px', width: '100%' }}>
      //   <Grid>
      //     <Grid.Row style={{ padding: '0.25em', alignItems: 'center' }}>
      //       <Header style={{ flex: 2, margin: '0' }} as="a">
      //         {readOnly ? (
      //           <div>
      //             <h2>{selectedUser.fullName}</h2>
      //             <Image size="small" src={selectedUser.imageUrl} circular />
      //           </div>
      //         ) : (
      //           <div>
      //             <h2>{user.fullName}</h2>
      //             <Image size="small" src={user.imageUrl} circular />
      //           </div>
      //         )}
      //       </Header>
      //       {readOnly ? null : (
      //         <Button onClick={this.toggleEditUserModal}>Edit</Button>
      //       )}
      //     </Grid.Row>
      //     <Grid.Row columns={2} style={{ padding: '1.5em 0px' }}>
      //       <Grid.Column width={13}>
      //         <div
      //           style={{
      //             display: 'flex',
      //             flexDirection: 'column',
      //             // alignItems: 'center',
      //           }}
      //         >
      //           {readOnly ? (
      //             <Segment>
      //               {selectedUser && (
      //                 <List>
      //                   <List.Item>Name: {selectedUser.fullName}</List.Item>
      //                   <List.Item>Email: {selectedUser.email}</List.Item>
      //                   <List.Item>Bio: {selectedUser.description}</List.Item>
      //                 </List>
      //               )}
      //             </Segment>
      //           ) : (
      //             <Segment>
      //               {user && (
      //                 <List>
      //                   <List.Item>Name: {user.fullName}</List.Item>
      //                   <List.Item>Email: {user.email}</List.Item>
      //                   <List.Item>Bio: {user.description}</List.Item>
      //                   {user.address && (
      //                     <List.Item>
      //                       Address: {user.address.fullAddress}
      //                     </List.Item>
      //                   )}
      //                 </List>
      //               )}
      //             </Segment>
      //           )}
      //         </div>
      //       </Grid.Column>
      //       <Grid.Column width={3} />
      //     </Grid.Row>
      //   </Grid>
      // </Segment>
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
