import React from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
//import { countryOptions } from '../common'


const DropdownExampleSearchSelection = (props) => (
  <Dropdown placeholder='Select location' fluid search selection options={props.list} />
)

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
    <DropdownExampleSearchSelection list={props.parkList} />
    <Button type="submit" name="submitBtn">
      Schedule Visit
    </Button>
  </Form>
);
export default AddVisitForm;


// [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, { key: 'us', value: 'us', flag: 'us', text: 'USA' }]