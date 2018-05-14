import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Grid, Button, Image, Label, Header, Segment } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const EventMini = props => {
  const { description, id, park, start, attendees } = props.item;
  const { event } = props;

  return (
    <Segment style={{ margin: '0px', width: '100%' }}>
      <Grid>
        <Grid.Row style={{ padding: '0.25em', alignItems: 'center' }}>
          <Header style={{ flex: 2, margin: '0' }} as="a">
            {description}
          </Header>
              <Label
                style={{ flex: 1, padding: '0.5em 0.5em' }}
                icon="globe"
                content={` mi away`}
              />
          <Button
            style={{ flex: 1, padding: '0.5em 0.5em' }}
            onClick={() => {}}
            size="tiny"
            name="add"
          >
          {park.name}
          </Button>
        </Grid.Row>
        <Grid.Row columns={2} style={{ padding: '1.5em 0px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
              {moment(start).format('MMMM Do YYYY, h:mm a')}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {`${attendees.length} packs planning to attend`}
              </div>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default EventMini;
