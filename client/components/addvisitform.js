import React from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
//import { countryOptions } from '../common'

const AddVisitForm = props => (
  <Form onSubmit={props.handleSubmit} onChange={e => props.handleChange(e)}>
    <Form.Group widths="equal" >
      <Form.Field>
        <label>Date</label>
        <Input
          type="date"
          name="visitDate"
          style={{ marginLeft: '0px' }}
          defaultValue={props.nowString}
          value={props.addFormFieldData.visitDate}
        />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal" >
      <Form.Field>
        <label>From</label>
        <Input
          type="time"
          name="start"
          style={{ marginLeft: '0px' }}
          defaultValue="17:00"
          value={props.addFormFieldData.fromTime}
        />
      </Form.Field>
      <Form.Field>
        <label>To</label>
        <Input
          type="time"
          name="end"
          style={{ marginLeft: '0px' }}
          defaultValue="20:00"
          value={props.addFormFieldData.toTime}
        />
      </Form.Field>
    </Form.Group>
    {props.hideParks ? null : (      
      <Form.Group widths="equal">
      <Form.Field>
        <label>Select Park</label>
        <Dropdown
            options={props.parkList}
            name="park"
            scrolling="true"
            style={{ marginLeft: '0px' }}
            value={props.addFormFieldData.park}
            onChange={(e, data) => props.handleFieldChange(data)}
          />
      </Form.Field>
      </Form.Group>
    )}
    <Button type="submit" name="submitBtn">
    Schedule Visit
    </Button>
  </Form>
);
export default AddVisitForm;
