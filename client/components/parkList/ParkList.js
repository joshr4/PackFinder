import React, { Component } from 'react';
import { Map } from '../index.js'
import { Grid, Header, Image, Rail, Segment, Sticky } from  'semantic-ui-react'

class ParkList extends Component {

  state = {}


  render() {

    const location = {lat:41.895266, lng:-87.6412237}
    const markers = [{
      location: {lat: 41.895266, lng: -87.641223}
      }, {
        location: {lat: 41.8788652, lng:-87.6262237}
      }
    ]

              // <Map
              //   zoom={14}
              //   center={location}
              //   markers={markers}
              //   containerElement={<div style={{ height: `400px` }} />}
              //   mapElement={<div style={{ height: `100%` }} />}
              // />


    return (

      <Grid columns={2}>
      <Grid.Column width={11}>
          <div style={{'height':'4000px', 'background':'red'}}><h1>Dog Parks List</h1></div>
      </Grid.Column>
      <Grid.Column width={5}>
      <Map
        zoom={14}
        center={location}
        markers={markers}
        containerElement={<div style={{ height: `80vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Grid.Column>
    </Grid>
    );
  }
}

export default ParkList;
