import React, { Component } from 'react';
import { Map } from '../index.js'

class ParkList extends Component {

  render() {

    const location = {lat:41.895266, lng:-87.6412237}
    const markers = [{
      location: {lat: 41.895266, lng: -87.641223}
      }, {
        location: {lat: 41.8788652, lng:-87.6262237}
      }
    ]


    return (
      <div>
        <Map
          zoom={14}
          center={location}
          markers={markers}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default ParkList;
