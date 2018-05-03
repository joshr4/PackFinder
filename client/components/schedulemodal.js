import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const ModalModalExample = props => (
  <Modal open={props.show}>
    <Button
      onClick={() => props.onClose()}>Close</Button>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
      />
      <Modal.Description>
        <Header>PUPPY photo, this is Fido</Header>
        <p>
          We've found the following dog image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this puppy?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalModalExample;
