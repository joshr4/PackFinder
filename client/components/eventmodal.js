import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const EventModal = props => (
  <Modal open={props.show}>
    <Button onClick={() => props.onClose()}>Close</Button>
    <Button onClick={() => props.onDelete(props.item)}>Delete Event</Button>
    {/* <Modal.Header>{props.selEvent.title}</Modal.Header> */}
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
      />
      <Modal.Description>
        <Header>{props.item.title}</Header>
        {props.item.start ? (
          <div>
            <p>Start Time :{props.item.start.toString()}</p>
            <p>End Time : {props.item.end.toString()}</p>
            <div>Address :</div>
            <div>{props.item.address.line_1}<br />
            {`${props.item.address.city}, ${props.item.address.state} ${props.item.address.zip}`}</div>
          </div>
        ) : (
          <div />
        )}
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
export default EventModal;
