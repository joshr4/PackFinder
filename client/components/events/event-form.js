import React from 'react';
import moment from 'moment';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';

const AddEventForm = props => {
  let { description, startTime, date } = props.item
  return (

    <Form onSubmit={props.handleSubmit} onChange={e => props.handleChange(e)}>
      <Form.Group widths="equal" >
        <Form.Field>
          <label>Description</label>
          <Input
            type="text"
            name="description"
            style={{ marginLeft: '0px' }}
            value={description}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal" >
        <Form.Field>
          <label>Date</label>
          <Input
            type="date"
            name="date"
            style={{ marginLeft: '0px' }}
            value={date}
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
            value={startTime}
          />
        </Form.Field>
        <Button color="blue" style={{ marginLeft: 35, marginTop: 20 }} >Save</Button>
      </Form.Group>
    </Form>
  )
};
export default AddEventForm;
