import React from 'react';
import moment from 'moment';
import { Button, Form, Input, Dropdown, Checkbox } from 'semantic-ui-react';

const EventAttendees = props => {

  return (
      <Form.Group widths="equal">
        <Form.Field>
          <label>Invite Friends</label>
          {props.users.map(user  => (<h3 key={user.id}>{user.firstName}</h3>))}
        </Form.Field>
      </Form.Group>
  );
};
export default EventAttendees;
