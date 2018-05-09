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
  const { handleChange, handleSubmit, toggle } = props;
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
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="First name"
                name="firstName"
                placeholder="First name"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
              <Form.Field
                fluid
                control={Input}
                label="Last name"
                name="lastName"
                placeholder="Last name"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="Email"
                name="email"
                placeholder="email@domain.com"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={TextArea}
                label="About"
                name="description"
                placeholder="Tell us more about yourself..."
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="line_1"
                name="line_1"
                placeholder="Address"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                fluid
                control={Input}
                label="City"
                name="city"
                placeholder="City"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
              <Form.Field
                fluid
                control={Input}
                label="state"
                name="state"
                placeholder="State"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
              <Form.Field
                fluid
                control={Input}
                label="zip"
                name="zip"
                placeholder="Zip"
                onChange={e => handleChange(e.target.value, e.target.name)}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={toggle} color="red" inverted>
          <Icon name="remove" />Cancel
        </Button>
        <Button onClick={handleSubmit} color="green" inverted>
          <Icon name="checkmark" />Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditUserModal;
