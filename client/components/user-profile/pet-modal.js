import React from 'react';
import { Button, Header, Image, Modal, Grid, Input, Form, TextArea, Icon } from 'semantic-ui-react';
import AddVisitForm from '../addvisitform';

const PetModal = props => {
  let { item, onClose, handleAdd, handleUpdate, handleChange, handleDelete, isUpdatePet } = props
  // console.log('modal props.', props.item)
  return (
    <Modal open={props.show}>
      <Modal.Content image>
        <Image
          wrapped
          size="large"
          src={item.imageUrls[0]}
        />
        <Modal.Description>
          <Form onSubmit={props.handleSubmit} onChange={e => handleChange(e)}>
            {isUpdatePet ? <Button type="button" color="red" inverted onClick={() => handleDelete()}>Delete</Button> : <div />}
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
      <Modal.Actions>
      <Button color="red" inverted onClick={() => onClose()}>
         <Icon name="remove" /> Cancel
       </Button>
       <Button color="green" inverted onClick={isUpdatePet ? () => handleUpdate() : () => handleAdd()}>
         <Icon name="checkmark" /> Save
       </Button>
      </Modal.Actions>
    </Modal>
  )
};
export default PetModal;
