import React from 'react';
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Icon,
  Input,
  Select,
  TextArea,
} from 'semantic-ui-react';

const EditUserModal = props => {
  console.log('editUserModal', props);
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
  ];

  return (
    <Modal open={props.show} onClose={props.toggle}>
      <Modal.Header>Edit your profile</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="small"
          src="http://images.clipartpanda.com/sad-girl-stick-figure-image.png"
        />
        <Button> Test </Button>
        <Modal.Description style={{ minWidth: '80%' }}>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                fluid
                control={Input}
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="Email"
                placeholder="email@domain.com"
              />
              <Form.Field
                fluid
                control={Select}
                label="Gender"
                options={options}
                placeholder="Gender"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={TextArea}
                label="About"
                placeholder="Tell us more about yourself..."
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="line_1"
                placeholder="Address"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="city"
                placeholder="City"
              />
              <Form.Field
                fluid
                control={Input}
                label="state"
                placeholder="State"
              />
              <Form.Field
                fluid
                control={Input}
                label="zip"
                placeholder="Zip"
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted>
          <Icon name="remove" />Cancel
        </Button>
        <Button color="green" inverted>
          <Icon name="checkmark" />Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditUserModal;
