import React from 'react';
import {
  Button,
  Image,
  Modal,
  Form,
  Icon,
  Input,
  TextArea,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { EditImageModal } from '.';
import { updateUserStore, submiteUserUpdate } from '../store';

export const EditUserModal = props => {
  const {
    updateFormFields,
    saveUserChanges,
    toggleModal,
    toggleNestedModal,
    user,
    showModal,
    showNestedModal,
  } = props;
  return (
    <Modal open={showModal} onClose={props.toggleModal}>
      <Modal.Header>Edit your profile</Modal.Header>
      <Modal.Content image>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Image wrapped size="small" src={user.imageUrl} />
          <EditImageModal
            toggleNestedModal={toggleNestedModal}
            showNestedModal={showNestedModal}
          />

          <Button onClick={toggleNestedModal} style={{ width: '128px' }}>
            Edit photo{' '}
          </Button>
        </div>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="First name"
                name="firstName"
                placeholder="First name"
                onChange={e => updateFormFields(e.target.value, e.target.name)}
                value={user.firstName}
              />
              <Form.Field
                fluid
                control={Input}
                label="Last name"
                name="lastName"
                placeholder="Last name"
                onChange={e => updateFormFields(e.target.value, e.target.name)}
                value={user.lastName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="Email"
                name="email"
                placeholder="email@domain.com"
                onChange={e => updateFormFields(e.target.value, e.target.name)}
                value={user.email}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={TextArea}
                label="About"
                name="description"
                placeholder="Tell us more about yourself..."
                onChange={e => updateFormFields(e.target.value, e.target.name)}
                value={user.description}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="line_1"
                name="line_1"
                placeholder="Address"
                onChange={e =>
                  updateFormFields(e.target.value, { address: e.target.name })
                }
                value={user.address.line_1}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="City"
                name="city"
                placeholder="City"
                onChange={e =>
                  updateFormFields(e.target.value, { address: e.target.name })
                }
                value={user.address.city}
              />
              <Form.Field
                fluid
                control={Input}
                label="state"
                name="state"
                placeholder="State"
                onChange={e =>
                  updateFormFields(e.target.value, { address: e.target.name })
                }
                value={user.address.state}
              />
              <Form.Field
                fluid
                control={Input}
                label="zip"
                name="zipcode"
                placeholder="Zip"
                onChange={e =>
                  updateFormFields(e.target.value, { address: e.target.name })
                }
                value={user.address.zipcode}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={toggleModal} color="red" inverted>
          <Icon name="remove" />Cancel
        </Button>
        <Button
          onClick={() => toggleModal(saveUserChanges(props.user))}
          color="green"
          inverted
        >
          <Icon name="checkmark" />Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
const mapState = ({ user }) => ({ user });
const mapDispatch = dispatch => {
  return {
    updateFormFields(value, type) {
      dispatch(updateUserStore(value, type));
    },
    saveUserChanges(userUpdate) {
      dispatch(submiteUserUpdate(userUpdate));
    },
  };
};

export default connect(mapState, mapDispatch)(EditUserModal);
