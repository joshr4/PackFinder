import React from 'react';
import { Button, Header, Image, Modal, Grid, Input, Form, TextArea } from 'semantic-ui-react';
import AddVisitForm from './addvisitform';

const EditPetModal = props => {
  let { item, handleSubmit, handleChange, onEdit } = props
  return (
    <Modal open={props.show}>
      <Grid>
        <Button color="blue" style={{ marginLeft: 35, marginTop: 20}} onClick={() => props.onClose()}>Close</Button>
      </Grid>
      <Modal.Content image>
        <Image
          wrapped
          size="large"
          src={item.imageUrls[0]}
        />
        <Modal.Description>
          <Form onSubmit={props.handleSubmit} onChange={e => props.handleChange(e)}>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={2}>
                  <label>Name:</label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="string"
                    name="name"
                    style={{ marginLeft: '0px' }}
                    value={item.name}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <label>Breed:</label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="string"
                    name="breed"
                    style={{ marginLeft: '0px' }}
                    value={item.breed}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <label>Weight:</label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="number"
                    name="weight"
                    label={{ basic: true, content: 'lbs' }}
                    labelPosition='right'
                    style={{ marginLeft: '0px' }}
                    value={item.weight}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <label>Age:</label>
                </Grid.Column>
                <Grid.Column>
                  <Input
                    type="number"
                    name="age"
                    style={{ marginLeft: '0px' }}
                    label={{ basic: true, content: 'years' }}
                    labelPosition='right'
                    value={item.age}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <label>Bio:</label>
                </Grid.Column>
                <Grid.Column>
                  <TextArea
                    name="bio"
                    style={{ marginLeft: '0px' }}
                    value={item.bio}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
};
export default EditPetModal;
