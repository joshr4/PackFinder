import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Header,
  Image,
  Rail,
  Segment,
  Sticky,
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';

import { Link, NavLink } from 'react-router-dom';

const EventDetailItem = props => {
  const {
    id,
    name,
    address,
    description,
    isOwner,
    toggleModal,
    priv,
    toggleAttendeeModal,
    invitedClicked,
    invitedClickedText,
    imageUrls,
  } = props;
  return (
    <Segment style={{ margin: '0px', width: '100%' }}>
      <Grid>
        <Grid.Row
          style={{
            padding: '0.25em',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header
              style={{ flex: 2, margin: '0', fontSize: '1em' }}
              as={NavLink}
              to={`/dog-park/${id}`}
            >
              {name}
            </Header>
            <Header
              style={{
                flex: 1,
                margin: '0',
                fontSize: '0.8em',
                color: 'grey',
              }}
              as="h4"
            >
              {address.fullAddress}
            </Header>
          </div>
          <div
            style={{
              display: 'flex',
              flex: 2,
              justifyContent: 'flex-end',
            }}
          >
            {address &&
              address.location.distance && (
                <Label
                  style={{ flex: 0.75, padding: '0.5em 0.5em' }}
                  icon="globe"
                  content={`${address.location.distance} mi`}
                />
              )}
            {priv ? <Label color="red" >Private</Label> : <div />}
            {isOwner ? <Button size="tiny" floated="right" color="teal" onClick={() => toggleModal()}>Edit</Button>
              : <div />}
          </div>
        </Grid.Row>
        <Grid.Row columns={1} style={{ padding: '0em 0em' }}>
          <Grid.Column width={16} style={{ padding: '0', margin: '0' }}>
            <Grid.Row style={{ padding: '0', margin: '0' }}><div
                style={{
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '10rem',
                  justifyContent: 'flex-start',
                }}
              >
                {imageUrls &&
                  imageUrls.map(imageUrl => (
                    <div style={{ width: '100%' }} key={imageUrl}>
                      <img style={{ height: '100%' }} src={imageUrl} />
                    </div>
                  ))}
                <Icon
                  name="angle right"
                  style={{
                    position: 'absolute',
                    top: '60px',
                    right: '0px',
                    backgroundColor: 'transparent',
                    padding: '0px',
                    fontSize: '5em',
                    color: 'rgb(222, 242, 242)',
                    maxWidth: '-1px',
                    margin: '0em 0em',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                />
              </div>

              <Segment style={{ margin: 0 }}>
                {`${description}`}
                {isOwner ?
                  <Button visible={isOwner} size="tiny" floated="right" color="blue" onClick={() => toggleAttendeeModal()}>Invite Friends</Button>
                  : <div />}
                  {invitedClicked ?
                    (<span style={{ fontSize: "12px", color: "blue" }}><br />{invitedClickedText}</span>)
                    : null}
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStProps = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapStProps, mapDispatch)(EventDetailItem);
