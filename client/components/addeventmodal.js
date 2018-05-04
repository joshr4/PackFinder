import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import AddVisitForm from './addvisitform';


const AddEventModal = props => (
  <Modal open={props.show}>
    <Button onClick={() => props.onClose()}>Close</Button>
    {/* <Modal.Header>{props.selEvent.title}</Modal.Header> */}
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
      />
      <Modal.Description>
        <Header>{props.item.title}</Header>
        <AddVisitForm
          nowString={'test!!?'}
          handleSubmit={() => props.onAdd(props.item)}
        />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
export default AddEventModal;
