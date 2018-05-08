import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import AddVisitForm from './addvisitform';

const EventModal = props => {
  let { modalType, onDelete, item, handleSubmit, handleChange, handleFieldChange, parkList, nowString, onEdit, handleEdit } = props
  return (
    <Modal open={props.show}>
      <Button onClick={() => props.onClose()}>Close</Button>
      { modalType === 'view' ? (<div><Button onClick={() => onEdit(item, 'edit')}>Edit Visit</Button>
      <Button onClick={() => onDelete(item)}>Delete Visit</Button>
      </div>
      )
      : <div> </div>
    }
      {/* : <Button onClick={() => handleSubmit}>Add Visit</Button>}
       <Modal.Header>{props.item.title}</Modal.Header> */}
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
        />
        <Modal.Description>
          <Header>{item.title}</Header>
          {console.log('Modalitem',item)}
            { modalType === 'view' ? <div>
              <p>Start Time: {item.start.toString()}</p>
              <p>End Time: {item.end.toString()}</p>
              <p>Date: {item.visitDate}</p>
              <div>Address:</div>
              <div>{item.address.line_1}<br />
              {`${item.address.city}, ${item.address.state} ${item.address.zip}`}</div>
            </div>
           :
           <AddVisitForm
              nowString={nowString}
              handleSubmit={modalType === 'add' ? handleSubmit : handleEdit}
              handleChange={handleChange}
              handleFieldChange={handleFieldChange}
              parkList={parkList}
              item={item}
         />
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};
export default EventModal;
