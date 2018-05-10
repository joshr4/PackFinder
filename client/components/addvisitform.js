import React from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
//import { countryOptions } from '../common'

const AddVisitForm = props => {
  return (

  <Form onSubmit={props.handleSubmit} onChange={e => props.handleChange(e)}>
    <Form.Group widths="equal" >
      <Form.Field required>
        <label>Date</label>
        <Input
          type="date"
          name="visitDate"
          style={{ marginLeft: '0px' }}
          //defaultValue={props.nowString}
          value={props.item.visitDate}
        />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal" >
      <Form.Field required>
        <label>From</label>
        <Input
          type="time"
          name="start"
          style={{ marginLeft: '0px' }}
          //defaultValue="17:00"
          value={props.item.start.toString()}
          />
      </Form.Field>
      {/* <Form.Field required>
        <label>To</label>
        <Input
          type="time"
          name="end"
          style={{ marginLeft: '0px' }}
          //defaultValue="20:00"
          value={props.item.end}
        />
      </Form.Field> */}
      <Form.Field required>
        <div style={{marginTop: '25px'}} className="slidecontainer">
          <input type="range" min="1" max="4" value={props.item.duration} className="slider" id="visitLength" />
        </div>
      </Form.Field>
    </Form.Group>
      <Form.Group widths="equal">
      <Form.Field required>
        <label>Select Park</label>
        <Dropdown
            options={props.parkList}
            name="park"
            scrolling={true}
            style={{ marginLeft: '0px' }}
            value={props.item.park}
            placeholder={'Please select a park from the list'}
            onChange={(e, data) => props.handleFieldChange(data)}
          />
      </Form.Field>
      </Form.Group>
    <Button positive style={{margin: 10 }} type="submit" name="submitBtn">
    Save Visit
    </Button>
  </Form>
)};
export default AddVisitForm;
