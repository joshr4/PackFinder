import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const EventModal = props => (
  <Modal open={props.show}>
  {console.log('modal', props.item)}
    <Button
      onClick={() => props.onClose()}>Close</Button>
          <Button
      onClick={() => props.onDelete(props.item)}>Delete Event</Button>
    {/* <Modal.Header>{props.selEvent.title}</Modal.Header> */}
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
      />
      <Modal.Description>
        <Header>{props.item.title}</Header>
        {/* <p>
         {props.item.description}
        </p>
        <p>Start: {props.item.start}</p>
        <p>End: {props.item.endgit }</p> */}
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
export default EventModal;
