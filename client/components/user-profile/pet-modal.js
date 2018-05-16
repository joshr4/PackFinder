import React from 'react';
import { Button, Header, Image, Modal, Grid, Input, Form, TextArea, Icon } from 'semantic-ui-react';
import AddVisitForm from '../addvisitform';
import { EditImageModal } from '../index.js';

const PetModal = props => {
  let { item, onClose, handleAdd, handleUpdate, handleChange, handleDelete, isUpdatePet, toggleNestedModal, showNestedModal, isPetModalDirty } = props
  return (
    <Modal open={props.show} onClose={props.onClose}>
      <Modal.Header>Edit your pet</Modal.Header>
      <Modal.Content image>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px'}}>
        <Image
          wrapped
          size="medium"
          src={item.imageUrls[0]}
        />

        <EditImageModal
        toggleNestedModal={toggleNestedModal}
        showNestedModal={showNestedModal}
        user={item}
        pet={true}
        onChangeHandler={e => handleChange(e)}
        />

      <Button onClick={toggleNestedModal} style={{ width: '128px' }}>
      Edit photo{' '}
    </Button>
    </div>

        <Modal.Description>
          <Form onSubmit={props.handleSubmit} onChange={e => handleChange(e)}>

            <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="Name:"
                  name="name"
                  placeholder="Name"
                  value={item.name}

                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="Breed:"
                  name="breed"
                  placeholder="Breed"
                  value={item.breed}

                />
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Field
              fluid
              control={Input}
              label="Age:"
              name="age"
              placeholder="1"
              value={item.age}
              type="number"

            />

              <Form.Field
                fluid
                control={Input}
                label="Weight:"
                name="weight"
                placeholder="1"
                value={item.weight}
                type="number"

              />

              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={TextArea}
                  label="About:"
                  name="bio"
                  placeholder="Tell us more about your pet..."
                  value={item.bio}

                />
              </Form.Group>


            { /*}
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
    */}
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>

      {isUpdatePet ? <Button className="left floated" type="button" color="red" position='left' onClick={() => handleDelete()}>Delete</Button> : <div />}

      <Button  color="red" inverted onClick={() => onClose()}>
         <Icon name="remove" /> Cancel
       </Button>
       <Button color="green" disabled={!isPetModalDirty} inverted onClick={isUpdatePet ? () => handleUpdate() : () => handleAdd()}>
         <Icon name="checkmark" /> Save
       </Button>
      </Modal.Actions>
    </Modal>
  )
};
export default PetModal;
