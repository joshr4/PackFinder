import React from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
//import { countryOptions } from '../common'

const AddEventForm = props => {
  let { description } = props.item
  return (

    <Form onSubmit={props.handleSubmit} onChange={e => props.handleChange(e)}>
      <Form.Group widths="equal" >
        <Form.Field>
          <label>Description</label>
          <Input
            type="date"
            name="description"
            style={{ marginLeft: '0px' }}
            //defaultValue={props.nowString}
            value={props.item.visitDate}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal" >
        <Form.Field>
          <label>Time</label>
          <Input
            type="time"
            name="start"
            style={{ marginLeft: '0px' }}
            value={props.item.start.toString()}
          />
        </Form.Field>
    </Form.Group>
  </Form>
      )};
      export default AddEventForm;
