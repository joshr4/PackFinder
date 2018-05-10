import React from 'react';
import { Button, Header, Image, Modal, Grid } from 'semantic-ui-react';
import AddVisitForm from './addvisitform';

const VisitModal = props => {
  let { modalType, onDelete, item, handleSubmit, handleChange, handleFieldChange, handleSliderChange, parkList, nowString, onEdit, handleEdit, slider } = props
  return (
    <Modal open={props.show}>
      <Grid>
        <Button color="blue" style={{ marginLeft: 35, marginTop: 20}} onClick={() => props.onClose()}>Close</Button>
        { modalType === 'view' ?
            <Button color="teal" style={{marginTop: 20}} onClick={() => onEdit(item, 'edit')}>Edit Visit</Button>
          : null}
        { modalType === 'view' ?
            <Button negative style={{marginRight: 20, marginTop: 20}} onClick={() => onDelete(item)}>Delete Visit</Button>
          : null}
      </Grid>
      {/* : <Button onClick={() => handleSubmit}>Add Visit</Button>}
       <Modal.Header>{props.item.title}</Modal.Header> */}
      <Modal.Content image>
        {/* <Image
          wrapped
          size="medium"
          src="https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg"
        /> */}
        <Modal.Description>
            { modalType === 'view' ? <div>
            <Header>{item.title}</Header>
              <p>Time: {item.start.toString()}</p>
              {/* <p>End Time: {item.end.toString()}</p> */}

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
              handleSliderChange={handleSliderChange}
              handleFieldChange={handleFieldChange}
              parkList={parkList}
              item={item}
              slider={slider}
         />
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};
export default VisitModal;
