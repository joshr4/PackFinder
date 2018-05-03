import React, { Component } from 'react';
import { Map } from '../index.js'

class ParkList extends Component {

  render() {

    return (
      <div>
        <Map
          zoom={14}
          center={{lat:41.895266, lng:-87.6412237}}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default ParkList;
