import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateUserStore } from '../../store';

export const EditImageModal = props => {
  const { showNestedModal, toggleNestedModal, user, onChangeHandler, pet } = props;

  return (
    <Modal dimmer={false} open={showNestedModal} size="small">
      <Modal.Header>Update Photo</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
          {pet ?
            <Form.Field
              fluid
              control={Input}
              label="ImageURL"
              name="imageUrls"
              onChange={onChangeHandler}
              value={user.imageUrls[0]}
            />
            :
            <Form.Field
              fluid
              control={Input}
              label="ImageURL"
              name="imageUrl"
              onChange={onChangeHandler}
              value={user.imageUrl}
            /> }
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={toggleNestedModal} color="red" inverted>
          <Icon name="remove" />Cancel
        </Button>
        <Button onClick={toggleNestedModal} color="green" inverted>
          <Icon name="checkmark" />Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {

  }
};
const mapDispatch = dispatch => {
  return {
    // updateFormFields(value, type) {
    //   dispatch(updateUserStore(value, type));
    // },
  };
};

export default connect(mapStateToProps, mapDispatch)(EditImageModal);
