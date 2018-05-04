import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

const AddVisitForm = props => (
  <Form onSubmit={props.handleSubmit}>
    <Form.Group widths="equal">
      <Form.Field>
        <label>Date</label>
        <Input
          type="date"
          name="visitDate"
          style={{ marginLeft: '0px' }}
          defaultValue={props.nowString}
        />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Field>
        <label>From</label>
        <Input
          type="time"
          name="fromTime"
          style={{ marginLeft: '0px' }}
          defaultValue="17:00"
        />
      </Form.Field>
      <Form.Field>
        <label>To</label>
        <Input
          type="time"
          name="toTime"
          style={{ marginLeft: '0px' }}
          defaultValue="20:00"
        />
      </Form.Field>
    </Form.Group>
    <Button type="submit" name="submitBtn">
      Schedule Visit
    </Button>
  </Form>
);
export default AddVisitForm;
