import React from 'react';
import { Button, Header, Image, Modal, Grid } from 'semantic-ui-react';
import {AddVisitForm} from '../index';

const EventModal = props => {
  let { onClose, showModal } = props
  return (
    <Modal open={showModal} onClose={props.onClose} style={{width: '75vw'}} >
      <Grid>
        <Button color="blue" style={{ marginLeft: 35, marginTop: 20}} onClick={() => props.onClose()}>Close</Button>
      </Grid>
      <Modal.Content image>

        <Modal.Description>
          <h3> sdfa</h3>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};
export default EventModal;
